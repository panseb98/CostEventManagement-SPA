import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
