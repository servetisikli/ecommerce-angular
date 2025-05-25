// filepath: c:\Users\fsi\Desktop\angular\ecommerce-angular\src\app\components\product-card\product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  // Add hover state
  isHovered: boolean = false;
  imageError: boolean = false;

  constructor(private productService: ProductService) {}

  onAddToCart(event: Event): void {
    event.preventDefault(); // Prevent navigation when clicking the button
    event.stopPropagation(); // Stop event from bubbling up
    this.addToCart.emit(this.product);
  }

  // Truncate long descriptions
  truncateDescription(text: string, maxLength: number = 75): string {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  // Handle image error
  onImageError(): void {
    this.imageError = true;
  }

  // Get product image with fallback
  getProductImage(): string {
    if (
      this.imageError ||
      !this.product.imageUrl ||
      this.product.imageUrl.includes('placeholder.com')
    ) {
      return this.productService.getFallbackImage(this.product);
    }
    return this.product.imageUrl;
  }
}
