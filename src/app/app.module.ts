import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './sales.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared.module';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'chart',
        component: ChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    AuthModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    PageHeaderComponent,
    HomeComponent,
    SalesComponent,
    ChartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
