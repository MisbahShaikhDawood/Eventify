// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {

//   const auth = inject(AuthService);
//   const router = inject(Router);

//   console.log('Guard checking login...');
//   console.log('isAuthenticated:', auth.isAuthenticated());

//   if (auth.isAuthenticated()) {
//     console.log('Access allowed');
//     return true;
//   }

//   console.log('Redirecting to login');
//   router.navigate(['/login']);
//   return false;
// };



import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};