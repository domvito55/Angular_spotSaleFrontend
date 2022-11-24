import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Product } from "./product.model";
import { ResponseModel } from "./response.model";
import { User } from "./user.model";



const PROTOCOL = "https";
const PORT = 3000;


@Injectable()
export class RestDataSource {

  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {

  //  this.baseUrl = "https://groupproject-comp229-2022.herokuapp.com/advertisement/";
  this.baseUrl = `${PROTOCOL}://orca-app-yod9h.ondigitalocean.app`;
  //    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
       return this.http.get<Product[]>(this.baseUrl + "/advertisement");
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + "/advertisement/add",
      product,
      this.provideToken()
    ).pipe(map(response => {
      return response;
    }),
      catchError(error => {
        console.log(error.error);
        return of(error.error);
      }));
  }

  // saveProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.baseUrl + "add", product);
  // }

  updateProduct(product: Product): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.baseUrl}advertisement/edit/${product._id}`,
      product,
      this.provideToken()
    ).pipe(map(response => {
      return response;
    }),
      catchError(error => { return of(error.error) }));
  }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(this.baseUrl + "edit/" + product._id, product);
  // }

  deleteProduct(id: string): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(
      `${this.baseUrl}advertisement/delete/${id}`,
      this.provideToken()
      ).pipe(map(response => {
      return response;
  }),
  catchError(error => {return of(error.error)}));
}

  // deleteProduct(id: string): Observable<Product> {
  //   return this.http.delete<Product>(this.baseUrl + "delete/" + id);
  // }

  // User endpoint of the API
  authenticate(user: string, pass: string): Observable<ResponseModel> {
    return this.http.post<any>(this.baseUrl + "/users/signin",
      {
        username: user,
        password: pass
      }).pipe(
        map(response => {
          // console.log(response);
          this.auth_token = response.success ? response.token : null;
          return response;
        }),
        catchError(error => { return of(error.error) })
      );
  }

  signupUser(user: User): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.baseUrl + "/users/signup", user)
      .pipe(map(response => {
        return response;
      }),
        catchError(error => { return of(error.error) }));
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
