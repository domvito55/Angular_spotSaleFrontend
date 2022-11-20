import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, RestDataSource]
})
export class ModelModule { }