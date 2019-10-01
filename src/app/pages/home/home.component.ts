/**
 * Created by andrew.yang on 5/18/2017.
 */
import {OnInit, Component} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from "app/models/email";
import { Calendar } from "app/models/calendar";
import { News } from "app/models/news";
//declare function notify(message:string):any;

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    emails:Email[] = new Array();
    calendars:Calendar[] = new Array();
    news:News[] = new Array();
    mArticles:Array<any>;
    happy:Boolean = true;
    tick:Boolean[] = new Array();
    email_count:Number;
    event_count:Number;
    auth_token = "Bearer EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAUG20iKVm6VelVzJVYD2NfK9luaL4Kj8GjunluxGa/Fn4E2LHbN6gA8Y7G6Fi6LBNimhRLLyHoPf6i8/bGQfY8iqnHI2X%2btsarR/enBW7Z71h2rWqFEs6I5L2J%2b452js4kFWpGYuu9XkJajjmkd4ERT5wMw/lywjHQxGCbKk/Fq6lg2Ni/QczZzejtAO16hMi/DQi9VTUPft3DhtpjtqSj0w%2bJyXisAiIS7Gq3DxqxfmEgbRmYClRJYV2yyqMTlMG3zM1aHNtTGwOqDA74z3ZoZ%2bAhEEFVBTGKqIk8UVfznnPShaiFjTMYytI9MqM99rNO3NZqyUEHHkKxwMPUp65cIDZgAACNGG2prqYMLaQAL28G6DqdI9axj%2b3iXD%2byfv3tcz0iw2zTWMqkyI4UF2FB0ixYmTpyRPlrMbS4XlHkES5apBBpbuudCpf8M6b2DuKpkZp0X5LhkyGMAWaxL9JIceGVuUbDerM0250QHe%2b8BAZghRoSayoU7npgw5KTHgXf9%2btQGC7MOgHOuNw4%2bGKYQrGdi9c5EpCsGKG09095388tPiJQ2wVPuNSif8TKKFTl6qZmzlGvzfu1iLnAeaqgC7iZy1ZEWXhURugwqX8oFFrOWAeYkfD1PNrygvFCnDT9ww5753watw49CxnzijvooAJ1xrejYfXPdcjvdDEUvOooLeLLXHBEn3SPouPOVPf74yAk6vzLzmyet/Tgfrd85uinsJZVe65lo7CqGIgCKu/r5lXiU589c5i0t56qWiAZChqNc5Ro8gikNZ32pyzqkxDAeA91ciaVXHUIS2OAHjAVZZU7tjnbUMgFbWKtfxa8ebRoMnq3JL6xNPWOjwdASi7X06%2b5PsEWwCsFOWdFbZbGoK6PpfnfEF8zaiSrHntKwI1SLyD16fYSbnI2qy1H3%2bZf%2benZjVVcVOPbiNmv88OeHJg2kylMeuUTg/rNKicy4mz2t9CRBC1RIi7DlosdzwFzHFJTaO%2bWMrzA31PAtstiPdDGBzuxA1sUdT2COJDHHRevMo9eYA0%2bjn7vkE8Ez1GjZvkvTbkA74V7cosR8ARdDiN6jJP1cwi8ILD1Xa6VXB93zv3jDOEmb9GSDx%2bTA%2bZcZ9fAXHfukX%2b/hH85%2bCAg%3d%3d";
    constructor(private httpClient: HttpClient) {         
    }
    heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    ngOnInit() {        
    //this.getAndSetEmails();
    this.getDummyEmails();
    this.getDummyCalendarEvents();
    //this.getAndSetCalendarevents();
    this.getFinanceNews();

    this.tick[1] = false;
    this.tick[2] = true;
    this.tick[3] = false;
    this.tick[4] = false;
    this.tick[5] = true;
    }

    showEmails(): Boolean {
        if (this.emails && this.emails.length > 0) {
            console.log(this.emails);
            return true;
        }
        else {
            console.log('ERRORR ---------');
            return false;
        }
    }

    showCalendars(): Boolean {
        if (this.calendars && this.calendars.length > 0) {
            console.log(this.calendars);
            return true;
        }
        else {
            console.log('ERRORR ---------');
            return false;
        }
    }

    showNews(): Boolean {
        if (this.news && this.news.length > 0) {
            console.log(this.news);
            return true;
        }
        else {
            console.log('ERRORR ---------');
            return false;
        }
    }

    public getDummyEmails() {
      this.emails[0] = new Email("Raghav", "September 24", "project Checkout");
      this.email_count = this.emails.length;
    }

    public getAndSetEmails() {
        //console.log(sessionStorage.getItem('accessToken'));   
        //const auth_token = 'Bearer ' + sessionStorage.getItem('accessToken');        
        console.log("Auth: " + this.auth_token);
        //'Origin': 'http://localhost:4200',
        //'Referer': 'http://localhost:4200/',
        //'SdkVersion': 'graph-js-1.2.0',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        const headersDict = {
          'Authorization': this.auth_token,      
        }        
        const url =  "https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$top=10&$select=subject,from,receivedDateTime,isRead&$orderby=receivedDateTime%20DESC";
        const reqOptions = {
          headers: new HttpHeaders(headersDict),
        };
        //console.log("" + );
        this.httpClient.get(url, reqOptions).subscribe((res)=>{
          //console.log(res);
          //var items = JSON.stringify(res);
          console.log(res);
          let emailResponse = res as any;
          console.log(emailResponse.value);
          var i = 0;
          emailResponse.value.forEach(element => {
              console.log('------------------------------------');
              console.log(element.subject);
              console.log(element.from.emailAddress.name);         
              console.log('------------------------------------');
              this.emails[i] = new Email(element.from.emailAddress.name, element.receivedDateTime ,element.subject);
              i++;
          });
          //notify("works!");

           /* $('#inbox-status').text('Here are the 10 most recent messages in your inbox.');
            var templateSource = $('#msg-list-template').html();
            var template = Handlebars.compile(templateSource);

            var msgList = template({messages: messages});
            $('#message-list').append(msgList);*/
        },
        (err)=> {
          console.log("Eror:" + err);
        });
        this.email_count = this.emails.length;
      }

      public getDummyCalendarEvents() {
        this.calendars[0] = new Calendar("Meet Raghav", "12:30pm", "1pm");
        this.event_count = this.calendars.length; 
      }

      public getAndSetCalendarevents() {        
        const headersDict = {
            'Authorization': this.auth_token,      
          }        
          const url =  "https://graph.microsoft.com/v1.0/me/events?$top=10&$select=subject,start,end,createdDateTime&$orderby=createdDateTime%20DESC";
          const reqOptions = {
            headers: new HttpHeaders(headersDict),
          };
          //console.log("" + );
          this.httpClient.get(url, reqOptions).subscribe((res)=>{
            //console.log(res);
            //var items = JSON.stringify(res);
            console.log(res);
            let calResponse = res as any;
            var i = 0;
            //console.log(emailResponse.value);
            calResponse.value.forEach(element => {
                const d:Date = new Date(element.start.dateTime);
                const e:Date = new Date(element.end.dateTime);                
                this.calendars[i] = new Calendar(element.subject, d.toLocaleTimeString() , e.toLocaleTimeString());
                i++;
            });
            
            //notify("works!");
  
             /* $('#inbox-status').text('Here are the 10 most recent messages in your inbox.');
              var templateSource = $('#msg-list-template').html();
              var template = Handlebars.compile(templateSource);
  
              var msgList = template({messages: messages});
              $('#message-list').append(msgList);*/
          },
          (err)=> {
            console.log("Eror:" + err);
          });    
          this.event_count = this.calendars.length;    
      }

      public getFinanceNews() {
        //mArticles:Array();
        const api_key = 'bcf9c9745a204c0991e64b9e5d73f142';
        var i =0;
    
        this.httpClient.get('https://newsapi.org/v2/top-headlines?sources=financial-post&apiKey='+ api_key).subscribe(data => {
            this.mArticles = data['articles']
            //console.log(data['articles']);
            this.mArticles.forEach(element => {
                this.news[i] = new News(element.source.name, element.title, element.url, element.urlToImage);
                console.log(" " + element.source.name + " " + element.title);
                i++;
            });
        });
      }

      public isChecked(status:number):Boolean{
          return this.tick[status];
      }

      public toggleTick(status:number) {
        this.tick[status] = !this.tick[status];
      }

      public checkTodo(){}
}