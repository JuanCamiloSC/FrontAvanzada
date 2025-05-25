import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-codigo-verificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './codigo-verificacion.component.html',
  styleUrl: './codigo-verificacion.component.css'
})
export class CodigoVerificacionComponent {

  verificationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm() {
    this.verificationForm = this.formBuilder.group({
      verificacion: ['', [Validators.required]]
    });
  }

  public verificarCodigo() {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    const codigo = this.verificationForm.get('verificacion')?.value;
    const email = localStorage.getItem('recoveryEmail');

    if (!email) {
      Swal.fire('Error', 'No se encontró el correo asociado al proceso de verificación.', 'error');
      return;
    }

    this.userService.activateAccount(email, codigo).subscribe({
      next: (data) => {
        Swal.fire('Cuenta activada', data.content, 'success').then(() => {
          localStorage.removeItem('recoveryEmail');
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        Swal.fire('Error', error.error?.content || 'Código incorrecto o expirado.', 'error');
      }
    });
  }


}
