/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for creating and editing a product ad.
*/
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
    pageTitle: string = 'Create';
    editing: boolean = false;
    submitted: boolean = false;
    public product: Product = new Product();
    public expDateValue: string;
    public currentDate : Date = new Date();

    constructor(private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {

        //decide if the page is for edit or create
        this.editing = activeRoute.snapshot.params["mode"] == "edit";

        //Edit
        if (this.editing) {
            Object.assign(this.product,
                repository.getProduct(activeRoute.snapshot.params["id"]));
                // console.log(new Date(Date.parse(this.product.expiryDate.toString()) - this.currentDate.getTimezoneOffset()*60000).toISOString().slice(0, 16));
                this.expDateValue = new Date(Date.parse(this.product.expiryDate.toString()) - this.currentDate.getTimezoneOffset()*60000).toISOString().slice(0, 16);
        }
        // Delete
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteProduct(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";

    }

    private deleteProduct(id: string) {
        this.repository.deleteProduct(id);
        this.router.navigateByUrl("/");
    }

    //Saving (created or adited ad)
    submitProduct(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.product.expiryDate = new Date(this.expDateValue);
            this.repository.saveProduct(this.product);
            this.router.navigateByUrl("/store");
        }
    }
}