import { CostDTO } from "./CostDTO";

export class EventVM {
    id : number | undefined;
    code : string | undefined;
    name : string | undefined;
    defaultCurrencyId : number | undefined;
    users: Array<UserBalanceVM> | undefined;
    costs: Array<CostDTO> | undefined;
}

export class UserBalanceVM {
    id : number | undefined;
    name : string | undefined;
    costs : string | undefined;
}