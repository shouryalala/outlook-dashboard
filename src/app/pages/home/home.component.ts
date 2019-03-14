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
    auth_token = "Bearer EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAdraMEn7/UDiGahfxhGR7V2smLUgH5d6KGWSq%2brvUlwbzShgJNZ%2bvKRHiqJ90fAU6gomcsOqqO00Y45KdmQ7mNRtaFBy4ao7TVby/Y%2b9pE3Iab3RuKvZqcyAr3vT8jWbSDoSMiqfMA5z/5bptUCTSV54IntW/B%2b2H1peRALJc2oE4RAzL3s5QlSd7q6zqNPLi1XMqPS43IM/RzR%2bQItBU8g48Ee4zlF%2b7jeyWoOIhZeFa3ZOMg7ph9a22pmEohdIeIHupqKnkNKzftvSLwW/Wvww55m7dNaDfMTKuX2Bj3DdGB8SO8vgCFkTZkwZV6toStl1Q1MsEMfofqKcFe7kDbwDZgAACMIxpXLGiBpcQAIh3RFn95vXqDMQSWWzKxj6bDOzt0Rlm0YR94zCqphKZ/DXSNCfxOOt2WSPI/MsSDSfjlNKKYyuLevSJw/9kv6RRycjFb8Xc2iZKSONpTwJ5pqSnj/KCU28%2b/cdfv7KvBiq1Cm0TvRN6ZUV4%2bAtoMolJBVLpcYCu1nYrZ5PLNX6E/bYolIPz6jfQ%2blpreYyESLKS1a4ug12AVCDRgJOQyst15hgnVhOF8apIy0lhMxxmj10BTrN12RWa9Sqehs6EnltYBjCiiQiBQpHNGAPiFyKIPhWm%2byoKytb/oT6CpuJ%2b6I7FL5JW4E52t1hD1IEF7RVJt6WzepcTqKW1h4qI4awZl1d7lLDInb1Wpy5JwW%2bB6Eyu49F%2bYZqioKQRN5wu1GLac2shwgGdz2nIRaadofNnd99wlfA4C/p7hLkU3NKcwyjP3RjDEazftWzG2JpNN7R3Ynx3z4KVo/yBpHi4u/KP9FN%2bRu2JISB/4aDbo3fVhWaV1n3AoH399QcpO/e37Z6sUpF89dWmMSpS4Ocm5IC65%2bIMG/szpPWV%2bUIvZn83nWViaSTV%2bvPUIPDNFUNusZH0qxaAOXnMzeffZPRFSr2TNT7KFWpQKGX71FKjYJYclqqGUy7MpBjMrH4wXSgwtGvoEPCI6HihfidIlnqqj5u9zCfWTDI8WOXZA/18eRuTtPH1KFxOo65HWdsj5FyXKUMkGbq3ynKiEMOfMaqbhoijSuk4TeXkb4Lc6lkp1jt53kQVQL9Aglcc3VBpPQQeseCAg%3d%3d";
    constructor(private httpClient: HttpClient) {         
    }
    heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    ngOnInit() {        
    this.getAndSetEmails();
    this.getAndSetCalendarevents();
    this.getFinanceNews();

    this.tick[1] = false;
    this.tick[2] = true;
    this.tick[3] = false;
    this.tick[4] = false;
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