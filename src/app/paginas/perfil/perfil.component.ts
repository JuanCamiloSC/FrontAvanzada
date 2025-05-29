import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../dto/user-dto';
import { TokenService } from '../../servicios/token.service';
import { UserService } from '../../servicios/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{


  user!: UserDTO;  // propiedad para mostrar en el HTML

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.tokenService.getIdUser();
    console.log("ID del usuario desde el token:", id);

    this.userService.get(id).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);
        this.user = data.content;
        
      },
      error: (err) => {
        console.error("Error cargando usuario:", err);
      }
    });
  }

  public goToEdit(): void {
    this.router.navigate(['/editar-perfil']);
  }

  public goToMyReports(): void {
    this.router.navigate(['/reportes-usuario']);
  }

  public deleteAccount(): void {
    Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará tu cuenta permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const id = this.tokenService.getIdUser();

      this.userService.delete(id).subscribe({
        next: () => {
          this.tokenService.logout();
        },
        error: (err) => {
          console.error("Error eliminando la cuenta:", err);
          Swal.fire('Error', 'No se pudo eliminar tu cuenta.', 'error');
        }
      });
    }
  });
  }
  

}
