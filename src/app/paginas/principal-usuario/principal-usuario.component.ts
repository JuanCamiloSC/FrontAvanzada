import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReporteDTO } from '../../dto/reporte-dto';
import { ReportesService } from '../../servicios/reportes.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-principal-usuario',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './principal-usuario.component.html',
  styleUrl: './principal-usuario.component.css'
})
export class PrincipalUsuarioComponent implements OnInit {
  
  reportesForm!: FormGroup;
  filtroForm!: FormGroup;
  
  // Variables para el filtro
  reportesOriginales: ReporteDTO[] = [];
  reportesFiltrados: ReporteDTO[] = [];
  ubicacionReferencia: { lat: number, lng: number } | null = null;
  
  // Subject para manejar la búsqueda con debounce
  private searchSubject = new Subject<string>();
  
  // Información de resultados
  mostrandoTodos = true;
  cantidadResultados = 0;
  ubicacionBuscada = '';
  radioBuscado = 1;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormularios();
    this.cargarReportes();
    this.configurarBusqueda();
  }

  private inicializarFormularios(): void {
    // Formulario principal de reportes
    this.reportesForm = this.fb.group({
      reportes: this.fb.array([])
    });

    // Formulario de filtros
    this.filtroForm = this.fb.group({
      ubicacion: [''],
      radio: [1]
    });
  }

  private cargarReportes(): void {
    this.reportesOriginales = this.reportesService.listar();
    this.reportesFiltrados = [...this.reportesOriginales];
    this.actualizarFormArray();
    this.actualizarInfoResultados();
  }

  private configurarBusqueda(): void {
    // Configurar búsqueda con debounce
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(ubicacion => {
      this.filtrarPorUbicacion(ubicacion);
    });

    // Escuchar cambios en el input de ubicación
    this.filtroForm.get('ubicacion')?.valueChanges.subscribe(valor => {
      this.searchSubject.next(valor || '');
    });

    // Escuchar cambios en el radio
    this.filtroForm.get('radio')?.valueChanges.subscribe(() => {
      const ubicacion = this.filtroForm.get('ubicacion')?.value;
      if (ubicacion && ubicacion.trim()) {
        this.filtrarPorUbicacion(ubicacion);
      }
    });
  }

  private actualizarFormArray(): void {
    const reportesFormArray = this.reportesForm.get('reportes') as FormArray;
    reportesFormArray.clear();

    this.reportesFiltrados.forEach((reporte: ReporteDTO) => {
      reportesFormArray.push(this.fb.group({
        id: [reporte.id],
        titulo: [reporte.titulo],
        descripcion: [reporte.descripcion],
        ubicacion: [reporte.ciudad],
        hora: [new Date(reporte.fecha).toLocaleTimeString()],
        categoria: [reporte.categoria],
        // Agregar campos adicionales para el filtro
        latitud: [reporte['latitud'] || 0],
        longitud: [reporte['longitud'] || 0],
        distancia: [(reporte as any).distancia || null]
      }));
    });
  }

  private async filtrarPorUbicacion(ubicacion: string): Promise<void> {
    if (!ubicacion || !ubicacion.trim()) {
      this.limpiarFiltros();
      return;
    }

    const radio = this.filtroForm.get('radio')?.value || 1;
    
    try {
      // Obtener coordenadas de la ubicación buscada
      const coordenadas = await this.obtenerCoordenadas(ubicacion.trim());
      
      if (!coordenadas) {
        // No se encontró la ubicación
        this.reportesFiltrados = [];
        this.actualizarFormArray();
        this.mostrandoTodos = false;
        this.cantidadResultados = 0;
        this.ubicacionBuscada = ubicacion;
        this.radioBuscado = radio;
        return;
      }

      this.ubicacionReferencia = coordenadas;

      // Filtrar y calcular distancias
      const reportesConDistancia = this.reportesOriginales.map(reporte => {
        const distancia = this.calcularDistancia(
          coordenadas.lat, coordenadas.lng,
          reporte['latitud'] || 0, reporte['longitud'] || 0
        );
        return { ...reporte, distancia };
      });

      // Filtrar por radio y ordenar por distancia
      this.reportesFiltrados = reportesConDistancia
        .filter(reporte => reporte.distancia <= radio)
        .sort((a, b) => a.distancia - b.distancia);

      this.actualizarFormArray();
      this.mostrandoTodos = false;
      this.cantidadResultados = this.reportesFiltrados.length;
      this.ubicacionBuscada = ubicacion;
      this.radioBuscado = radio;

    } catch (error) {
      console.error('Error al filtrar por ubicación:', error);
      this.limpiarFiltros();
    }
  }

  private async obtenerCoordenadas(ubicacion: string): Promise<{ lat: number, lng: number } | null> {
    // Mapeo de ubicaciones conocidas (puedes expandir esto o usar una API real)
    const ubicacionesConocidas: { [key: string]: { lat: number, lng: number } } = {
      'armenia': { lat: 4.5339, lng: -75.6811 },
      'pereira': { lat: 4.8087, lng: -75.6906 },
      'manizales': { lat: 5.0703, lng: -75.5138 },
      'dosquebradas': { lat: 4.8372, lng: -75.6723 },
      'calarca': { lat: 4.5297, lng: -75.6473 },
      'la tebaida': { lat: 4.4469, lng: -75.7897 },
      'circasia': { lat: 4.6186, lng: -75.6378 },
      'montenegro': { lat: 4.5628, lng: -75.7511 },
      'quimbaya': { lat: 4.6225, lng: -75.7693 },
      'santa rosa de cabal': { lat: 4.8628, lng: -75.6161 }
    };

    const ubicacionNormalizada = ubicacion.toLowerCase().trim();
    
    // Buscar coincidencia exacta
    if (ubicacionesConocidas[ubicacionNormalizada]) {
      return ubicacionesConocidas[ubicacionNormalizada];
    }

    // Buscar coincidencia parcial
    for (const [nombre, coords] of Object.entries(ubicacionesConocidas)) {
      if (nombre.includes(ubicacionNormalizada) || ubicacionNormalizada.includes(nombre)) {
        return coords;
      }
    }

    // TODO: Aquí puedes integrar una API de geocodificación real
    // como Google Maps Geocoding API o Nominatim
    /*
    try {
      const response = await fetch(`https://api.geocoding.service.com/search?q=${encodeURIComponent(ubicacion)}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          lat: data.results[0].lat,
          lng: data.results[0].lng
        };
      }
    } catch (error) {
      console.error('Error en geocodificación:', error);
    }
    */

    return null;
  }

  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  limpiarFiltros(): void {
    this.filtroForm.patchValue({
      ubicacion: '',
      radio: 1
    });
    
    this.reportesFiltrados = [...this.reportesOriginales];
    this.ubicacionReferencia = null;
    this.actualizarFormArray();
    this.actualizarInfoResultados();
  }

  private actualizarInfoResultados(): void {
    this.mostrandoTodos = this.reportesFiltrados.length === this.reportesOriginales.length;
    this.cantidadResultados = this.reportesFiltrados.length;
  }

  get reportes(): FormArray {
    return this.reportesForm.get('reportes') as FormArray;
  }

  verDetalle(id: string): void {
    this.router.navigate(['/detalle-reporte', id]);
  }

  // Getters para el template
  get ubicacionControl() {
    return this.filtroForm.get('ubicacion');
  }

  get radioControl() {
    return this.filtroForm.get('radio');
  }

  // Método para obtener la distancia de un reporte específico
  obtenerDistancia(index: number): number | null {
    const reporte = this.reportes.at(index);
    return reporte?.get('distancia')?.value || null;
  }

  // Método para verificar si un reporte está destacado
  esReporteDestacado(index: number): boolean {
    const distancia = this.obtenerDistancia(index);
    const radio = this.filtroForm.get('radio')?.value || 1;
    return distancia !== null && distancia <= radio;
  }
}