import { SelectionModel } from '@angular/cdk/collections';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { CostDTO } from '../../models/CostDTO';
import { EventDTO } from '../../models/EventDTO';
import { UserBalanceVM } from '../../models/EventVM';
import { SimpleUserVM } from '../../models/SimpleUser';
import { EventClientService } from '../../services/event-client.service';

export interface DialogData {
  eventId: string;
  currencyId: string;
}
@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.css']
})
export class AddCostComponent implements OnInit {
  public isDefaultEvent: boolean;
  public form: FormGroup;
  public userDataSource = new MatTableDataSource<UserBalanceVM>;
  public userDisplayedColumns: string[] = ['name'];
  public displayedColumns: string[] = ['select', 'name'];
  public eventDataSource = new Array<EventDTO>();
  public dataSource = new MatTableDataSource<SimpleUserVM>();
  public selection = new SelectionModel<SimpleUserVM>(true, []);

  private _currencyExchange = 0;
  private _eventCurrencyId = 0;
  private _eventId = 0;
  private _eventCurrencyCode = '';
  private _costCurrencyId = 0;

  public constructor(
    private fb: FormBuilder, 
    private _eventClient: EventClientService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    @Optional() public dialog: DialogRef,
    private _alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.isDefaultEvent = this.getDefaultValueForForm('eventId') !== null ;
      this.loadForm();
  }

  public async ngOnInit(): Promise<void> {
    const res = await this._eventClient.getEvents();

    if (this.isDefaultEvent) {
      this._eventId = this.getDefaultValueForForm('eventId') as number;
      const eventModel = res.find(x => x.id === this._eventId);
      this.dataSource.data = eventModel?.users as SimpleUserVM[];
      this._eventCurrencyId = this.form.value.currencyId;
      this._eventCurrencyCode = eventModel?.defaultCurrencyCode as string;
    }

    this.eventDataSource = res;
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  public async selectionChanged(aa: any) {
    const eventModel = this.eventDataSource.find(x => x.id === aa.value);
    this._eventCurrencyCode = eventModel?.defaultCurrencyCode as string;
    this._eventCurrencyId = eventModel?.defaultCurrencyId as number;
    this.dataSource.data = eventModel?.users as SimpleUserVM[];

    if (this.form.value.currencyId) {
      this.currencyChanged(this.form.value.currencyId);
    }
  }

  public get getCurrencyControl(): FormControl {
    return (this.form.get('currencyId') as FormControl)
  }

  public get showRecalculate(): boolean {    
    return this._eventCurrencyId !== this._costCurrencyId && this._eventCurrencyId !== 0 && this._costCurrencyId !== 0;
  }

  public async currencyChanged(newCurrency: any) {
    this.form.get('currencyId')?.setValue(newCurrency);
    this._costCurrencyId = newCurrency.id;
    const aaa = this.eventDataSource.find(x => x.id === this._eventId) as EventDTO;
    this._currencyExchange = await this._eventClient.getExchange(newCurrency.id, aaa.defaultCurrencyId as number)
  }

  public recalculatedData(): string {
    return (this._currencyExchange * this.form.value.value).toFixed(2) +  ' ' + this._eventCurrencyCode;
  }

  public checkboxLabel(row?: EventDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  public async submit(): Promise<void> {
    const values = this.form.value;
    const currencyId = values.currencyId === this._eventCurrencyId ? this._eventCurrencyId : values.currencyId;

    const modelDto = {
      name: values.name,
      value: values.value,
      currencyId: currencyId,
      eventId: this._eventId,
      users: this.selection.selected.map(x => x.id)
    } as CostDTO

    const res = await this._eventClient.addCost(modelDto);

    if (res) {
      this._alertify.successMessage('Poprawnie dodano koszty do wydarzenia.');
      if (this.data) {
        this.dialog.close();
      } else {
        this.router.navigate([`/event/edit/${this._eventId}`]);
      }
    } else {
      this._alertify.errorMessage('Coś poszło nie tak podczas dodawania kosztu.');
    }
  }

  private loadForm(): void {
    this.form = this.fb.group({
      name : ['', [Validators.required]],
      value : ['', [Validators.required]],
      eventId : [this.getDefaultValueForForm('eventId'), [Validators.required]],
      currencyId : [this.getDefaultValueForForm('currencyId'), [Validators.required]],
    });

    if (this.form.controls['eventId'].value) {
      this.form.controls['eventId'].disable();
    }
  }

  private getDefaultValueForForm(controlName: string): number | null {
    const routeParams = this.route.snapshot.paramMap;

    if (routeParams.has(controlName)) {
      return +(routeParams.get(controlName) as string);
    } else if (this.data) {
      return +(this.data as any)[controlName];
    } else {
      return null;
    }
  }
}

