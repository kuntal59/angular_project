import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productServices : ProductService,
              private route : ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
    this.listProduct();
    });
  }

  listProduct(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProduct();
    }
    else{
      this.handleListProduct();
    }
  }

  handleSearchProduct() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productServices.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProduct() {
    // check if "id parameter is available"
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the id param string. convert string to a number using the "+"symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available.... default to 1
      this.currentCategoryId = 1;
    }

    // now get the product for the given category id

    this.productServices.getProductList(this.currentCategoryId).subscribe(
      data => { this.products = data; }
    )
  }

}
