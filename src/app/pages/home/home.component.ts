import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductCardComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Örnek olarak sadece ilk 4 ürünü gösteriyoruz, farklı bir filtre de uygulayabilirsiniz
        this.featuredProducts = products.slice(0, 4);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ürünler yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error('Ürün yükleme hatası:', err);
      },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} sepete eklendi!`);
  }
}
