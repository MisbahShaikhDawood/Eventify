// my-tickets.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-tickets.html',
  styleUrls: ['./my-tickets.css']
})
export class MyTickets {
  tickets: any[] = [];

  constructor(private ticketService: TicketService) {
    this.tickets = this.ticketService.getTickets();
  }

  ngOnInit() {
    // Get tickets from localStorage (or your backend)
    const savedTickets = localStorage.getItem('tickets');
    this.tickets = savedTickets ? JSON.parse(savedTickets) : [];
  }
}