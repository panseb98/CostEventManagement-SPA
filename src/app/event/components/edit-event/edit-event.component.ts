import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { from, Observable, Subject } from 'rxjs';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { CostDTO } from '../../models/CostDTO';
import { EventVM, UserBalanceVM } from '../../models/EventVM';
import { SettleUserEvent } from '../../models/SettleUserEvent';
import { EventClientService } from '../../services/event-client.service';
import { AddCostComponent } from '../add-cost/add-cost.component';
import { AddEventComponent } from '../add-event/add-event.component';
import {Clipboard} from '@angular/cdk/clipboard';

declare let alertify: any;
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
  
})
export class EditEventComponent implements OnInit {
  public userDataSource = new MatTableDataSource<UserBalanceVM>;
  public costsDataSource = new MatTableDataSource<CostDTO>;
  public isNotBusy = new Subject<boolean>();

  public userDisplayedColumns: string[] = ['name', 'costs', 'actions'];
  public costsDisplayedColumns: string[] = ['name', 'value'];

  public eventCurrency: number;
  public eventId: string;
  public eventName: string;
  public eventCode: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, 
    private _eventClient: EventClientService, 
    private deviceService: DeviceDetectorService, 
    private router: Router,
    private alertifyService: AlertifyService,
    private clipboard: Clipboard) {
  }

  public async ngOnInit(): Promise<void> {
    this.isNotBusy.next(false);

    this.eventId = this.route.snapshot.paramMap.get('id') as string;
   
    this._eventClient.getEvent(+this.eventId).then(result => {
      this.eventName = result.name;
      this.eventCurrency = result.defaultCurrencyId;
      this.eventCode = result.code;
      this.userDataSource.data = result.users;
      this.costsDataSource.data = result.costs;
      this.isNotBusy.next(true);
    })
  }

  public settleUser(userId: number): void {
    const model = {
      eventId: +this.eventId,
      firstUserId: userId,
      secondUserId: 0
    } as SettleUserEvent;

    this._eventClient.settleUser(model).then(result => {
      if (result) {
        this.alertifyService.successMessage('Poprawnie rozliczono koszty z ' + this.userDataSource.data.find(x => x.id === userId)?.name)
        this.ngOnInit();
      } else {
        this.alertifyService.errorMessage('Wystąpił problem podczas rozliczania uzytkownika')
      }
    });
  }

  public open(): void {
    if (this.deviceService.isMobile()) {
      this.router.navigate([`/event/cost/${this.eventId}/${this.eventCurrency}`]);
    } else {
      const dialogRef = this.dialog.open(AddCostComponent,{
        height: '90%',
        width: '100%',
        data: { 
          eventId: this.eventId,
          currencyId: this.eventCurrency
        }
      });
    
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    }
  }
  public copyCode(): void {
    this.clipboard.copy(this.eventCode);
    this.alertifyService.successMessage('Poprawnie skopiowano kod wydarzenia')

  }

  public getTotalCost(): number {
    return +this.userDataSource.data.map(t => t.costs).reduce((acc, value) => acc + +value, 0).toFixed(2);
  }
}
