import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { CurrencyDTO } from '../../models/CurrencyDTO';
import { EventClientService } from '../../services/event-client.service';

@Component({
  selector: 'app-currency-control',
  templateUrl: './currency-control.component.html',
  styleUrls: ['./currency-control.component.css']
})
export class CurrencyControlComponent implements OnInit, ControlValueAccessor {
  @Output() public newItemEvent = new EventEmitter<number>();

  public formControl = new FormControl();
  public options = new Array<CurrencyDTO>();
  public filteredOptions: any;

  public constructor(private _eventClient: EventClientService, @Optional() private ngControl: NgControl) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
  }

  public async ngOnInit(): Promise<void> {
    this.options = await this._eventClient.getCurrencies();
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => value ? this._filter(value) : this.options.slice()),
    );
    this.formControl.setValue(this.options.find(x => x.id === this.formControl.value))
  }
  
  public displayFn(user: CurrencyDTO): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: any): CurrencyDTO[] {
    if (typeof name === 'string') {
      const filterValue = name.toLowerCase();

      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    return this.options;
  }

  onSelectionChange(event: any){
    this.newItemEvent.emit(event.option.value);
  }

  onChange = (_: any) => { };
	onTouched = () => { };

	writeValue(obj: any) {
		this.formControl.setValue(obj);
	}
	registerOnChange(fn: any) {
		this.onChange = fn;
	}
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}
}
