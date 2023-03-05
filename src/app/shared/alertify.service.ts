import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
    providedIn: 'root'
})
export class AlertifyService {

    public constructor() {
        alertify.set('notifier','position', 'top-center');
    }
    public successMessage(message: string): void {
        alertify.success(message)
    }

    public errorMessage(message: string): void {
        alertify.error(message)
    }

    public infoMessage(message: string): void {
        alertify.info(message)
    }
}