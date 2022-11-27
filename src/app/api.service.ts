import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient, private keycloakService: KeycloakService) { }

  public async getSecret(){
    const token = this.keycloakService.getToken();

    let headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    })

    return this.httpClient.get("http://localhost:5555/api/admin/secret", {headers: headers})

  }
}
