import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { ReportesService } from '../../servicios/reportes.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
 selector: 'app-inicio',
 standalone: true,
 imports: [RouterModule],
 templateUrl: './inicio.component.html',
 styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  constructor(
    private mapaService: MapaService,
    private reportesService: ReportesService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
    const reportes = this.reportesService.listar();
    this.mapaService.pintarMarcadores(reportes);
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  public goToRegistration(): void {
    this.router.navigate(['/registro']);
  }

  public goToAdminLogin(): void {
    this.router.navigate(['/login-admin']);
  }

}
