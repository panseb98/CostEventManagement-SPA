export class CostDTO {
    id : number;
    name : string;
    value : number;
    currencyId : number;
    eventId : number;
    payerId : number;
    users: Array<number>;
}