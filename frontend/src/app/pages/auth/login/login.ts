import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {

  email: string = '';
  password: string = '';
  showPassword = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(form: any) {
  const email = form.value.email.trim().toLowerCase();
  const password = form.value.password.trim();

  if (this.auth.login(email, password)) {

    alert("✅ Login Successful!");

    const redirectUrl = this.auth.getRedirectUrl();

    if (redirectUrl) {
      this.auth.clearRedirectUrl();
      this.router.navigateByUrl(redirectUrl);
    } else {
      this.router.navigate(['/']);
    }

  } else {
    this.errorMessage = 'Invalid email or password';
  }
}

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}