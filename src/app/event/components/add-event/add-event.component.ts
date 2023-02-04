import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder, private _eventClient: EventClientService, private router: Router) {
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

  test(a: any) {
    this.form.get('defaultCurrencyId')?.setValue(a);
  }

  public async submit(): Promise<void> {
    const eventModel = new EventDTO();
    eventModel.defaultCurrencyId = this.form.value.defaultCurrencyId.id;
    eventModel.defaultCurrencyCode = this.form.value.defaultCurrencyId.code;
    eventModel.users = new Array<SimpleUserVM>();
    eventModel.name = this.form.value.name;
    eventModel.code = '';
    console.log(eventModel);
    const eventId = await this._eventClient.addEvent(eventModel);
    this.router.navigate(['/event/edit/' + eventId]);

  }
  

}
