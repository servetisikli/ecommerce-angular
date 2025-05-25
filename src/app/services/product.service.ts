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
      imageUrl:
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '2',
      name: 'Laptop Pro Max',
      description:
        'Powerful laptop for professionals with fast processor and wide display.',
      price: 2249.99,
      imageUrl:
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation feature.',
      price: 249.99,
      imageUrl:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '4',
      name: 'Smart Watch Elite',
      description: 'Stylish smartwatch for fitness tracking and notifications.',
      price: 329.99,
      imageUrl:
        'https://images.unsplash.com/photo-1617625802912-cde586faf331?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '5',
      name: '4K Ultra HD Smart TV',
      description:
        '55-inch smart TV with stunning picture quality and smart features.',
      price: 899.99,
      imageUrl:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '6',
      name: 'Wireless Gaming Mouse',
      description:
        'High precision gaming mouse with RGB lighting and programmable buttons.',
      price: 89.99,
      imageUrl:
        'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'accessories',
      inStock: false,
    },
    {
      id: '7',
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof bluetooth speaker with 20 hours battery life.',
      price: 129.99,
      imageUrl:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'audio',
      inStock: true,
    },
    {
      id: '8',
      name: 'Digital Camera DSLR',
      description:
        'Professional DSLR camera with 24MP sensor and 4K video recording.',
      price: 1499.99,
      imageUrl:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'photography',
      inStock: true,
    },
    {
      id: '9',
      name: 'Mechanical Gaming Keyboard',
      description:
        'RGB backlit mechanical keyboard with tactile switches for gaming enthusiasts.',
      price: 149.99,
      imageUrl:
        'https://images.unsplash.com/photo-1600345957894-4854e82a7dc1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'accessories',
      inStock: true,
    },
    {
      id: '10',
      name: 'Tablet Pro 11',
      description:
        '11-inch tablet with high resolution display and long battery life.',
      price: 799.99,
      imageUrl:
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'electronics',
      inStock: true,
    },
    {
      id: '11',
      name: 'Wireless Charging Pad',
      description:
        'Fast wireless charger compatible with all Qi-enabled devices.',
      price: 49.99,
      imageUrl:
        'https://images.unsplash.com/photo-1622038974101-5c3464399e35?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
      category: 'accessories',
      inStock: false,
    },
    {
      id: '12',
      name: 'Smart Home Hub',
      description:
        'Central hub to control all your smart home devices through one interface.',
      price: 179.99,
      imageUrl:
        'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300',
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

  // Get fallback image if needed
  getFallbackImage(product: Product): string {
    // Create query based on product category and name
    const searchTerms = [];

    // Add product name keywords
    const nameWords = product.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ');
    if (nameWords.length > 0) {
      searchTerms.push(nameWords[0]);
    }

    // Add category
    searchTerms.push(product.category.toLowerCase());

    // Create unique seed for consistent image result
    const uniqueSeed = this.generateUniqueSeed(product.id + product.name);

    return `https://source.unsplash.com/featured/300x300?${encodeURIComponent(
      searchTerms.join(',')
    )}&sig=${uniqueSeed}`;
  }

  // Generate a consistent unique number from a string
  private generateUniqueSeed(input: string): number {
    let hash = 0;
    if (input.length === 0) return hash;

    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    return Math.abs(hash) % 1000;
  }
}
