import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

public setToken(token: string) {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string | null {
 return sessionStorage.getItem(TOKEN_KEY);
}

public isLogged(): boolean {
 if (this.getToken()) {
   return true;
 }
 return false;
}

public login(token: string) {
   this.setToken(token);
   this.router.navigate(["/"]);
}

public logout() {
   window.sessionStorage.clear();
   this.router.navigate(["/login"]);
}

private decodePayload(token: string): any {
  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Token sin payload");
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Error decodificando el token:", e);
    return {};
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
  if (!token) return '';

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return '';

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    const payload = JSON.parse(jsonPayload);

    const rawRol = payload.rol || '';
    return `ROLE_${rawRol.toUpperCase()}`; // <--- Aquí lo normalizamos
  } catch (e) {
    console.error('Error al decodificar el token:', e);
    return '';
  }
}





}
