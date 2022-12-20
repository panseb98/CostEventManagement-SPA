import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-sales',
  template: `
    <app-page-header icon="monetization_on" header="Sales">


    </app-page-header>

    <form class="example-form">
      <mat-form-field class="example-full-width" appearance="outline">
        <mat-label>Assignee</mat-label>
        <input type="text" matInput [formControl]="myControl" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
          <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
          <img style="vertical-align:middle;" aria-hidden src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png" height="20" />
            {{option.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `
})
export class SalesComponent implements OnInit {
  myControl = new FormControl('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: any;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

export interface User {
  name: string;
}
