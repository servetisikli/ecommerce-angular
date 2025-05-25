import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = true;
  error: string = '';

  // Filter options
  searchQuery: string = '';
  selectedCategory: string = '';
  sortOption: string = 'default';

  // Track available categories
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get query params from URL
    this.route.queryParams.subscribe((params) => {
      // Handle search query from navbar
      if (params['search']) {
        this.searchQuery = params['search'];
      }

      // Handle category filter
      if (params['category']) {
        this.selectedCategory = params['category'];
      }

      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.extractCategories();
        // Apply filters from query params
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Product loading error:', err);
      },
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(
      this.products.map((product) => product.category)
    );
    this.categories = Array.from(uniqueCategories);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    // You could integrate a toast notification library here
    console.log(`${product.name} added to cart!`);
  }

  // Filter methods
  applyFilters(): void {
    let result = [...this.products];

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      result = result.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Apply sorting
    switch (this.sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (could be by popularity or featured products)
        break;
    }

    this.filteredProducts = result;
  }

  // Event handlers for filters
  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortOption = 'default';
    this.filteredProducts = [...this.products];
  }

  get productCount(): number {
    return this.filteredProducts.length;
  }

  get hasFiltersApplied(): boolean {
    return !!(
      this.searchQuery ||
      this.selectedCategory ||
      this.sortOption !== 'default'
    );
  }
}
