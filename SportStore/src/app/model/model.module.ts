import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository,
      { provide: StaticDataSource, useClass: RestDataSource }]
})
export class ModelModule { }