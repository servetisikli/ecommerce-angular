import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  // Add hover state
  isHovered: boolean = false;

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
}
