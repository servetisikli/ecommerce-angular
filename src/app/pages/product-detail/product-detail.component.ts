import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  loading: boolean = true;
  error: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = 'Ürün ID bulunamadı';
        this.loading = false;
        return;
      }

      this.loadProduct(id);
    });
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (!product) {
          this.error = 'Ürün bulunamadı';
          this.router.navigate(['/products']);
        } else {
          this.product = product;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ürün yüklenirken bir hata oluştu';
        this.loading = false;
        console.error('Ürün detay yükleme hatası:', err);
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      // Ürünü belirli miktar kadar sepete ekle
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      console.log(`${this.quantity} adet ${this.product.name} sepete eklendi!`);
    }
  }
}
