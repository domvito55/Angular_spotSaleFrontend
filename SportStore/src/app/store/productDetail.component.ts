import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";
@Component({
    templateUrl: "productDetail.component.html",
    styleUrls: ["productDetail.component.css"]
})
export class ProductDetailComponent {
    productSent: boolean = false;
    submitted: boolean = false;
    public product: Product  = new Product();

    constructor(public repository: ProductRepository) {}
    submitProduct(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.repository.saveProduct(this.product).subscribe(product => {
                this.product.clear();
                this.productSent = true;
                this.submitted = false;
            });
        }
    }
}