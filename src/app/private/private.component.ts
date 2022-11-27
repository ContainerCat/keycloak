import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  
  secret : string = ""
  constructor(private keycloakService: KeycloakService, private api: ApiService) { 
  }

  ngOnInit(): void {
    const user = this.keycloakService.getUsername()

    if(user){
      this.secret = "getting secret"
      this.secret = this.api.getSecret().message

    }
    else{
      this.keycloakService.login()

    }
  }

  public username():string{
    return this.keycloakService.getUsername()
  }

  public logout(){
    this.keycloakService.logout('http://localhost:4200/public');
  }

}
