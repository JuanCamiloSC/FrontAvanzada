import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../servicios/authentication.service';
import { TokenService } from '../../servicios/token.service';
import { LoginDTO } from '../../dto/login-dto';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService, private tokenService: TokenService) {
    this.createForms();
  }

  private createForms(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],     
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
    })
  }

  public login(){
    const loginDTO = this.loginForm.value as LoginDTO;

    this.authService.login(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.content);

        const rol = this.tokenService.getRol();
        console.log("ROL:", rol);

        if (rol === 'ROLE_CLIENT') {
          this.router.navigate(['/principal-usuario']); // ruta para admin
        } else {
          Swal.fire('Acceso denegado', 'No eres un cliente', 'error');
        }
      },
    
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.content
      });
    }
  });

  }


}
