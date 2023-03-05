import { CurrencyDTO } from "./CurrencyDTO";
import { SimpleUserVM } from "./SimpleUser";

export class EventDTO {
    constructor() {
        this.id = 0;
        this.automaticConvert = true;
    }
    id : number;
    code : string;
    name : string;
    defaultCurrencyId : number;
    defaultCurrencyCode: string;
    automaticConvert: boolean;
    users: Array<SimpleUserVM>;
}