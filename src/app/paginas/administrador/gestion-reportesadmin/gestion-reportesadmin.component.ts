import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-reportesadmin',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './gestion-reportesadmin.component.html',
  styleUrl: './gestion-reportesadmin.component.css'
})
export class GestionReportesadminComponent implements OnInit{
  
  reportes = [
    {
      id: 1,
      titulo: 'Reporte 1',
      estado: 'PENDIENTE',
      imagenUrl: 'https://via.placeholder.com/80',
      fecha: new Date(),
      ciudad: 'Bogotá'
    },
    {
      id: 2,
      titulo: 'Reporte 2',
      estado: 'VERIFICADO',
      imagenUrl: 'https://via.placeholder.com/80',
      fecha: new Date(),
      ciudad: 'Medellín'
    }
  ];

  formularioRevision: FormGroup;
  reporteSeleccionadoId: number | null = null;
  mostrarMotivo: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formularioRevision = this.fb.group({
      motivo: ['']
    });
  }

  ngOnInit(): void {}

  verDetalle(reporte: any) {
    alert(`Detalles del reporte ${reporte.id} - ${reporte.titulo}`);
  }

  aceptarReporte(id: number) {
    alert(`Reporte ${id} aceptado`);
    // Aquí iría lógica de backend para actualizar estado
  }

  seleccionarRechazo(id: number) {
    this.reporteSeleccionadoId = id;
    this.mostrarMotivo = true;
    this.formularioRevision.reset();
  }

  cancelarRechazo() {
    this.mostrarMotivo = false;
    this.reporteSeleccionadoId = null;
  }

  confirmarRechazo() {
    const motivo = this.formularioRevision.value.motivo;
    if (!motivo) {
      alert('Por favor, indica el motivo del rechazo.');
      return;
    }

    alert(`Reporte ${this.reporteSeleccionadoId} rechazado por: ${motivo}`);
    // Aquí iría lógica de backend para marcar como rechazado con motivo

    this.cancelarRechazo();
  }

}
