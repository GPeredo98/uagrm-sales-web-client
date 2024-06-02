import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = "https://api-gateway-91.azure-api.net/auth";

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasenha: string) {
    const route = this.API_URL + "/api/login";
    const body = {
      username: usuario,
      password: contrasenha
    };
    return this.http.post(route, body);
  }

}
