import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { Home } from './pages/home/home';
import { Events } from './pages/events/events';
import { Contact } from './pages/contact/contact';

import { Music } from './pages/events/music/music';
import { Comedy } from './pages/events/comedy/comedy';
import { Party } from './pages/events/party/party';
import { Exhibition } from './pages/events/exhibition/exhibition';
import { Workshop } from './pages/events/workshop/workshop';
import { Cultural } from './pages/events/cultural/cultural';
import { Corporate } from './pages/events/corporate/corporate';

import { EventDetails } from './pages/event-details/event-details';

import { Payment } from './pages/payment/payment';
import { MyTickets } from './pages/my-tickets/my-tickets';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'events', component: Events, children: [
    { path: 'music', component: Music },
    { path: 'comedy', component: Comedy },
    { path: 'party', component: Party },
    { path: 'exhibition', component: Exhibition },
    { path: 'workshop', component: Workshop },
    { path: 'cultural', component: Cultural },
    { path: 'corporate', component: Corporate },
  ]
  },

  { path: 'contact', component: Contact },

  { path: 'event/:id', component: EventDetails, canActivate: [authGuard] },
  
  { path: 'payment', component: Payment },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'my-tickets', component: MyTickets },

  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) },
  { path: 'forgot-password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) },

  { path: 'profile', loadComponent: () => import('./pages/auth/profile/profile').then(m => m.Profile), canActivate: [authGuard] },

  { path: 'book', loadComponent: () => import('./pages/services/services').then(m => m.Services), canActivate: [authGuard] },
  { path: 'services', loadComponent: () => import('./pages/services/services').then(m => m.Services), canActivate: [authGuard] },

  { path: 'payment', component: Payment, canActivate: [authGuard] }
];