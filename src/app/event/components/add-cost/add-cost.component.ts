import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CostDTO } from '../../models/CostDTO';
import { EventDTO } from '../../models/EventDTO';
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
  public form: FormGroup;
  private _currencyExchange = 0;
  private _eventCurrencyId = 0;
  private _eventCurrencyCode = '';

  private _costCurrencyId = 0;
  public constructor(private fb: FormBuilder, private _eventClient: EventClientService,@Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = this.fb.group({
      name : ['', [Validators.required]],
      value : ['', [Validators.required]],
      eventId : [data ? data.eventId : null, [Validators.required]],
      currencyId : [data ? data.currencyId : null, [Validators.required]],
    });
  }

  public async ngOnInit(): Promise<void> {
    const res = await this._eventClient.getEvents();
    this.eventDataSource = res;
    console.log(res);
  }

  displayedColumns: string[] = ['select', 'name'];
  eventDataSource = new Array<EventDTO>();
  dataSource = new MatTableDataSource<SimpleUserVM>();
  selection = new SelectionModel<SimpleUserVM>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  async doSomething(aa: any) {
    const eventModel = this.eventDataSource.find(x => x.id === aa.value);
    this._eventCurrencyCode = eventModel?.defaultCurrencyCode as string;
    this._eventCurrencyId = eventModel?.defaultCurrencyId as number;
    this.dataSource.data = eventModel?.users as SimpleUserVM[];
    console.log(this.form.value);

    if (this.form.value.currencyId) {
      console.log(this.form.value.currencyId);
      this.test123(this.form.value.currencyId);
    }
  }

  get getCurrencyControl(): FormControl {
    return (this.form.get('currencyId') as FormControl)
  }

  get showRecalculate(): boolean {    
    return this._eventCurrencyId !== this._costCurrencyId && this._eventCurrencyId !== 0 && this._costCurrencyId !== 0;
  }

  async test123(aa: any) {
    this.form.get('currencyId')?.setValue(aa);
    this._costCurrencyId = aa.id;
    const aaa = this.eventDataSource.find(x => x.id === this.form.value.eventId) as EventDTO;
    this._currencyExchange = await this._eventClient.getExchange(aa.id, aaa.defaultCurrencyId as number)
  }

  reacalculatedData(): string {
    return (this._currencyExchange * this.form.value.value).toFixed(2) + this._eventCurrencyCode;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EventDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  public async submit(): Promise<void> {
    const values = this.form.value;

    const modelDto = {
      name: values.name,
      value: values.value,
      currencyId: values.currencyId,
      eventId: values.eventId,
      users: this.selection.selected.map(x => x.id)
    } as CostDTO

    this._eventClient.addCost(modelDto);
    console.log(this.selection.selected);
    console.log(this.form.value);
  }
}
