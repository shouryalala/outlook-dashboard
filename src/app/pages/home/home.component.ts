/**
 * Created by andrew.yang on 5/18/2017.
 */
import {OnInit, Component} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from "app/models/email";
//declare function notify(message:string):any;

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    emails:Email[] = new Array();
    constructor(private httpClient: HttpClient) {         
    }
    heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    ngOnInit() {        
    this.showmehow();
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
    public showmehow() {
        //console.log(sessionStorage.getItem('accessToken'));   
        //const auth_token = 'Bearer ' + sessionStorage.getItem('accessToken');
        const auth_token = "Bearer EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAccgB/fLnfK9RUEXuz68WMayiv60Wo/ipuq5GTsIHAXQqZPVW56TNpxVBtU/djs8v9nXTL/xN6EpQ8lygzqTx0VNH84oHOmQfJol1y0qu/vEQ1cTDKhKY3gjtOkF6VEVH6VNDiNwzvKg2ShMRFNNBW500fziWnoVEuZ0INfBOVJnnJzRKVjCMPP9sSgHJg1uj%2bRoXJ1Iyv3E5KGDXtiaZkpxYKKdmAiJ4yUFKmDAFGDYTCuC2/Ff%2bT%2b3uDwfZ0A1vgTCrct6OZqZT8qP8aHE3ykybD5U7uH%2bxIY/2h8XlV4j6HK8pTHVRO3CEpnl3lYVWk6F9xlDCC2CwSIzfUsgqkYDZgAACAHx3OpF9yTNQAJTC/WPG7Hy3en1t85dc8p4lczuonxx6zgkB6%2b0/1L4h0dG7akNmRJcjTMQoJaclvSZup3QSomYBTlGZSV/BOWFj7EoAGtnJDwDs2WZ3qemiPR8%2bXwmghipP4/r6Jf/0R9xyKuqfiWSPa/gFqA6SeS3rLBX0GmOyHQ/987m718BzrWPHx3yrbTz6Ox2kYiwNxypdqPBQUSTXLdqvDvefv4PAYMYaVMWAoQMHvjM5yDKCdQ0XhOI8klarj3bQfkJiCDBFyImIlCaYlawZwqmewk3dijaZ5Zuh6he3apSCdEdXULkZmTB4OeEf8/GaWAHMgM%2bl1q9TdL3ojmbSqIxCdNO9G/SmwiwvUTXHP8vJWIfEUSUHIfcoo7Wo90w090NKurVNW0JnzGoSAXANLBab99oEQaFXzAhG%2b3swCrW%2b77H%2beUaWnMmZ9mLz0e8kvlsiYaJsF6%2bMDaeMbCUPqJ22kwg%2bZ3iND0nJeTvX%2bWTHTYmshu/r1PsR501Fb9DxCfFOSt90hqYcwzNOeGfh4T7umwm1aESemLY6gas7t3EA/jIPKJmchkIQtNquuLRLfBZEBBh60VByzvJTYe/xtmBdjS/OWvBZNU3jOs8JVKzJ2jaZQYzgpN2u5VxK7E5wgqaOWm%2bmKE4vutPY1rI68TMyBLUNn3HClzwkN1zF8JLzv1WmgukGn0QboHX5klxamtWYUm2T/NEyM2EtUzf56ytl1OjlgVJYodh%2bkhIjkTDekEj61IufRQ5FYMempWWHvZ7K1iCAg%3d%3d";
        console.log("Auth: " + auth_token);
        //'Origin': 'http://localhost:4200',
        //'Referer': 'http://localhost:4200/',
        //'SdkVersion': 'graph-js-1.2.0',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        const headersDict = {
          'Authorization': auth_token,      
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
}