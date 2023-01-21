import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../../models/UserDTO';
import { AuthClientService } from '../../services/auth-client.serivce';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private _authClient: AuthClientService) {
    this.form = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      name : ['', [Validators.required]],
      surname : ['', [Validators.required]],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  public submit(): void {
    const values = this.form.value;
    const registerModel = {
      email: values.email,
      name: values.name,
      surname: values.surname,
      password: values.password
    } as UserDTO

    this._authClient.registerUser(registerModel);
  }

  
}
