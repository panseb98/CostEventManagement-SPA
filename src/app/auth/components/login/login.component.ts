import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
import { AuthClientService } from '../../services/auth-client.serivce';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  model: LoginModel;
  constructor(private fb:FormBuilder, private authClient: AuthClientService, private authService: AuthService) {
    this.form = this.fb.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
    this.model = new LoginModel();
   }

  ngOnInit() {
  }

  async submit() {
    const values = this.form.value;
    const registerModel = {
      email: values.username,
      password: values.password
    } as LoginModel
    const res = await this.authClient.loginUser(registerModel);
    this.authService.login(res.token as string);
    console.log(res);
  }


}
