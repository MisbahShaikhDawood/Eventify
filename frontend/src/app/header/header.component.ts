import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public auth: AuthService, private router: Router, private ticketService: TicketService) {}

  hasETicket: boolean = false;
  showDropdown = false;
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);

    setTimeout(() => {
      this.auth.clearMessage();
    }, 3000);
  }

  closePopup() {
    this.auth.clearMessage();
  }


  ngOnInit() {
  // Check if user has tickets
  this.hasETicket = this.ticketService.hasTickets();
    }

}