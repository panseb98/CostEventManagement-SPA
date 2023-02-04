import { CurrencyDTO } from "./CurrencyDTO";
import { SimpleUserVM } from "./SimpleUser";

export class EventDTO {
    constructor() {
        this.id = 0;
        this.automaticConvert = true;
    }
    id : number | undefined;
    code : string | undefined;
    name : string | undefined;
    defaultCurrencyId : number | undefined;
    defaultCurrencyCode: string | undefined;
    automaticConvert: boolean | undefined;
    users: Array<SimpleUserVM> | undefined;
}