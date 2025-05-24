import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import {CrearReporteComponent} from './paginas/crear-reporte/crear-reporte.component';
import { GestionReportesComponent } from './paginas/gestion-reportes/gestion-reportes.component';
import { DetalleReporteComponent } from './paginas/detalle-reporte/detalle-reporte.component';
import { CodigoVerificacionComponent } from './paginas/codigo-verificacion/codigo-verificacion.component'; 
import { RecuperarPasswordComponent } from './paginas/recuperar-password/recuperar-password.component';
import { LoginAdminComponent } from './paginas/administrador/login-admin/login-admin.component';
import { PasswordRecuperarComponent } from './paginas/password-recuperar/password-recuperar.component';
import { PrincipalUsuarioComponent } from './paginas/principal-usuario/principal-usuario.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { EditarPerfilComponent } from './paginas/editar-perfil/editar-perfil.component';
import { GestionCategoriasComponent } from './paginas/administrador/gestion-categorias/gestion-categorias.component';
import { GestionReportesadminComponent } from './paginas/administrador/gestion-reportesadmin/gestion-reportesadmin.component';

export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'crear-reporte', component: CrearReporteComponent},
   { path: 'gestion-reportes', component: GestionReportesComponent },
   { path: 'detalle-reporte/:id', component: DetalleReporteComponent },
   { path: 'codigo-verificacion', component: CodigoVerificacionComponent},
   { path: 'recuperar-password', component: RecuperarPasswordComponent},
   { path: 'login-admin', component: LoginAdminComponent},
   { path: 'password-recuperar', component: PasswordRecuperarComponent},
   { path: 'principal-usuario', component: PrincipalUsuarioComponent},
   { path: 'perfil', component: PerfilComponent},
   {path: 'editar-perfil', component: EditarPerfilComponent},
   {path: 'gestion-categorias', component: GestionCategoriasComponent},
   {path: 'gestion-reportesadmin', component: GestionReportesadminComponent},
   { path: '**', pathMatch: 'full', redirectTo: '' }
];
