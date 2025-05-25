import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Smartphone X Pro',
      description:
        'Latest technology smartphone with high performance and amazing camera features.',
      price: 1299.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Smartphone+X',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '2',
      name: 'Laptop Pro Max',
      description:
        'Powerful laptop for professionals with fast processor and wide display.',
      price: 2249.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+Pro',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation feature.',
      price: 249.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Headphones',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '4',
      name: 'Smart Watch Elite',
      description: 'Stylish smartwatch for fitness tracking and notifications.',
      price: 329.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Smart+Watch',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '5',
      name: '4K Ultra HD Smart TV',
      description:
        '55-inch smart TV with stunning picture quality and smart features.',
      price: 899.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Smart+TV',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '6',
      name: 'Wireless Gaming Mouse',
      description:
        'High precision gaming mouse with RGB lighting and programmable buttons.',
      price: 89.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Gaming+Mouse',
      category: 'accessories',
      inStock: false,
    },
    {
      id: '7',
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof bluetooth speaker with 20 hours battery life.',
      price: 129.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Bluetooth+Speaker',
      category: 'audio',
      inStock: true,
    },
    {
      id: '8',
      name: 'Digital Camera DSLR',
      description:
        'Professional DSLR camera with 24MP sensor and 4K video recording.',
      price: 1499.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=DSLR+Camera',
      category: 'photography',
      inStock: true,
    },
    {
      id: '9',
      name: 'Mechanical Gaming Keyboard',
      description:
        'RGB backlit mechanical keyboard with tactile switches for gaming enthusiasts.',
      price: 149.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Gaming+Keyboard',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '10',
      name: 'Tablet Pro 11',
      description:
        '11-inch tablet with high resolution display and long battery life.',
      price: 799.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Tablet+Pro',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '11',
      name: 'Wireless Charging Pad',
      description:
        'Fast wireless charger compatible with all Qi-enabled devices.',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Charging+Pad',
      category: 'accessories',
      inStock: false,
    },
    {
      id: '12',
      name: 'Smart Home Hub',
      description:
        'Central hub to control all your smart home devices through one interface.',
      price: 179.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Smart+Hub',
      category: 'smart home',
      inStock: true,
    },
  ];

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    // Could use HTTP to fetch from a real API
    // return this.http.get<Product[]>('api/products');

    // Using mock data for now
    return of(this.products);
  }

  // Get product by ID
  getProductById(id: string): Observable<Product | undefined> {
    // For real API:
    // return this.http.get<Product>(`api/products/${id}`);

    // Using mock data for now
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(
      (p) => p.category === category
    );
    return of(filteredProducts);
  }
}
