import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class Payment {

  eventTitle: string = '';
  totalPrice: number = 0;
  selectedSeats: number = 1;

  paymentMethod: 'card' | 'upi' | 'netbanking' = 'card';

  // Payment fields
  name: string = '';
  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';
  upiId: string = '';
  bankName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventTitle = params['title'] || '';
      this.totalPrice = +params['totalPrice'] || 0;
      this.selectedSeats = +params['seats'] || 1;
    });
  }

  payWithRazorpay() {

    // Validation
    if (this.paymentMethod === 'card') {
      if (!this.cardNumber || !this.expiry || !this.cvv) {
        alert('Please fill all card details!');
        return;
      }
    }

    if (this.paymentMethod === 'upi') {
      if (!this.upiId) {
        alert('Please enter UPI ID');
        return;
      }
    }

    if (this.paymentMethod === 'netbanking') {
      if (!this.bankName) {
        alert('Please select a bank');
        return;
      }
    }

    // Simulate payment delay
    setTimeout(() => {

      // Save Ticket
      this.ticketService.saveTicket({
        title: this.eventTitle,
        seats: this.selectedSeats,
        totalPrice: this.totalPrice
      });

      alert('🎉 Payment Successful! Your E-Ticket is available.');

      this.router.navigate(['/home']);

    }, 1000);
  }
}