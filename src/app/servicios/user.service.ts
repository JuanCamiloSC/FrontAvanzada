import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDTO } from '../dto/message-dto';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { Observable } from 'rxjs';

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

}
