import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../_modal';
import { Observable, of  } from 'rxjs';
import { getBaseUrl } from '../../main';
import { HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-products-component',
    templateUrl: './fetch-products.component.html'
    
})
export class FetchProductsComponent {

    public products: Product[];

    
    private _http: HttpClient;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private modalService: ModalService) {
        this._http = http;

        http.get<Product[]>(baseUrl + 'api/apishop').subscribe(result => {
            this.products = result;
        }, error => console.error(error));
    }

    openAddProduct(id: string) {
        this.modalService.open(id);
    }

    openEditProduct(window: string, productId: number, index: number) {
        this.modalService.open(window);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    saveNewProduct(): Observable<Product> {


        console.log("Logging: " );

        
        this.modalService.close("addProduct");

        return this._http.post<Product>(getBaseUrl() + 'api/apishop', '', this.httpOptions).pipe(
            this.handleError("Add product")
            
        )
        
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}

interface Product {
    name: string;
    description: string;
    price: number;
    productId: number;
    
}
