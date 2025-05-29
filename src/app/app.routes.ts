import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { CrearReporteComponent} from './paginas/crear-reporte/crear-reporte.component';
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
import { ReportesUsuarioComponent } from './paginas/reportes-usuario/reportes-usuario.component';
import { AdministradorComponent } from './paginas/administrador/administrador.component';
import { LoginGuard } from './guards/login.service';
import { RoleGuard } from './guards/role.service';

export const routes: Routes = [

   {path: '', component: InicioComponent, canActivate: [LoginGuard] },
   {path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   {path: 'registro', component: RegistroComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT"] } },
   {path: 'crear-reporte', component: CrearReporteComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT"] }},
   {path: 'gestion-reportes', component: GestionReportesComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN"] } },
   {path: 'detalle-reporte/:id', component: DetalleReporteComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT"] } },
   {path: 'codigo-verificacion', component: CodigoVerificacionComponent},
   {path: 'recuperar-password', component: RecuperarPasswordComponent},
   {path: 'login-admin', component: LoginAdminComponent, canActivate: [LoginGuard]},
   {path: 'password-recuperar', component: PasswordRecuperarComponent},
   {path: 'principal-usuario', component: PrincipalUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT"] }},
   {path: 'perfil', component: PerfilComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT", "ROLE_ADMIN"] }},
   {path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT", "ROLE_ADMIN"] }},
   {path: 'gestion-categorias', component: GestionCategoriasComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN"] }},
   {path: 'gestion-reportesadmin', component: GestionReportesadminComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN"] }},
   {path: 'reportes-usuario', component: ReportesUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_CLIENT"] }},
   {path: 'administrador', component: AdministradorComponent, canActivate: [RoleGuard], data: { expectedRole: ["ROLE_ADMIN"] }},
   {path: '**', pathMatch: 'full', redirectTo: '' }
];
