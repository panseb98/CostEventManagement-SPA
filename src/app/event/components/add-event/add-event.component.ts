import { ApplicationRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { CurrencyDTO } from '../../models/CurrencyDTO';
import { EventDTO } from '../../models/EventDTO';
import { SimpleUserVM } from '../../models/SimpleUser';
import { EventClientService } from '../../services/event-client.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  public form: FormGroup;
  public options = new Array<CurrencyDTO>();
  public filteredOptions: any;

  public constructor(private fb: FormBuilder, private _eventClient: EventClientService, private router: Router) {
    this.form = this.fb.group({
      name : ['', [Validators.required]],
      defaultCurrencyId : this.fb.control("", [Validators.required])
    });
  }

  public ngOnInit() {

  }

  public get getCurrencyControl(): FormControl {
    return (this.form.get('defaultCurrencyId') as FormControl)
  }

  public currencyChanged(newCurrency: any) {
    this.form.get('defaultCurrencyId')?.setValue(newCurrency);
  }

  public async submit(): Promise<void> {
    const formValues = this.form.value;

    const eventModel = { 
      defaultCurrencyId: formValues.defaultCurrencyId.id,
      defaultCurrencyCode: formValues.defaultCurrencyId.code,
      users: new Array<SimpleUserVM>(),
      name: formValues.name,
      code: ''
    } as EventDTO;
   
    const eventId = await this._eventClient.addEvent(eventModel);
    this.router.navigate(['/event/edit/' + eventId]);
  }
}
