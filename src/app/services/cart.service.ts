import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root', // Makes this service globally accessible (similar to React context)
})
export class CartService {
  // Behaves like useState in React
  private cartItems: CartItem[] = [];

  // BehaviorSubject works like tracking state changes in React
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Loading cart from localStorage (like you might do in a React application)
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Components can subscribe to this like useSelector hook in React
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Updates state like dispatch function in React
  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    // Update state and save to localStorage
    this.cartSubject.next([...this.cartItems]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartSubject.next([...this.cartItems]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
