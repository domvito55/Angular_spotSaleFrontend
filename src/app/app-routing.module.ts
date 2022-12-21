/** File to manage the routing
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for creating and editing a product ad.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from "./store/store.component";
import { ProductDetailComponent } from "./store/productDetail.component";
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { AdvComponent } from "./store/adv.component";

import { AuthGuard } from "./auth/auth.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: "", component: StoreComponent },
    { path: "store", component: StoreComponent },
    { path: "product/:mode/:id", component: ProductDetailComponent, canActivate: [AuthGuard]},
    { path: "product/:mode", component: ProductDetailComponent, canActivate: [AuthGuard]},
    { path: "advertisement/:id", component: AdvComponent},
    { path: "users/signin", component: SignInComponent },
    { path: "users/signup", component: SignUpComponent },
    { path: "**", redirectTo: "" }
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
