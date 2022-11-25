/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for landing page.
*/
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { RestDataSource } from "../model/rest.datasource";




@Component({
    selector: "store",
    templateUrl: "store.component.html"
})

export class StoreComponent {

    title: string = 'Landing Page';

    public selectedCategory: any = null;
    public productsPerPage = 6;
    public selectedPage = 1;
    public productsQuantity: number;


    constructor(private repository: ProductRepository,
        private router: Router,
        private dataSource: RestDataSource) { 
            repository.setProduct();
        }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        this.productsQuantity = this.repository.getProducts().length;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }
    get categories(): string[] {
        return this.repository.getCategories();
    }
    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }
    belongsToThisSessionUser(product: Product): boolean {
        return (product.owner == this.dataSource.user_id);
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

    // //Alternative way to add product
    // addProduct() {
    //     this.router.navigateByUrl("/product");
    // }

    // deleteProduct(id: string) {
    //     if(confirm("Are you sure do you want to delete?")) {
    //         this.repository.deleteProduct(id);
    //     }
    // }

    // alternative implementation for pagination
    // get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository
    //         .getProducts(this.selectedCategory).length / this.productsPerPage))
    //             .fill(0).map((x, i) => i + 1);
    // }
}
