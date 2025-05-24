import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReporteDTO } from '../../dto/reporte-dto';
import { ReportesService } from '../../servicios/reportes.service';

@Component({
  selector: 'app-principal-usuario',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './principal-usuario.component.html',
  styleUrl: './principal-usuario.component.css'
})
export class PrincipalUsuarioComponent {
  
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
