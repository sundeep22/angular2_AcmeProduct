import {Injectable} from 'angular2/core'
import {IProduct} from './product'
import { Http, Response } from 'angular2/http'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class ProductService{
    
    private _productUrl = 'api/products/products.json';
    constructor(private _http: Http)
    {
        
    }
    
    getProducts() : Observable<IProduct[]>
    {
        return this._http.get(this._productUrl)
                        .map(p => <IProduct[]>p.json())
                        //.do(d => console.log("All: " + JSON.stringify(d)))
                        .catch(this.handleError);
        
    }
    
    getProductById(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }


    // getProductById(id : number) : Observable<IProduct>
    // {
    //     return this.getProducts().map(p => p.find(p => p.productId === id));
    // }
    
    private handleError(error: Response)
    {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}