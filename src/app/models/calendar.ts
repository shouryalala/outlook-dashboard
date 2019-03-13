export class Calendar {
    subject:string;
    startTime:string;
    endTime:string;

    constructor(subject:string, startTime:string, endTime:string) {
        this.subject = subject;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}