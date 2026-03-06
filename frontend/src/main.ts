import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { register } from 'swiper/element/bundle';
register();


import { Home } from './app/pages/home/home';
import { About } from './app/pages/about/about';
import { Gallery } from './app/pages/gallery/gallery';
import { Offers } from './app/pages/offers/offers';
import { Contact } from './app/pages/contact/contact'; 

bootstrapApplication(App, {
  providers: [
    provideRouter([
      ...routes,
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'gallery', component: Gallery },
      { path: 'offers', component: Offers },
      { path: 'contact', component: Contact },
    ])
  ]
})

