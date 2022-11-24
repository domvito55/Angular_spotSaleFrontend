import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, 
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { AuthService } from "../model/auth.service";
import { RestDataSource } from "../model/rest.datasource";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";



@Injectable()
export class AuthGuard {

    constructor(private router: Router,
        private auth: AuthService,
        private dataSource: RestDataSource,
        private repository: ProductRepository) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean 
    {
        if (!this.auth.authenticated) {
            this.auth.redirectUrl = state.url;
            this.router.navigateByUrl("/users/signin");
            return false;
        }
        // if(route.params["mode"] == "edit"){
        //     if(this.dataSource.user_id != this.repository.getProduct(route.params["id"]).owner){
        //         console.log("Mane");
        //     }else{
        //         console.log("Ramiro");
        //     }
        // }
        return true;
    }
}