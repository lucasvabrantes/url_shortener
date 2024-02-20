export class Url {
    readonly id: number;
    url: string;
    expirationDate: Date;
    readonly hash: string;

    constructor() {
        this.expirationDate = new Date();
    }
}
