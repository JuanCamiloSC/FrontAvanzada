import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDTO } from '../dto/message-dto';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { UserDTO } from '../dto/user-dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = "http://localhost:8080/api/users";


  constructor(private http: HttpClient) { }

  public create(createrUserDTO: CreateUserDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(this.userURL, createrUserDTO);
  }


  public editar(updateUserDTO: UpdateUserDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(this.userURL, updateUserDTO);
  }


  public delete(id: string): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.userURL}/${id}`);
  }


  public get(id: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userURL}/${id}`);
  }

  public listAllUsers(filter?: { name?: string; city?: string }): Observable<MessageDTO> {
  let params = new HttpParams();

  if (filter) {
    if (filter.name) {
      params = params.set('name', filter.name);
    }
    if (filter.city) {
      params = params.set('city', filter.city);
    }
  }

  return this.http.get<MessageDTO>(this.userURL, { params });
}

  public activateAccount(email: string, code: string): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userURL}/${email}/activate`, { code });
  }

  public changePassword(email: string, code: string, newPass: string): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userURL}/${email}/password`, { code, newPass });
  }

  public sendVerificationCode(email: string): Observable<MessageDTO> {
  return this.http.post<MessageDTO>(`${this.userURL}/${email}/verificationCode`, {});
}

}
