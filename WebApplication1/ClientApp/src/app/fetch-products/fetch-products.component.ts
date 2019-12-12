import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-products-component',
    templateUrl: './fetch-products.component.html'
    
})
export class FetchProductsComponent {
    public products: Product[];

    public bodyText: String;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        http.get<Product[]>(baseUrl + 'api/apishop').subscribe(result => {
            this.products = result;
        }, error => console.error(error));
    }


    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string) {
        
    }

    closeModal(id: string) {
        
    }

}

interface Product {
    name: string;
    description: string;
    price: number;
    productId: number;
    
}
