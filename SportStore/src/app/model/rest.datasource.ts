import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";

const PROTOCOL = "http";
const PORT = 3500;


@Injectable()
export class RestDataSource {
  baseUrl: string;
  constructor(private http: HttpClient) {
  this.baseUrl = "https://groupproject-comp229-2022.herokuapp.com/advertisement/";
//    this.baseUrl = `${PROTOCOL}://orca-app-yod9h.ondigitalocean.app/advertisement/`;
//    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getProducts(): Observable<Product[]> {
//    return this.http.get<Product[]>(this.baseUrl + "products");
    return this.sendRequest<Product[]>("GET", this.baseUrl);
  }
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "add", product);
  }
  updateProduct(product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + "edit/" + product._id, product);
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + "delete/" + id);
  }
  private sendRequest<T>(verb: string, url: string, body?: Product)
           : Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body,
            withCredentials: false
        });
    }
}