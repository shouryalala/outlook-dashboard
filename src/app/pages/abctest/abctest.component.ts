import { Component, OnInit } from '@angular/core';
import './outlook-demo.js';
import './graph-js-sdk-web.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-abctest',
  templateUrl: './abctest.component.html',
  styleUrls: ['./abctest.component.css']
})
export class AbctestComponent implements OnInit {

  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {    
  }

  public showmehow() {
    //console.log(sessionStorage.getItem('accessToken'));   
    //const auth_token = 'Bearer ' + sessionStorage.getItem('accessToken');
    const auth_token = "Bearer EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAWl%2bxllO4kCg0Vxd5IckAyk4tgYAmNqjvjGGjJuORfGxtCSqltgto0C2KCN3Q4MvoZO1w4Ls7FSoTxRG9nuT7JYvm2RLfpYhBI51H70s/xzjI%2bWJRMBZUwsvIF2STAbYLkb4Mm1EaHjFkspy8lVtmIRKCwBvmn3An07h0ZbferooITtW1ZeYfQubl7mo8ayjKns%2bi3%2b/p7RQuboZFnX/zT/ZK6MORa8xpHK0GUe03ysdn/xclGt4cE5ffF1d0d1f/C/v/a2N87YYGNqzDt0PJ7oWgeQr5/w4SbIFAKVqd7opUEkdl0BQUwwGIa5QjZPm11ObTnyMaBrhhFsL2ziJAW0DZgAACP7TD20ap6jPQAK6leJczUW8PrhUQuyPiCVIvdO1jz6lczWl91sMtiNWjhtfQ27VwxjwYBGH%2blmzeHdC/6NuGPGfihajlr6n2CLb9NLwJLDCC7wkD6yvcDvx9KVAJHVtxMRzjIHE5I8Z%2bQkiX88pdKynOzpCPEGC6SifdyK7WJFE4cSzMF9YflcXysGyLlSYTYsZxA31eChyzWPPWzu7fOJZhhwHxWMg09bnxJBXWMSVjTZTwTJxRF9icku%2bMU2iGVjYkK65cDx85BW%2bo8lNDq4JpiBKOfX1APeKLkk/6%2bmTV/vHZ%2bqxnpEDj9uKH2aIhXHkZ%2byxX3qjfExzLrLxDmOGbu6j6T0EyqvmOpfFICXyet0IBq13T83L1Q3mVFRi6P8cMCcP6dspl3hW1LcjaW0Iwrviv7ki16Z4mSWXWhnp9HdzC4v9YbZjI2k8Gg/BLdANn%2bEVT/2gZu64jn2Rqp55EH40UozpZAzvlFULwaL%2bNZvOYqr2swa0N6ayG2F3MRjms/zVQ7Ib2vPrWP7XX4GzWUC0tnl3OEiJzCXhm%2bCxCGPtP5Xfl5HnRrQbIhjpTHINAkGgb5OCyeqUk2hGg2iUS505zLxAL5154LfUvQ0U%2b%2bp61/a%2bnYXe%2bIzGdly0thMzuOOikAVKpnmrTY8sxql6LF%2b1Bwoa4bM7vSVz0ZntW%2bbwpZkl/vW/lYQ5Ew%2bVSUV1MkDOD0J1CLnUQwzKlPIsqagT4RGWk3r8jJuT%2bW1raMX%2bX2jvy8n%2bs0ONeGoDNu58VfBFMUvbSS%2bCAg%3d%3d";
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
      var items = JSON.stringify(res);   
      
      for(let entry of items) {
          console.log(entry + "\n\n");
      }

    },
    (err)=> {
      console.log("Eror:" + err);
    });
  }

}
