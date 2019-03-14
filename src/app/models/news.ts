export class News {
    source:string;
    title:string;
    url:string;
    img_url:string

    constructor(source:string, title:string, url:string, img_url:string) {
        this.source = source;
        this.title = title;
        this.url = url;
        this.img_url = img_url;
    }
}