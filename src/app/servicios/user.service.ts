import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDTO } from '../dto/message-dto';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { UserDTO } from '../dto/user-dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Municipality } from '../enum/municipality.enum';
import { Rol } from '../enum/rol.enum';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  // ✅ Retorna el usuario creado
  public create(createrUserDTO: CreateUserDTO): Observable<MessageDTO<UserDTO>> {
    return this.http.post<MessageDTO<UserDTO>>(this.userURL, createrUserDTO);
  }

  // ✅ Retorna el usuario actualizado
  public editar(updateUserDTO: UpdateUserDTO): Observable<MessageDTO<UserDTO>> {
    return this.http.put<MessageDTO<UserDTO>>(this.userURL, updateUserDTO);
  }

  // ✅ Retorna string de confirmación
  public delete(id: string): Observable<MessageDTO<string>> {
    return this.http.delete<MessageDTO<string>>(`${this.userURL}/${id}`);
  }

  // ✅ Retorna un usuario
  public get(id: string): Observable<MessageDTO<UserDTO>> {
    return this.http.get<MessageDTO<UserDTO>>(`${this.userURL}/${id}`);
  }

  // ✅ Retorna lista de usuarios
  public listAllUsers(filter?: { name?: string; city?: string }): Observable<MessageDTO<UserDTO[]>> {
    let params = new HttpParams();
    if (filter) {
      if (filter.name) {
        params = params.set('name', filter.name);
      }
      if (filter.city) {
        params = params.set('city', filter.city);
      }
    }
    return this.http.get<MessageDTO<UserDTO[]>>(this.userURL, { params });
  }

  // ✅ Retorna string de éxito
  public activateAccount(email: string, code: string): Observable<MessageDTO<string>> {
    return this.http.put<MessageDTO<string>>(`${this.userURL}/${email}/activate`, { code });
  }

  public changePassword(email: string, code: string, newPass: string): Observable<MessageDTO<string>> {
    return this.http.put<MessageDTO<string>>(`${this.userURL}/${email}/password`, { code, newPass });
  }

  public sendVerificationCode(email: string): Observable<MessageDTO<string>> {
    return this.http.post<MessageDTO<string>>(`${this.userURL}/${email}/verificationCode`, {});
  }

  public crearAdminDePrueba(): void {
  const nuevoAdmin: CreateUserDTO = {
    name: 'Admin de Prueba',
    phone: '3111234567',
    municipality: Municipality.ARMENIA,
    address: 'Carrera 15 #20-30',
    email: 'admin@shielduq.com',
    password: 'admin123',
    rol: Rol.ADMIN
  };

  this.create(nuevoAdmin).subscribe({
    next: (data) => {
      console.log('✅ Usuario admin creado:', data.content);
    },
    error: (err) => {
      console.error('❌ Error al crear el admin:', err.error?.content || err.message);
    }
  });
}

  
}
