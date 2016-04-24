import { Component, OnInit } from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import { IProduct } from './product'
import { ProductFilterPipe } from './product-filter.pipe'
import { StarComponent } from '../shared/star.component'
import { ProductService } from './product.service'

@Component({
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent, ROUTER_DIRECTIVES]
}) //OnInit down there is called a hook
export class ProductListComponent implements OnInit{
        
        //dependency
        constructor(private _productService: ProductService)
        {
        }
       
        pageTitle : string = "Product List";
        
        imageWidth: number = 50;
        imageMargin: number = 2;
        showImage: boolean = false;
        listFilter: string;
        errorMessage: string;
        
        products : IProduct[];               
                        
        toggleImage() : void {
            this.showImage = !this.showImage;
        }
         ngOnInit(): void {
             this._productService.getProducts()
                                 .subscribe(p => this.products = p, e => this.errorMessage = e);
            console.log('Initializing ProductListComponent')    
        }
        
        onRatingClicked(message: string): void{
            this.pageTitle = 'Product List: ' + message;
        }
}

