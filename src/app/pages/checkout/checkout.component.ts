import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  checkoutForm!: FormGroup;
  step = 1;
  loading = false;
  orderCompleted = false;
  orderNumber = '';

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get cart items
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;

      // Redirect to cart if cart is empty
      if (items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });

    // Initialize checkout form
    this.initForm();
  }

  // Initialize checkout form with validations
  initForm(): void {
    this.checkoutForm = this.fb.group({
      // Shipping Information
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],

      // Payment Information
      cardName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  // Go to next step
  nextStep(): void {
    // For step 1, validate shipping info
    if (this.step === 1) {
      const shippingControls = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zipCode',
      ];
      if (this.validateFormSection(shippingControls)) {
        this.step++;
      }
    }
    // For step 2, validate payment info
    else if (this.step === 2) {
      const paymentControls = [
        'cardName',
        'cardNumber',
        'expMonth',
        'expYear',
        'cvv',
      ];
      if (this.validateFormSection(paymentControls)) {
        this.step++;
      }
    }
  }

  // Go back a step
  previousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  // Validate form section by marking controls as touched
  validateFormSection(controlNames: string[]): boolean {
    let valid = true;

    // Mark all fields as touched to trigger validation
    controlNames.forEach((controlName) => {
      const control = this.checkoutForm.get(controlName);
      if (control) {
        control.markAsTouched();
        if (control.invalid) {
          valid = false;
        }
      }
    });

    return valid;
  }

  // Calculate subtotal
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  // Calculate tax (8%)
  calculateTax(): number {
    return this.calculateSubtotal() * 0.08;
  }

  // Calculate total
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  // Place order
  placeOrder(): void {
    // Prevent multiple submissions
    if (this.loading) return;

    this.loading = true;

    // Simulate API call to place order
    setTimeout(() => {
      // Generate a random order number
      this.orderNumber =
        'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      // Clear cart
      this.cartService.clearCart();

      // Show order completed screen
      this.orderCompleted = true;
      this.loading = false;
    }, 2000);
  }
}
