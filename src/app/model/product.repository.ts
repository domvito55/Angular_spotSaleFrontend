import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";


@Injectable()
export class ProductRepository {
    //properties
    private products: Product[] = [];
    private categories: string[] = [];
    private currentDate: Date = new Date();
    private currentDateInt : number = Date.parse(this.currentDate.toString())
    private expDateInt: number;
    listReady: boolean = false;

    //constructor
    constructor(private dataSource: RestDataSource) {
        this.setProduct();
    }

    belongsToThisSessionUser(product: Product): boolean {
        return (product.owner == this.dataSource.user_id);

    }

    //Methods
    //_CRUD
    //__Read methods
    getProducts(category: string = null): Product[] {

        for(let i = 0; i< this.products.length; i++){
            if(this.products[i].expiryDate){
                this.expDateInt = Date.parse(this.products[i].expiryDate.toString());
                if(this.expDateInt < this.currentDateInt){
                    this.products[i].enable = false;
                }
            }
            
        }

        return this.products
            .filter(p => category == null || category == p.category)
            .sort((a, b) =>{return (a.title > b.title)? 1 : -1;});
    }
    getProduct(id: string): Product {
        return this.products.find(p => p._id == id);
    }

    setProduct(){
        let aux: Product[] = [];
        this.listReady = false;
        this.dataSource.getProducts().subscribe(data => {
            for(let i = 0; i < data.length; i++ ){
                if(!data[i].enable && !this.belongsToThisSessionUser(data[i])){
                    continue;
                }
                aux.push(data[i]);
            }
            this.products = aux;
            this.categories = this.products.map(p => p.category)
                .filter((c, index, array) => array.indexOf(c) == index).sort();

            this.listReady = true;
        });
    }

    getCategories(): string[] {
        return this.categories;
    }
    //__Create and update method
    async saveProduct(product: Product) {
        //Create
        if (product._id == null || product._id == "") {
            this.dataSource.saveProduct(product)
                .subscribe(response => this.products.push(response));
                if(!this.categories.includes(product.category)){
                    this.categories.push(product.category);
                }
        //Update
        } else {
            this.dataSource.updateProduct(product)
                .subscribe(response => {
                    this.products.splice(this.products.
                        findIndex(response => response._id == product._id), 1, product);
                });
        }
    }

    //__Question & Answer
    async sendQuestion(product: Product) {
        this.products.splice(this.products.findIndex((element)=>{element._id == product._id}), 1, product);
        // console.log("Res: " + product.questionAnswer[0].question);
        this.dataSource.sendQuestion(product._id, product.questionAnswer[0].question)
            .subscribe(response => {
                console.log("repo message: " + response.message);
                console.log("repo success: " + response.message);
            });
    }
    async sendAnswer(product: Product, questionId: string, answerText: string) {
        this.products.splice(this.products.findIndex((element)=>{element._id == product._id}), 1, product);
        // console.log("Res: " + product.questionAnswer[0].question);
        this.dataSource.sendAnswer(product._id, questionId, answerText)
            .subscribe(response => {
                console.log("repo message: " + response.message);
                console.log("repo success: " + response.message);
            });
    }
    //Delete
    deleteProduct(id: string) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.
                findIndex(p => p._id == id), 1);
            this.categories = this.products.map(p => p.category)
                .filter((c, index, array) => array.indexOf(c) == index).sort();
        })
    }
    
}