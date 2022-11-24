import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { ProductRepository } from "./product.repository";
import { RestDataSource } from "./rest.datasource";
import { AuthService } from "./auth.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ProductRepository,
        AuthService,
        RestDataSource
    ]
})

export class ModelModule { }