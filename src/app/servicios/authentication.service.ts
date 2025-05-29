import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto';
import { MessageDTO } from '../dto/message-dto';
import { TokenDTO } from '../dto/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 private authURL = "http://localhost:8080/api/auth";


  constructor(private http: HttpClient) { }

public login(loginDTO: LoginDTO): Observable<MessageDTO<TokenDTO>> {
 return this.http.post<MessageDTO<TokenDTO>>(`${this.authURL}/login`, loginDTO);
}

public refresh(token: string): Observable<MessageDTO<TokenDTO>> {
  return this.http.post<MessageDTO<TokenDTO>>(`${this.authURL}/refresh`, { token });
  }

}
