import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

public setToken(token: string) {
  if (typeof window !== 'undefined') {
   window.sessionStorage.removeItem(TOKEN_KEY);
   window.sessionStorage.setItem(TOKEN_KEY, token);
  }
}

public getToken(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  return null;
}

public isLogged(): boolean {
 if (this.getToken()) {
   return true;
 }
 return false;
}

public login(token: string) {
   this.setToken(token);
   const rol = this.getRol();
   let destino = rol == "ROLE_ADMIN" ? "/gestion-reportesadmin" : "/principal-usuario";
   this.router.navigate([destino]).then(() => {
    window.location.reload();
 });

}

public logout() {
  if (typeof window !== 'undefined') {
   window.sessionStorage.clear();
   this.router.navigate(["/login"]).then(() => {
    window.location.reload();
  });
}

}

private decodePayload(token: string): any {
  if (!token || typeof token !== 'string' || token.split(".").length !== 3) {
    throw new Error("Token inválido");
  }

  try {
    const payload = token.split(".")[1];
    
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    throw new Error("Token inválido");
  }
}


public getIdUser(): string {
 const token = this.getToken();
 if (token) {
   const values = this.decodePayload(token);
   return values.sub;
 }
 return "";
}


public getRol(): string {
 const token = this.getToken();
 if (token) {
   const values = this.decodePayload(token);
   return values.rol;
 }
 return "";
}

public getEmail(): string {
 const token = this.getToken();
 if (token) {
   const values = this.decodePayload(token);
   return values.email;
 }
 return "";
}






}
