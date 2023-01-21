import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventClientService } from '../../services/event-client.service';
import { AddCostComponent } from '../add-cost/add-cost.component';
import { AddEventComponent } from '../add-event/add-event.component';
export interface PeriodicElement {
  name: string;
  users: Array<string>
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },
  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },

  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },

  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },
  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },
  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },
  { name: 'Hydrogen', users: ['231,33PLN', '311,33EUR'] },

];
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
  
})
export class EditEventComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name'];
  displayedColumns: string[] = ['name', 'weight'];
  public form: FormGroup;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | undefined;
  public isBusy: boolean;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute, private _eventClient: EventClientService) {
    this.isBusy = true;
    this.form = this._formBuilder.group({
      name : ['', [Validators.required]],
      code : [{ value: '', disabled: true }, [Validators.required]],
      defaultCurrencyId: this._formBuilder.control("", [Validators.required])
    });
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
   
    this._eventClient.getEvent(+id).then(result => {
      this.form.setValue({
        name: result.name,
        code: result.code,
        defaultCurrencyId: result.defaultCurrencyId
      });
      this.isBusy = false;

    });
    


    console.log(id);

  }
  public get getCurrencyControl(): FormControl {
    return (this.form.get('defaultCurrencyId') as FormControl)
  }
  open() {
    const dialogRef = this.dialog.open(AddCostComponent,{
      height: '90%',
      width: '100%',
      data: { 
        eventId: +(this.route.snapshot.paramMap.get('id') as string),
        currencyId: +this.getCurrencyControl.value 
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    //this.animal = result;
    });
  }

}
