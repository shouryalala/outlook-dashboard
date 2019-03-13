import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AbctestComponent} from "./abctest.component";
import {abctestRoutes} from "./abctest.routes";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(abctestRoutes)
  ],
  declarations: [
      AbctestComponent
  ],
})
export class AbctestModule { }
