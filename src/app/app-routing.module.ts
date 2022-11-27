import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakGuard } from './keycloak.guard';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  { path: 'public', component: PublicComponent},
  { path: 'private', component: PrivateComponent, canActivate: [KeycloakGuard]},
  { path: '**', component: PublicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
