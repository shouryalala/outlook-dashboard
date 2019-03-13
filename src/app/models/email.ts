export class Email {
    from:string;
    receivedDateTime:string;
    subject:string;

    constructor(from:string, rec:string, sub:string) {
        this.from = from;
        this.receivedDateTime = rec;
        this.subject = sub;
    }
}