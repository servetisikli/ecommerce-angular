import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Get cart items from service
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Calculate subtotal
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  // Increase item quantity
  increaseQuantity(item: CartItem): void {
    if (item.product?.id) {
      this.cartService.updateQuantity(item.product.id, item.quantity + 1);
    }
  }

  // Decrease item quantity
  decreaseQuantity(item: CartItem): void {
    if (item.product?.id && item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    }
  }

  // Remove item from cart
  removeFromCart(productId?: string): void {
    if (productId) {
      this.cartService.removeFromCart(productId);
    }
  }

  // Clear the entire cart
  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }
}
