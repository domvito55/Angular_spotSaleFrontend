/** File to manage the routing
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { ProductDetailComponent } from "./store/productDetail.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: "", component: StoreComponent },
    { path: "store", component: StoreComponent },
    { path: "product/:mode/:id", component: ProductDetailComponent },
    { path: "product/:mode", component: ProductDetailComponent },
    { path: "product", component: ProductDetailComponent },
    { path: "**", redirectTo: "" }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
