import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const HTTPS_URL = 'https://3b63b5fb.ngrok.io/';
declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    FB.init({
      appId :  '940414166391366',
      status : false,
      cookie : false,
      xfbml  : false,
      version : 'v4.0'
    });
  }

  fbLogin() {
    return new Promise((resolve, reject) => {

      FB.login(result => {
        if (result.authResponse) {
          console.log(result.authResponse['accessToken']);
          return this.http
            .post(HTTPS_URL + `user/auth/facebook`, {access_token: result.authResponse['accessToken']})
            .toPromise()
            .then(response => {
              const token = response;
              if (token) {
                localStorage.setItem('id_token', JSON.stringify(token));
              }
              resolve(response);
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' });
    });
  }

  normalLogin(user){
    return true;
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(HTTPS_URL + `api/auth/me`).toPromise().then(response => {
        resolve(response);
      }).catch(() => reject());
    });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.clear();
  }

}
