import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventClientService } from '../../services/event-client.service';

@Component({
  selector: 'app-join-to-event',
  templateUrl: './join-to-event.component.html',
  styleUrls: ['./join-to-event.component.css']
})
export class JoinToEventComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private _eventClient: EventClientService, private router: Router) {
    this.form = this.fb.group({
      code : ['', Validators.required]
    });
  }
  
  async ngOnInit() {

  }

  public async submit(): Promise<void> {
    const eventModel = this.form.value;
    const eventId = await this._eventClient.joinToEvent(eventModel.code as string);
    this.router.navigate(['/event/edit/' + eventId]);

  }
}
