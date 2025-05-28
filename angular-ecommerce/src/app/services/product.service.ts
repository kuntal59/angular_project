import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable, throwError } from 'rxjs';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:9090/api/products';

  private categoryUrl = 'http://localhost:9090/api/product-category';

  constructor(private httpClient : HttpClient) { }

  getProducts(theProductId: number):Observable<Product>{
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
    
  }

  getProductList(theCategoryId:number) : Observable<Product[]>{

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProduct(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProduct(searchUrl);
  }

  private getProduct(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponceProducts>(searchUrl).pipe(
      map(Response => Response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponceProductsCategory>(this.categoryUrl).pipe(
      map(Response => Response._embedded.productCategory)
    );
  }

}

interface GetResponceProducts{
  _embedded : {
    products : Product[];
  }
}

interface GetResponceProductsCategory{
  _embedded : {
    productCategory : ProductCategory[];
  }
}
