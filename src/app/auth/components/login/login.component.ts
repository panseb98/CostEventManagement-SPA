import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  model: LoginModel;
  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
    this.model = new LoginModel();
   }

  ngOnInit() {
  }

  async submit() {


  }


}
