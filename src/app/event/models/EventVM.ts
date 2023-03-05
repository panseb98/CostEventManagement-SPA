import { CostDTO } from "./CostDTO";

export class EventVM {
    id : number;
    code : string;
    name : string;
    defaultCurrencyId : number;
    users: Array<UserBalanceVM>;
    costs: Array<CostDTO>;
}

export class UserBalanceVM {
    id : number;
    name : string;
    costs : string;
}