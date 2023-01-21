export class CostDTO {
    id : number | undefined;
    name : string | undefined;
    value : number | undefined;
    currencyId : number | undefined;
    eventId : number | undefined;
    payerId : number | undefined;
    users: Array<number> | undefined;
}