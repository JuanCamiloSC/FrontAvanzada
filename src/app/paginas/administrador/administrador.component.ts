import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReportesService } from '../../servicios/reportes.service';
import { ReporteDTO } from '../../dto/reporte-dto';

@Component({
  selector: 'app-administrador',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  
  reportesForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reportesForm = this.fb.group({
      reportes: this.fb.array([])
    });

    const reportes = this.reportesService.listar();
    const reportesFormArray = this.reportesForm.get('reportes') as FormArray;

    reportes.forEach((reporte: ReporteDTO) => {
      reportesFormArray.push(this.fb.group({
        id: [reporte.id],
        titulo: [reporte.titulo],
        descripcion: [reporte.descripcion],
        ubicacion: [reporte.ciudad],
        hora: [new Date(reporte.fecha).toLocaleTimeString()],
        categoria: [reporte.categoria]
      }));
    });
  }

  get reportes(): FormArray {
    return this.reportesForm.get('reportes') as FormArray;
  }

  verDetalle(id: string): void {
    this.router.navigate(['/detalle-reporte', id]);
  }
}
