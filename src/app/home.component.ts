import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    template: `
    <app-page-header header="Home" icon="home">

    </app-page-header>

    <div style="padding: 0 20px">
    
    <mat-stepper [linear]="isLinear" #stepper>
 
    <mat-step [stepControl]="firstFormGroup">
    <div style="padding-top: 20px">
    </div>
        <form [formGroup]="firstFormGroup">
        <ng-template matStepLabel>Fill out your name</ng-template>
        <mat-form-field appearance="outline">
            <mat-label>Link do ogłoszenia</mat-label>
            <input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
        </mat-form-field>
        <div>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
        </div>
        </form>
    </mat-step>
    <!-- #docregion label -->
    <mat-step [stepControl]="secondFormGroup" label="Fill out your address">
    <!-- #enddocregion label -->
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <h2>Trwa pobieranie zawartości ogłoszenia</h2>
    </mat-step>
    <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        <p>You are now done.</p>
        <div>
        <button mat-button matStepperPrevious>Back</button>
        <button mat-button (click)="stepper.reset()">Reset</button>
        </div>
    </mat-step>
    </mat-stepper>

  `
})
export class HomeComponent {
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    isLinear = false;

    constructor(private _formBuilder: FormBuilder) { }
}
