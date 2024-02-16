export class Url {
    readonly id: number;
    url: string;
    expiration_date: Date;
    readonly hash: string;

    constructor() {
        this.expiration_date = new Date(Date.now());
    }
}
