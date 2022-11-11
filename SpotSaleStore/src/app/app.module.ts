import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { ProductDetailComponent } from "./store/productDetail.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, StoreModule, RouterModule.forRoot([
    { path: "store", component: StoreComponent },
    { path: "product/:mode/:id", component: ProductDetailComponent },
    { path: "product/:mode", component: ProductDetailComponent },
    { path: "product", component: ProductDetailComponent },
   { path: "**", redirectTo: "/store" }
])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
