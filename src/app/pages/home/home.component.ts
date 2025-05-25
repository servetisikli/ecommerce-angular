import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        // Get a random selection of products to feature (up to 8)
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        this.featuredProducts = shuffled.slice(0, 8);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured products:', err);
        this.error =
          'Unable to load featured products. Please try again later.';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
