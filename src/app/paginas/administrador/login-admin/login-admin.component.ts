import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../servicios/authentication.service';
import { TokenService } from '../../../servicios/token.service'; 
import { LoginDTO  } from '../../../dto/login-dto';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
    this.createForms();
  }

  private createForms() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
    });
  }

  login() {
    const loginDTO = this.loginForm.value as LoginDTO;

    this.authService.login(loginDTO).subscribe({

      next: (data) => {
        this.tokenService.login(data.content);
        const rol = this.tokenService.getRol();

        if (rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          Swal.fire('Acceso denegado', 'No eres administrador', 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', error.error.content, 'error');
      }
    });
  }
}