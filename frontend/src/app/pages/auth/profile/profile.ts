import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any = null;
  email: string = '';

  otpSent = false;
  otpVerified = false;
  generatedOtp = '';
  enteredOtp = '';
  newPassword = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // 🔐 Check if logged in
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Get current logged-in user
    const currentUserStr = localStorage.getItem('currentUser');

    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      const email = currentUser.email;

      const users = JSON.parse(localStorage.getItem('users') || '{}');

      if (users[email]) {
        this.user = {
          email: email,
          name: users[email].name
        };

        this.email = email;
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  // ================================
  // OTP SECTION
  // ================================

  sendOtp() {
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpSent = true;
    this.otpVerified = false;
    this.message = `OTP Sent to ${this.email} (Demo OTP: ${this.generatedOtp})`;
  }

  verifyOtp() {
    if (this.enteredOtp === this.generatedOtp) {
      this.otpVerified = true;
      this.message = '✅ OTP Verified Successfully!';
    } else {
      this.message = '❌ Invalid OTP!';
    }
  }

  changePassword() {
    if (!this.newPassword) {
      this.message = 'Please enter new password';
      return;
    }

    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) return;

    const currentUser = JSON.parse(currentUserStr);
    const email = currentUser.email;

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[email]) {
      users[email].password = this.newPassword.trim();
      localStorage.setItem('users', JSON.stringify(users));

      this.message = "✅ Password changed successfully!";

      // Reset fields
      this.newPassword = '';
      this.enteredOtp = '';
      this.otpVerified = false;
      this.otpSent = false;
    }
  }

  // ================================
  // LOGOUT
  // ================================

  logout() {
  this.auth.logout();
  alert("Logged out successfully!");
  this.router.navigate(['/']);
  }
}