import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyDTO } from '../models/CurrencyDTO';
import { EventDTO } from '../models/EventDTO';
import { EventVM } from '../models/EventVM';
import { CostDTO } from '../models/CostDTO';
import { SettleUserEvent } from '../models/SettleUserEvent';

@Injectable({
    providedIn: 'root'
})
export class EventClientService {
    constructor(private http: HttpClient) { }

    getCurrencies(): Promise<Array<CurrencyDTO>> {
        return new Promise((res, rej) => this.http
            .get<Array<CurrencyDTO>>(
                `${environment.api}/Event/GetCurrencies`
            ).subscribe(
                (x) => {
                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    getEvents(): Promise<Array<EventDTO>> {
        return new Promise((res, rej) => this.http
            .get<Array<EventDTO>>(
                `${environment.api}/Event/GetEvents`
            ).subscribe(
                (x) => {
                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    getEvent(id: number): Promise<EventVM> {
        let params = new HttpParams();
            params = params.append('eventId', id);
        return new Promise((res, rej) => this.http
            .get<EventVM>(
                `${environment.api}/Event/GetEvent`, {params: params}
            ).subscribe(
                (x) => {
                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    getExchange(from: number, to: number): Promise<number> {
        let params = new HttpParams();
            params = params.append('from', from);
            params = params.append('to', to );

        return new Promise((res, rej) => this.http
            .get<number>(
                `${environment.api}/Event/GetCurrenciesExchange`, {params: params}
            ).subscribe(
                (x) => {
                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    addCost(cost: CostDTO): Promise<boolean> {
        return new Promise((res, rej) => this.http
            .post<number>(
                `${environment.api}/Event/AddCost`,
                cost
            ).subscribe(
                (x) => {
                    res(true);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                }
            ));
    }

    addEvent(event: EventDTO): Promise<number> {
        return new Promise((res, rej) => this.http
            .post<number>(
                `${environment.api}/Event/AddEvent`,
                event
            ).subscribe(
                (x) => {

                    res(x);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);

                }
            ));
    }

    settleUser(event: SettleUserEvent): Promise<boolean> {
        return new Promise((res, rej) => this.http
            .post<void>(
                `${environment.api}/Event/SettleUser`,
                event
            ).subscribe(
                (x) => {
                    res(true);
                },
                (err: HttpErrorResponse) => {
                    console.log(err);

                }
            ));
    }

    joinToEvent(code: string): Promise<number> {
        try {
            console.log(code    );
            let params = new HttpParams();
            params = params.append('eventCode', code);
            return new Promise((res, rej) => this.http
                .get<number>(
                    `${environment.api}/Event/JoinToEvent`,
                    {params: params}
                ).subscribe(
                    (x) => {
                        console.log(x);
                        res(x);
                    },
                    err => {
                      console.log(err);
                     // check error status code is 500, if so, do some action
                    }
                ));
        }
        catch(e) {
            console.log(e)
            throw e;
        }

    }
}
