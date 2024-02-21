export class Url {
    readonly id: number;
    url: string;
    readonly newUrl: string;
    createdAt: Date;

    constructor() {
        this.createdAt = new Date();
    }
}
