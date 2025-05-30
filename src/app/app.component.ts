import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./componentes/header/header.component";
import { HeaderUsuarioComponent } from './componentes/header-usuario/header-usuario.component';
import { FooterComponent } from "./componentes/footer/footer.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from './servicios/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HeaderUsuarioComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shielduq';
  footer = "Universidad del Quindio 2025-1"
  mostrarBarraAdmin = false;
  mostrarBarraUsuario = false;

  //Rutas que debe mostrar para cada barra
private readonly  rutasAdmin = [
  '/gestion-reportes',
  '/gestion-categorias',
  '/gestion-reportesadmin',
  '/administrador',
  
];

private readonly rutasUsuario = [
  '/crear-reporte',
  '/principal-usuario',
  '/perfil',
  '/editar-perfil',
  '/detalle-reporte',
  '/reportes-usuario'
];

constructor(private router: Router, private userService: UserService) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
    const rutaActual = event.urlAfterRedirects;

    console.log('Ruta actual:', rutaActual);

    this.mostrarBarraAdmin = this.rutasAdmin.includes(rutaActual);
    this.mostrarBarraUsuario = this.rutasUsuario.includes(rutaActual);
    });

    //this.userService.crearAdminDePrueba();
  } 
}

   