import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";

@Component({
    templateUrl: "productDetail.component.html",
    styleUrls: ["productDetail.component.css"]
})

export class ProductDetailComponent {
    editing: boolean = false;
    productSent: boolean = false;
    submitted: boolean = false;
    public product: Product  = new Product();

    constructor(private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {
            this.editing = activeRoute.snapshot.params["mode"] == "edit";
            if (this.editing) {
                Object.assign(this.product,
                    repository.getProduct(activeRoute.snapshot.params["id"]));
                console.log("Vai vai vai vai: " + activeRoute.snapshot.params["id"]);
            }
    }
    save(form: NgForm) {
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl("/admin/main/products");
    }

    submitProduct(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.repository.saveProduct(this.product);
            this.router.navigateByUrl("/store");
        }
    }
}