import { Component } from '@angular/core';
import {smoothlyMenu} from "../../app.helpers";

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.component.html'
})
export class Topnavbar {
    date:String;
    ngOnInit() {
        var abc:Date = new Date();
        var num = abc.getDate();        
        this.date = "" + num;
    }
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }
    logout() {
        localStorage.clear();
        // location.href='http://to_login_page';
    }
}