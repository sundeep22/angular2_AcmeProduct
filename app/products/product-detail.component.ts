import { Component, OnInit } from 'angular2/core'
import { Router, RouteParams } from 'angular2/router'
import {IProduct} from  './product'
import { ProductService } from './product.service'
import { StarComponent } from '../shared/star.component'

@Component({
    templateUrl : "./app/products/product-detail.component.html",
    directives: [StarComponent]
})
export class ProductDetailComponent implements OnInit
{
    product : IProduct;
    errorMessage:string;
  
    constructor(private _routeParams : RouteParams, private _router : Router, private _productService : ProductService) {
        let id = +this._routeParams.get('id');
        this.pageTitle += ': ' + id;
    }
    pageTitle: string = "Product Title";
    
    
    onBack() : void {
        this._router.navigate(['Products']);
    }
    
    ngOnInit() :void
    {
        if(!this.product)
        {
        let id = +this._routeParams.get('id');
        
         this.getProduct(id);
        }
    }

    getProduct(id: number) {
        this._productService.getProductById(id)
            .subscribe(
            p => this.product = p,
            error => this.errorMessage = <any>error);
    }
}
