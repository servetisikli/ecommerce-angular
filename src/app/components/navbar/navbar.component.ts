import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isUserMenuOpen = false;
  isMobileMenuOpen = false;
  scrolled = false;
  cartItemCount = 0;
  searchQuery = '';

  constructor(private cartService: CartService, private router: Router) {}

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

  // Handle search submission
  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      this.router.navigate(['/products'], {
        queryParams: {
          search: this.searchQuery.trim(),
        },
      });
      // Clear the search input after searching
      this.searchQuery = '';
      // Close mobile menu if open
      this.isMobileMenuOpen = false;
    }
  }
}
