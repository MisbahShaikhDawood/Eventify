import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // <-- import AuthService

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css']
})
export class EventDetails {

  eventId: string | null = '';
  selectedSeats: number = 1;
  totalPrice: number = 0;

  selectedEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService // <-- inject AuthService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  events = [
    { id: 1, title: 'Arijit Singh Live Concert', image: 'images/arijit1.jpg', date: '25 March 2026', time: '7:00 PM', location: 'Mumbai Stadium', price: 2000 },
    { id: 2, title: 'Comedy - Munnawar Farouqi', image: 'images/munnawar1.jpg', date: '20 March 2026', time: '8:00 PM', location: 'Nehru Auditorium', price: 999 },
    { id: 3, title: 'Holi Party', image: 'images/holievent.jpg', date: '03 March 2026', time: '8:00 AM', location: 'The Acres Club - Chembur', price: 499 },
    { id: 4, title: 'Harry Potter - Exhibition', image: 'images/exhibitionharrypotter.jpg', date: '15 March 2026', time: '11:00 AM - 8:00 PM', location: 'NMACC - BKC Mumbai', price: 1200 }
  ];

  ngOnInit() {
    const id = Number(this.eventId);
    this.selectedEvent = this.events.find(e => e.id === id);
    this.updateTotal();
  }

  updateTotal() {
    if (this.selectedEvent) {
      this.totalPrice = this.selectedSeats * this.selectedEvent.price;
    }
  }

  increaseSeat() {
    this.selectedSeats++;
    this.updateTotal();
  }

  decreaseSeat() {
    if (this.selectedSeats > 1) {
      this.selectedSeats--;
      this.updateTotal();
    }
  }

  proceedToPayment() {
  if (!this.auth.isAuthenticated()) {
    // Save event info before login
    this.auth.savePendingEvent({
      id: this.selectedEvent.id,
      seats: this.selectedSeats,
      totalPrice: this.totalPrice,
      title: this.selectedEvent.title
    });
    this.router.navigate(['/login']);
    return;
  }

  // Navigate to payment if already logged in
  this.router.navigate(['/payment'], {
    queryParams: {
      title: this.selectedEvent.title,
      totalPrice: this.totalPrice,
      seats: this.selectedSeats
    }
  });
  }
}