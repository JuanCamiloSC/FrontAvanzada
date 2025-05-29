import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { UserService } from '../../servicios/user.service';
import { UpdateUserDTO } from '../../dto/update-user-dto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit{

  editForm!: FormGroup;
  userId: string = '';

  constructor(
      private tokenService: TokenService,
      private userService: UserService,
      private router: Router,
      private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
    this.userId = this.tokenService.getIdUser();

    this.userService.get(this.userId).subscribe({
      next: (data) => {
        const user = data.content;

        this.editForm = this.formBuilder.group({
          name: [user.name, [Validators.required, Validators.maxLength(100)]],
          email: [{ value: user.email, disabled: true }], // no editable
          phone: [user.phone, [Validators.required, Validators.maxLength(10)]],
          municipality: [user.municipality, Validators.required],
          address: [user.address, [Validators.required, Validators.maxLength(100)]],
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la información del usuario', 'error');
      },
    });
  }
  public goToMyReports(): void {
    this.router.navigate(['/reportes-usuario']);
  }

  public saveChanges(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formValues = this.editForm.getRawValue(); // incluye los campos deshabilitados

    const updateDTO: UpdateUserDTO = {
      id: this.userId,
      name: formValues.name,
      phone: formValues.phone,
      municipality: formValues.municipality,
      address: formValues.address,
    };

    this.userService.editar(updateDTO).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Tu perfil fue actualizado', 'success').then(() => {
          this.router.navigate(['/perfil']);
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
      },
    });
  }

  

}
