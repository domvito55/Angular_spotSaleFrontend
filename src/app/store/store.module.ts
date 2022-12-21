/*
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: Store Module
*/

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { StoreComponent } from "./store.component";
import { CounterDirective } from "./counter.directive";
import { ProductDetailComponent } from "./productDetail.component";
import { AdvComponent } from "./adv.component";
import { RouterModule } from "@angular/router";
import { PartialsModule } from '../partials/partials.module';


@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule, PartialsModule],
    declarations: [StoreComponent, CounterDirective, ProductDetailComponent, AdvComponent],
    exports: [StoreComponent, ProductDetailComponent, AdvComponent]
})
export class StoreModule { }