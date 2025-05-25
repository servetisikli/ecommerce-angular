import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isUserMenuOpen = false;
  isMobileMenuOpen = false;
  scrolled = false;
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart changes to update badge count
    this.cartService.getCart().subscribe((items) => {
      this.cartItemCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add shadow when page is scrolled
    this.scrolled = window.scrollY > 10;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    // Close mobile menu when user menu is opened
    if (this.isUserMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Close user menu when mobile menu is opened
    if (this.isMobileMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  // Close menus when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if click is outside user menu button and menu
    if (!target.closest('.user-menu') && this.isUserMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }
}
