import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {

  newPassForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.newPassForm = this.formBuilder.group({
      codigoRecuperacion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      nuevaPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }

   private passwordsMatchValidator(formGroup: FormGroup) {
    const nuevaPassword = formGroup.get('nuevaPassword')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    return nuevaPassword === confirmaPassword ? null : { passwordsMismatch: true };
  }


  public reestablecer() {
    if (this.newPassForm.invalid) {
      this.newPassForm.markAllAsTouched();
      return;
    }

    const email = localStorage.getItem('recoveryEmail');
    if (!email) {
      Swal.fire('Error', 'No se encontró el correo asociado.', 'error');
      return;
    }

    const code = this.newPassForm.get('codigoRecuperacion')?.value;
    const newPass = this.newPassForm.get('nuevaPassword')?.value;

    this.userService.changePassword(email, code, newPass).subscribe({
      next: (data) => {
        Swal.fire('Contraseña actualizada', data.content, 'success').then(() => {
          localStorage.removeItem('recoveryEmail');
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        Swal.fire('Error', error.error?.content || 'No se pudo restablecer la contraseña.', 'error');
      }
    });
  }

}
