import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  register() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // ✅ Store user in "users" object
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[this.email]) {
      this.errorMessage = 'Email already registered';
      return;
    }

    users[this.email] = {
      name: this.name,
      password: this.password
    };

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration Successful! Please login.');
    this.router.navigate(['/login']); // redirect to login
  }
}