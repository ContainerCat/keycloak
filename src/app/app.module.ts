import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService){
  return () =>
    keycloak.init({
      config: {
        url: "http://localhost:8089/auth",
        realm: "angelkey-realm",
        clientId: "angelkey-client"
      },
      initOptions:{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + "/assets/silent-sso.html"
      },
      loadUserProfileAtStartUp: true
    })
}

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
