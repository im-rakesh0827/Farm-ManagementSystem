import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, AuthResponse } from '@shared/services/auth.service'; // ✅ Also import AuthResponse
import { ChangeDetectorRef, NgZone } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  showSettingsDropdown = false;

  // ✅ NEW: Track logged in user
  user: AuthResponse | null = null;

  constructor(private authService: AuthService, private router: Router,   private cdr: ChangeDetectorRef,  private ngZone: NgZone) {}

  ngOnInit(): void {
    // ✅ Subscribe to user state (reactive)
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.showSettingsDropdown = false;
  }

  logout(): void {
  this.authService.logout();

  // Navigate and trigger change detection
  this.ngZone.run(() => {
    this.router.navigate(['/login']).then(() => {
      this.cdr.detectChanges(); // ✅ Triggers UI refresh
    });
  });

  this.closeMenu();
}


  // ✅ Helper to check auth
  isLoggedIn(): boolean {
    return !!this.user;
  }

  // ✅ Helpers to check role
  isAdmin(): boolean {
    return this.user?.role === 'Admin';
  }

  isOperator(): boolean {
    return this.user?.role === 'Operator';
  }

  isManager(): boolean {
    return this.user?.role === 'Manager';
  }

  isUser(): boolean {
    return this.user?.role === 'User';
  }
}
