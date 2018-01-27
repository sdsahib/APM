
import { Component } from '@angular/core';
import { Iproduct } from './product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './product.service';



@Component({
    
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']

})
export class ProductListComponent implements OnInit{
    errorMessage: any;
    
    pageTitle: String = 'Product List';
    imageWidth: number = 50;
    imageMargin: number =2;
    showImage: boolean = false;
    _listFilter :string ;

    constructor(private _productService:ProductService){
        
    }

    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: Iproduct[];

    products : Iproduct[] = [];
    

    OnRatingClicked(message:string):void{
        this.pageTitle = 'Product Rating' + message;
    }

    performFilter(filterBy:string): Iproduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product:Iproduct)=>
            product.productName.toLowerCase().indexOf(filterBy)!=-1);      
    }
    
    toggleImage():void {
        this.showImage = !this.showImage;
    }
    ngOnInit():void{
        this._productService.getProducts()
            .subscribe(products => {
                this.products = products;
                this.filteredProducts =this.products;
                },
                       error=>this.errorMessage= <any>error);
        
    }

}