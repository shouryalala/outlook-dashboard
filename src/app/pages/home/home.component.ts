/**
 * Created by andrew.yang on 5/18/2017.
 */
import {OnInit, Component} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from "app/models/email";
import { Calendar } from "app/models/calendar";
//declare function notify(message:string):any;

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    emails:Email[] = new Array();
    calendars:Calendar[] = new Array();
    auth_token = "Bearer EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAYjl8gDi5R99mLmwEWzbv9KxvPbnBz6i/IKWCU/qOBN7pA6E/s9QryqxvQTZ7vXmplIYeIl0AgHcVLZVHJ66q9TJdOyv26tmCjuay%2bqNA06O2BssPFgeBXE2y1sz1fwAkT3Xi5CdbGEAGERuq/UGg7v9h62uZOxGTl1QmEjzpSskskaubl2Mzdh25%2bcjUBsTls6WvqRBArCM6fOvF/%2bdL2r5tFpFy3ATtNd26D3p6VjoODZG7TSYvVQlr9F5RiR0I6QiyOpnZFgbn50x1YHzOBTmcLZ/QIcOPHOvTgm5FCkfcHObOuTY/aZyVqXLFe/L9iMe4tt8NblVS7zoizOhPJ0DZgAACK1BXjlddqP1QAKMfKNmXkFq/LeEWXx1JLWEBrAOwAq6%2bOaxdp6jn%2bRI3qDcGlRDq6GjmgLfCDuXD6kDQoIlEvA9TDnQOGJa/tnkiRVSZnC8uROpjE8q5V51hdonWIetuYFv90e4hROwdcQ5LI4eO%2bXyv2HuUaIaxjBlTD/1j1PHKl/wWY4kp1DgAgxXLA017ZFnxgQnIjZE3THM4VvKz%2bvyYdOIZoilsdNwvB3CpT%2bCxlTHrkkmsg5GQTEHAyffahIXZk1dt0ZBzqIJBHGE0JrPFaiyKy1EcKZfEVNU1KW53AI8LqbzPl%2bobV8hEk/qPanPrklOKgJ8%2bSwh7cd/apkwMyZqz6H1yE4ZOWHfTZvDclwGdV2N68VeIMsnS3yDdsM3QB/7AIgEhJqbzjBf0W51/jKlQdRQvC6p9CF9Rs1gGKYS2ClaVuVnUTXGL03nqqVImXXNw5tIl3z9dsJzphzhStalmNW2fGkiO9xsfMN/Dma57YL754iUnCX7UT7jOgIJgmmQ9MB8Z6CtYDe8NDdV0TD08jPKwwx%2bpXwexMdIxLj%2bfATPQE5wS%2bw3ectnpAXTkCfVjcCICKKalYkMB9CU7Tv19kP1fqRBSc415eRtRs4CQe1pOLPGIpneg4br2cAT0xlRHjJlS/cMtQe7ibrIfjCOexUfcAzXj9m9LS0cmz3Em55S5d7glCFPctYvWTM6zknvB24E3mz2z5HYqqsEps/fQOP1xlBffVDwPvJbxcGc1Kubdbno76wLjza5xhUYHZWi/qe7a6yCAg%3d%3d";
    constructor(private httpClient: HttpClient) {         
    }
    heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    ngOnInit() {        
    this.getAndSetEmails();
    this.getAndSetCalendarevents();
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
}