import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private _eventClient: EventClientService) {
    this.form = this.fb.group({
      name : ['', [Validators.required]],
      defaultCurrencyId : this.fb.control("", [Validators.required])
    });
  }



  async ngOnInit() {

  }

  get getCurrencyControl(): FormControl {
    return (this.form.get('defaultCurrencyId') as FormControl)
  }

  public async submit(): Promise<void> {
    const eventModel = this.form.value as EventDTO;
    eventModel.defaultCurrencyId = this.form.value.defaultCurrencyId.id;
    eventModel.users = new Array<SimpleUserVM>();
    eventModel.code = '';
    console.log(eventModel);
    this._eventClient.addEvent(eventModel);
  }
  

}
