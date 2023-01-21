import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { AddCostComponent } from './components/add-cost/add-cost.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../auth/services/token-interceptor.service';
import { SharedModule } from '../shared/shared.module';
import { JoinToEventComponent } from './components/join-to-event/join-to-event.component';
import { CurrencyControlComponent } from './components/currency-control/currency-control.component';



@NgModule({
  declarations: [

  
    
  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class EventModule { }
