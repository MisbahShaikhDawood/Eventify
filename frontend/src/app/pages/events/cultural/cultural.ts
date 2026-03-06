import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cultural',
  templateUrl: './cultural.html',
  styleUrls: ['./cultural.css']
})
export class Cultural implements OnInit {
  searchParams: any = {};
  events: any[] = [
    { name: 'Diwali Festival', city: 'Mumbai', date: '1 Nov 2026', image: 'images/diwali.jpg' },
    { name: 'Holi Celebration', city: 'Pune', date: '18 Mar 2026', image: 'images/holi.jpg' },
  ];
  filteredEvents: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.filterEvents();
    });
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesName = this.searchParams.name 
        ? event.name.toLowerCase().includes(this.searchParams.name.toLowerCase()) 
        : true;
      const matchesCity = this.searchParams.city 
        ? event.city.toLowerCase() === this.searchParams.city.toLowerCase() 
        : true;
      return matchesName && matchesCity;
    });
  }
}