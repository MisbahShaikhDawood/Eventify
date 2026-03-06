import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {

  newPassword = '';
  confirmPassword = '';

  updatePassword() {

    if (!this.newPassword || !this.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password Updated Successfully 🔐");
  }

}