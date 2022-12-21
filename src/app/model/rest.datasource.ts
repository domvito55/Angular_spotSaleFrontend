import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Product } from "./product.model";
import { ResponseModel } from "./response.model";
import { User } from "./user.model";
import { environment } from "src/environments/environment";



const PROTOCOL = "https";
const PORT = 3000;


@Injectable()
export class RestDataSource {

  baseUrl: string;
  auth_token: string;
  user_id: string;

  constructor(private http: HttpClient) {

  this.baseUrl=environment.apiUrl;
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


  updateProduct(product: Product): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.baseUrl}/advertisement/edit/${product._id}`,
      product,
      this.provideToken()
    ).pipe(map(response => {
      console.log("user id: " + this.user_id)
      return response;
    }),
      catchError(error => { return of(error.error) }));
  }

  sendQuestion(id: string, question: string): Observable<ResponseModel> {
    console.log("PUT: " + `${this.baseUrl}/qa/add/${id}`);

    return this.http.put<ResponseModel>(
      `${this.baseUrl}/qa/add/${id}`,
      {
        "question": question
      }
    ).pipe(map(response => {
      console.log("message: " + response)
      return response;
    }),
      catchError(error => { return of(error.error) }));
  }

  sendAnswer(productId: string, questionId: string, answerText: string): Observable<ResponseModel> {
    console.log("PUT: " + `${this.baseUrl}/qa/edit/${productId}/${questionId}`);

    return this.http.put<ResponseModel>(
      `${this.baseUrl}/qa/edit/${productId}/${questionId}`,
      {
        "answer": answerText
      },
      this.provideToken()
    ).pipe(map(response => {
      console.log("message: " + response)
      return response;
    }),
      catchError(error => { return of(error.error) }));
  }


  deleteProduct(id: string): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(
      `${this.baseUrl}/advertisement/delete/${id}`,
      this.provideToken()
      ).pipe(map(response => {
      return response;
  }),
  catchError(error => {return of(error.error)}));
}

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
          this.user_id = response.success ? response.user_id : null;
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