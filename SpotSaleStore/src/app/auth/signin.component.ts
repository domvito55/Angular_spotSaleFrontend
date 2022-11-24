/**
  Title:       SpotSale
  IDs:         301208156, 301236904, 301251832, 301313468, 301268678
  Description: logic for landing page.
*/
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";
import { RestDataSource } from "../model/rest.datasource";


@Component({
    templateUrl: "signin.component.html"
})

export class SignInComponent {
    public pageTitle: string = "Sign-in";
    public username: string;
    public password: string;
    public message: string;

    constructor(private router: Router,
        private auth: AuthService,
        private dataSource: RestDataSource) { }

    authenticate(form: NgForm) {
        if (form.valid) {
            // perform authentication
            this.auth.authenticate(this.username, this.password)
                .subscribe(response => {
                    if (response.success) {
                        this.router.navigateByUrl(this.auth.redirectUrl || "");
                    }
                    this.message = response.message;
                });
        } else {
            this.message = "Form Data Invalid";
        }
    }
}