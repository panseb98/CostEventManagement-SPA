import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserDTO } from '../models/UserDTO';
import { LoggedUser } from '../models/LoggedUser';
import { LoginModel } from '../models/LoginModel';

@Injectable({
    providedIn: 'root'
})
export class AuthClientService {

    constructor(private http: HttpClient) { }

    registerUser(user: UserDTO): Promise<LoggedUser> {
        console.log(user);
        return new Promise((res, rej) => this.http
            .post<LoggedUser>(
                `${environment.api}/Auth/register`,
                user
            ).subscribe(
                (x) => {
                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    loginUser(user: LoginModel): Promise<LoggedUser> {
        return new Promise((res, rej) => this.http
            .post<LoggedUser>(
                `${environment.api}/Auth/login`,
                user
            ).subscribe(
                (x) => {

                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);

                }
            ));
    }
}
