import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { CreateUserDTO } from '../../dto/create-user-dto';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Municipality } from '../../enum/municipality.enum';



@Component({
 selector: 'app-registro',
 imports: [ReactiveFormsModule, RouterModule, CommonModule],
 templateUrl: './registro.component.html',
 styleUrl: './registro.component.css'
})
export class RegistroComponent{
  ciudades = Object.values(Municipality);

  registerForm!: FormGroup;

  private createForm() {
    this.registerForm = this.formBuilder.group({     
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      municipality: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],     
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required]] 
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }

   private passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }
   

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { 
    this.createForm();
  }

  public registration() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // ✅ muestra los errores si no ha escrito nada
      return;
    }
    
    const createUser = this.registerForm.value as CreateUserDTO;

    this.userService.create(createUser).subscribe({
      next: (data) => {
        localStorage.setItem('recoveryEmail', createUser.email); // <- Aquí se guarda
        

        Swal.fire({
          title: 'Éxito',
          text: data.content,
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/codigo-verificacion']); // ← redirige luego de aceptar
        });
      },
      error: (error) => {

        let mensaje = 'Error inesperado';

        if (error.error) {
          if (Array.isArray(error.error)) {
            // Si backend devuelve un array de errores
            mensaje = error.error.map((e: any) => e.message || JSON.stringify(e)).join('<br>');
          } else if (typeof error.error === 'object') {
            if (typeof error.error.content === 'string') {
              mensaje = error.error.content;
            } else if (Array.isArray(error.error.content)) {
              mensaje = error.error.content.map((e: any) => e.message || JSON.stringify(e)).join('<br>');
            } else {
              mensaje = JSON.stringify(error.error.content);
            }
          } else if (typeof error.error === 'string') {
            mensaje = error.error;
          }
        }

        Swal.fire({
          title: 'Error',
          html: mensaje,
          icon: 'error'
        });
      }
    });
  }

}   