import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of  } from "rxjs";
import { Product } from "./product.model";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { ResponseModel } from "./response.model";
import { User } from "./user.model";



const PROTOCOL = "https";
const PORT = 3500;


@Injectable()
export class RestDataSource {
  
  baseUrl: string;
  auth_token: string;


  constructor(private http: HttpClient) {
//  this.baseUrl = "https://groupproject-comp229-2022.herokuapp.com/advertisement/";
    this.baseUrl = `${PROTOCOL}://orca-app-yod9h.ondigitalocean.app/advertisement/`;
//    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getProducts(): Observable<Product[]> {
//    return this.http.get<Product[]>(this.baseUrl + "products");
    return this.sendRequest<Product[]>("GET", this.baseUrl);
  }
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "add", product);
  }
  updateProduct(product: Product): Observable<Product> {
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

     
    // User endpoint of the API
    authenticate(user: string, pass: string): Observable<ResponseModel> {
      return this.http.post<any>(this.baseUrl + "users/signin", 
      {
          username: user, 
          password: pass
      }).pipe(
          map(response => {
              // console.log(response);
              this.auth_token = response.success ? response.token : null;
              return response;
          }),
          catchError(error => {return of(error.error)})
      );
  }

  signupUser(user: User): Observable<ResponseModel> {
      return this.http.post<ResponseModel>(this.baseUrl + "users/signup", user)
          .pipe(map(response => {
              return response;
          }),
          catchError(error => {return of(error.error)}));
  }

  // Previously called getOptions()
  private provideToken() {
      return {
          headers: new HttpHeaders(
              {
                  "Authorization": `Bearer ${this.auth_token}`
              }
          )
      }
  }
}
