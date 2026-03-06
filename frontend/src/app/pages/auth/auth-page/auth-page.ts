import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { ResetPassword } from '../reset-password/reset-password';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, Login, Register, ForgotPassword, ResetPassword],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css']
})
export class AuthPage {
  mode: 'login' | 'register' | 'forgot' | 'reset' = 'login';

  switchMode(newMode: 'login' | 'register' | 'forgot' | 'reset') {
    this.mode = newMode;
  }
}