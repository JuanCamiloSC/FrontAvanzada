import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicios/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-recuperar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-recuperar.component.html',
  styleUrl: './password-recuperar.component.css'
})
export class PasswordRecuperarComponent {

  passRecForm!: FormGroup;
  mensaje: string = ''; // Mensaje de éxito
  error: string = '';   // Mensaje de error

   constructor( private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    // Inicializamos el formulario con un campo de email y sus validaciones
    this.createForms();
  }

  private createForms(){
    this.passRecForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
    })
  }

  public recuperar() {
    if (this.passRecForm.invalid) {
      this.error = 'Por favor, ingresa un correo válido.';
      return;
    }

    const email = this.passRecForm.get('email')?.value;

    this.userService.sendVerificationCode(email).subscribe({
      next: (data) => {
        this.mensaje = data.content;
        localStorage.setItem('recoveryEmail', email); // Guardamos el email temporalmente
        this.router.navigate(['/recuperar-password']); // Navegamos al paso 2
      },
      error: (error) => {
        this.error = error.error.message || 'Error al enviar el código.';
      }
    });

  }

}
