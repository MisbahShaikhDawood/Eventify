import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  email: string = '';
  otpSent: boolean = false;
  enteredOtp: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  sendOtp() {
    this.http.post('http://localhost:3000/send-otp', { email: this.email })
      .subscribe({
        next: () => {
          this.otpSent = true;
          this.errorMessage = '';
        },
        error: (err) => {
          console.log('Error sending OTP:', err);
          this.errorMessage = 'Error sending OTP';
        }
      });
  }

  verifyOtp() {
    this.http.post<any>('http://localhost:3000/verify-otp', {
      email: this.email,
      otp: this.enteredOtp
    }).subscribe((res: any) => {
      if (res.valid) {
        this.successMessage = 'OTP verified! You can change your password now.';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Invalid OTP. Try again.';
        this.successMessage = '';
      }
    });
  }

  changePassword() {
    if (!this.newPassword || this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }
    this.auth.updatePassword(this.email, this.newPassword);
    this.successMessage = 'Password changed successfully! Go to login.';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}