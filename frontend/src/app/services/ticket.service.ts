// ticket.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsKey = 'tickets';

  saveTicket(ticket: any) {
    const tickets = this.getTickets();
    tickets.push(ticket);
    localStorage.setItem(this.ticketsKey, JSON.stringify(tickets));
  }

  getTickets(): any[] {
    const tickets = localStorage.getItem(this.ticketsKey);
    return tickets ? JSON.parse(tickets) : [];
  }

  clearTickets() {
    localStorage.removeItem(this.ticketsKey);
  }

  hasTickets(): boolean {
    return this.getTickets().length > 0;
  }
}