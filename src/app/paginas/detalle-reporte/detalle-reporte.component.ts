import { Component } from '@angular/core';
import { ReporteDTO } from '../../dto/reporte-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReportesService } from '../../servicios/reportes.service';
import { CommonModule } from '@angular/common';
import { MapaService } from '../../servicios/mapa.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-reporte',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './detalle-reporte.component.html',
  styleUrl: './detalle-reporte.component.css'
})
export class DetalleReporteComponent {
  
  detalleReporteForm!: FormGroup;
  idReporte: string = '';
  reporte: ReporteDTO | undefined;

  constructor(
    private route: ActivatedRoute,
    private reportesService: ReportesService,
    private fb: FormBuilder,
    private mapaService: MapaService
  ) {
    this.route.params.subscribe((params) => {
      this.idReporte = params['id'];
      this.obtener();
    });

    // ✅ Agregamos nivelImportancia al formulario
    this.detalleReporteForm = this.fb.group({
      comentario: ['', Validators.required],
      nivelImportancia: ['', Validators.required]
    });
  }

  public obtener() {
    const reporteConsultado = this.reportesService.obtener(this.idReporte);
    if (reporteConsultado != undefined) {
      this.reporte = reporteConsultado;
    }

    setTimeout(() => {
      this.mapaService.posicionActual = [
        this.reporte!.ubicacion.longitud,
        this.reporte!.ubicacion.latitud
      ];
      this.mapaService.crearMapa(); //Aquí se carga el mapa

      setTimeout(() => {
        this.mapaService.colocarMarcador(
          this.reporte!.ubicacion.latitud,
          this.reporte!.ubicacion.longitud
        );
      }, 500);
    }, 0);
  }

  // ✅ Método para enviar el voto
  public votarImportancia(): void {
    const nivel = this.detalleReporteForm.get('nivelImportancia')?.value;
    if (nivel) {
      console.log(`Nivel de importancia votado: ${nivel}`);
      // Aquí puedes llamar a un servicio para guardar el voto si lo deseas
      alert(`Tu voto "${nivel}" ha sido registrado. ¡Gracias por participar!`);
    } else {
      alert('Por favor selecciona un nivel de importancia antes de votar.');
    }
  }
}
