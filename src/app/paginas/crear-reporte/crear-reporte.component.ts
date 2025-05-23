import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mapboxgl from 'mapbox-gl';
import { MapaService } from '../../servicios/mapa.service';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [],
  templateUrl: './crear-reporte.component.html',
  styleUrl: './crear-reporte.component.css'
})
export class CrearReporteComponent implements OnInit {

  crearReporteForm!: FormGroup;
  categorias: string[];
  ciudad: string[];

  constructor(
    private formBuilder: FormBuilder,
    private mapaService: MapaService
  ) {

    this.crearFormulario();
    this.categorias = [
      'Mascota Perdida',
      'Robo',
      'Alumbrado público',
      'Huecos en la vía'
    ];
    this.ciudad = [
      'Armenia', 'Salento', 'Filandia', 'Quimbaya',
      'La Tebaida', 'Montenegro', 'Circasia', 'Calarca',
      'Bogotá', 'Pereira', 'Medellín', 'Barranqiulla',
      'Caratagena', 'Santa Marta'
    ];
    
  }

  private crearFormulario() {
    this.crearReporteForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      const file = files[0];
      this.crearReporteForm.get('imagen')?.setValue(file.name);
    }
  }

  public crearReporte() {
    console.log(this.crearReporteForm.value);
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();

    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.crearReporteForm.get('ubicacion')?.setValue({
        latitud: marcador.lat,
        longitud: marcador.lng,
      });
    });
  }

  
}
