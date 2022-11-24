import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../model/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() pageTitle?: string;
  @Input() editing?: boolean;
  @Input() signupmode?: boolean;

  constructor(public auth: AuthService, private router: Router) {
    if(this.pageTitle == 'Edit'){
      this.editing = true;
    }
  }

  logout() {
    if (confirm('Are you sure?')) {
      this.auth.clear();
      this.router.navigateByUrl("/");
    }
  }
}
