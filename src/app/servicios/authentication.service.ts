import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto';
import { MessageDTO } from '../dto/message-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 private authURL = "http://localhost:8080/api/auth";


  constructor(private http: HttpClient) { }

  public login(loginDTO: LoginDTO): Observable<MessageDTO> {
 return this.http.post<MessageDTO>(`${this.authURL}/login`, loginDTO);
}

}
