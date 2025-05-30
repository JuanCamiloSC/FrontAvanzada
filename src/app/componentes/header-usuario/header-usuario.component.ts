import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent {
  title!: "SHILED UQ";
}
