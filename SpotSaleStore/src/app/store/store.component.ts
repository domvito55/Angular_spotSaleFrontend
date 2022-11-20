/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for landing page.
*/
import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

import { Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})

export class StoreComponent {
    public selectedCategory: any = null;
    public productsPerPage = 4;
    public selectedPage = 1;
    constructor(private repository: ProductRepository,
        private router: Router) { }
    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }
    get categories(): string[] {
        return this.repository.getCategories();
    }
    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }
    changePage(newPage: number) {
        this.selectedPage = newPage;
    }
    changePageSize(newSize: string) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }
    get pageCount(): number {
        return Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage)
    }
    //Alternative way to add product
    // addProduct() {
    //     this.router.navigateByUrl("/product");
    // }
    deleteProduct(id: string) {
        this.repository.deleteProduct(id);
    }

    // alternative implementation for pagination
    // get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository
    //         .getProducts(this.selectedCategory).length / this.productsPerPage))
    //             .fill(0).map((x, i) => i + 1);
    // }
}