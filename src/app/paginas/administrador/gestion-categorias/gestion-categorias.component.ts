import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../servicios/category.service';
import { CategoryDTO } from '../../../dto/category-dto';
import { CreateCategoryDTO } from '../../../dto/create-category-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css'
})
export class GestionCategoriasComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: CategoryDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]]
    });

    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoryService.list().subscribe({
      next: (res) => {
        this.categorias = res.content;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
        Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const dto: CreateCategoryDTO = this.categoriaForm.value;

    this.categoryService.create(dto).subscribe({
      next: (res) => {
        this.categorias.push(res.content); // Agrega la nueva categoría
        this.categoriaForm.reset();
        Swal.fire('Éxito', 'Categoría creada correctamente', 'success');
      },
      error: (err) => {
        console.error('Error al crear categoría', err);
        Swal.fire('Error', 'No se pudo crear la categoría', 'error');
      }
    });
  }

  eliminarCategoria(id: string): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(cat => cat.id !== id);
        Swal.fire('Eliminado', 'La categoría fue eliminada correctamente', 'success');
      },
      error: (err) => {
        console.error('Error al eliminar categoría', err);
        Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
      }
    });
  }
}
