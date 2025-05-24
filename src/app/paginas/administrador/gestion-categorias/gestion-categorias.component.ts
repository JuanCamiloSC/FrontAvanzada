import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-categorias',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css'
})
export class GestionCategoriasComponent implements OnInit{
   categoriaForm!: FormGroup;

  categorias = [
    {
      id: 1,
      titulo: 'Alumbrado Público',
      descripcion: 'Reportes relacionados con el alumbrado público en la ciudad.'
    },
    {
      id: 2,
      titulo: 'Robo',
      descripcion: 'Reportes de robos o hurtos en la zona.'
    },
    {
      id: 3,
      titulo: 'Mascota Perdida',
      descripcion: 'Reportes de mascotas perdidas en la comunidad.'
    },
    {
      id: 4,
      titulo: 'Vandalismo',
      descripcion: 'Reportes de vandalismo o daños a la propiedad pública.'
    },
    {
      id: 5,
      titulo: 'Incendio',
      descripcion: 'Reportes de incendios en la zona.'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const nuevaCategoria = {
        id: this.categorias.length ? Math.max(...this.categorias.map(c => c.id)) + 1 : 1,
        ...this.categoriaForm.value
      };
      this.categorias.push(nuevaCategoria);
      this.categoriaForm.reset();
    } else {
      this.categoriaForm.markAllAsTouched();
    }
  }

  eliminarCategoria(id: number): void {
    this.categorias = this.categorias.filter(categoria => categoria.id !== id);
  }
    
}
