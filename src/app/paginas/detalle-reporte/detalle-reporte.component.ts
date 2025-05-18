import { Component } from '@angular/core';
import { ReporteDTO } from '../../dto/reporte-dto';
import { ActivatedRoute } from '@angular/router';
import { ReportesService } from '../../servicios/reportes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-reporte',
  imports: [CommonModule],
  templateUrl: './detalle-reporte.component.html',
  styleUrl: './detalle-reporte.component.css'
})
export class DetalleReporteComponent {
  idReporte: string = '';
 reporte: ReporteDTO | undefined;


 constructor(private route: ActivatedRoute, private reportesService: ReportesService) {
   this.route.params.subscribe((params) => {
     this.idReporte = params['id'];
     this.obtener();
   });
 }


 public obtener() {
   const reporteConsultado = this.reportesService.obtener(this.idReporte);
   if (reporteConsultado != undefined) {
     this.reporte = reporteConsultado;
   }
 }

}
