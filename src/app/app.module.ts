import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { AddEventComponent } from './event/components/add-event/add-event.component';
import { EditEventComponent } from './event/components/edit-event/edit-event.component';
import { EventModule } from './event/event.module';
import { ListEventComponent } from './event/components/list-event/list-event.component';
import { AuthClientService } from './auth/services/auth-client.serivce';
import { AddCostComponent } from './event/components/add-cost/add-cost.component';
import { RoleGuardService } from './auth/services/role-guard.service';
import { AuthService } from './auth/services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { EventClientService } from './event/services/event-client.service';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JoinToEventComponent } from './event/components/join-to-event/join-to-event.component';
import { CurrencyControlComponent } from './event/components/currency-control/currency-control.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [RoleGuardService],
    children: [
      {
        path: 'event',
        component: ListEventComponent
      },
      {
        path: 'event/add',
        component: AddEventComponent
      },
      {
        path: 'event/edit/:id',
        component: EditEventComponent
      },
      {
        path: 'event/join',
        component: JoinToEventComponent
      },
      {
        path: 'event/cost',
        component: AddCostComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
 
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    AuthModule,
    EventModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() { 
        return localStorage.getItem('token');
        } 
     }
   })
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    PageHeaderComponent,
    AddEventComponent,
    EditEventComponent,
    ListEventComponent,
    AddCostComponent,
    JoinToEventComponent,
    CurrencyControlComponent
  ],
  providers: [
    AuthClientService, RoleGuardService, AuthService, EventClientService,  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
