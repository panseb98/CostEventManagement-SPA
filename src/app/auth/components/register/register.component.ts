import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/LoginModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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
