import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null; // store logged-in user
  private redirectUrl: string = '';
  private message: string = '';

  // ================================
  // REGISTER
  // ================================
  register(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    const emailLower = email.trim().toLowerCase();
    
    if (users[email]) return false;

    users[emailLower] = { email: emailLower, password: password.trim() };
    localStorage.setItem('users', JSON.stringify(users));

  return true;
  }

  // ================================
  // LOGIN
  // ================================
  login(email: string, password: string): boolean {
  const emailTrimmed = email.trim();
  const passwordTrimmed = password.trim();

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  const user = users[emailTrimmed];

  if (user && user.password === passwordTrimmed) {
    localStorage.setItem('currentUser', JSON.stringify({ email: emailTrimmed }));
    localStorage.setItem('isLoggedIn', 'true');   // ✅ ADD THIS LINE
    return true;
  }

  return false;
  }
  // ================================
  // GET USERNAME (for header)
  // ================================
  getUsername(): string {
  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return '';

  const currentUser = JSON.parse(currentUserStr);
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  return users[currentUser.email]?.name || '';
  }

  // ================================
  // AUTH CHECK
  // ================================
  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // ================================
  // LOGOUT
  // ================================
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    

    this.setMessage('⚠️ Logged out successfully');
  }

  /**
   * Get pending event saved before login
   */
  getPendingEvent(): any {
    const pending = sessionStorage.getItem('pendingEvent');
    return pending ? JSON.parse(pending) : null;
  }

  /**
   * Save pending event before login
   * @param eventData Event data
   */
  savePendingEvent(eventData: any) {
    sessionStorage.setItem('pendingEvent', JSON.stringify(eventData));
  }

  /**
   * Clear pending event after processing
   */
  clearPendingEvent() {
    sessionStorage.removeItem('pendingEvent');
  }

  // ================================
  // REDIRECT HELPERS
  // ================================
  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = '';
  }

  // ================================
  // MESSAGE SYSTEM (POPUP)
  // ================================
  setMessage(msg: string) {
    this.message = msg;
  }

  getMessage(): string {
    return this.message;
  }

  clearMessage() {
    this.message = '';
  }

  // ================================
  // FORGOT PASSWORD
  // ================================
  isEmailRegistered(email: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return !!users[email];
  }

  updatePassword(email: string, newPassword: string) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[email]) {
      users[email].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}