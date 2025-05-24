import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportesService } from '../../servicios/reportes.service';
import { Router, RouterModule } from '@angular/router';
import { ReporteDTO } from '../../dto/reporte-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-usuario',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './reportes-usuario.component.html',
  styleUrl: './reportes-usuario.component.css'
})
export class ReportesUsuarioComponent {

  historialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.historialForm = this.fb.group({
      reportes: this.fb.array([])
    });

    const reportes = this.reportesService.listar();
    const reportesFormArray = this.historialForm.get('reportes') as FormArray;

    reportes.forEach((reporte: ReporteDTO) => {
      reportesFormArray.push(this.fb.group({
        id: [reporte.id],
        titulo: [reporte.titulo],
        descripcion: [reporte.descripcion],
        ciudad: [reporte.ciudad],
        fecha: [new Date(reporte.fecha).toLocaleString()],
        categoria: [reporte.categoria],
        imagen: [reporte.imagen],
        estadoActual: [reporte.estadoActual]
      }));
    });
  }

  get reportes(): FormArray {
    return this.historialForm.get('reportes') as FormArray;
  }

  verDetalle(id: string): void {
    this.router.navigate(['/detalle-reporte', id]);
  }
}
