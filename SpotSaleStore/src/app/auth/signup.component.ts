import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";
import { User } from "../model/user.model";

@Component({
    templateUrl: "signup.component.html"
})

export class SignUpComponent {
    public pageTitle: string = "Sign-up";
    signupmode:boolean = true;

    public user: User = new User();
    public confirmPassowrd: string;
    public message: string;

    constructor(private router: Router,
        private auth: AuthService) { }

    signup(form: NgForm) {
        if (form.valid) {
            // Checks if the passwords match.
            if(this.user.password == this.confirmPassowrd){
                this.auth.signupUser(this.user)
                    .subscribe(response => {
                        console.log(response);
                        
                        if (response.success) {
                            alert(response.message);
                            this.router.navigateByUrl("/users/signin");
                        }
                        // Error message from the API.
                        this.message = response.message; 
                    });
            } else {
                this.message = "Passwords do not match";    
            }
        } else {
            this.message = "Form Data Invalid";
        }
    }
}