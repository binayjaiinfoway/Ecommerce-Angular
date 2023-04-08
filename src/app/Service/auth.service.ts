import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:40400/EShop';
  constructor(private http: HttpClient) { }

  customerLogin(user: any) {
    return this.http.post(`${this.url}/login`, user)
  }

  RefreshToken(token: any) {
    return this.http.post(`${this.url}/token`, { token: token })
  }
  // SinGNup With Google
  SignupGoogle(data: any) {
    return this.http.post(`${this.url}/Google/signup`,data);
  }
  //login with Google
  loginGoogle(data: any) {
    return this.http.post(`${this.url}/Google/login`,data);
  }
  get Islogin(): boolean {
    let AuthToken = localStorage.getItem('AccessToken');
    return AuthToken !== null ? true : false;
  }
}
