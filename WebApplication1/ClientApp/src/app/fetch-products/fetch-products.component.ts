import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product.module';
import { User } from '../Model/user.module';
import { ModalService } from '../_modal';
import { Cart, getCart } from '../Model/cart.module';
import { OrderDetail, getOrderDetail } from '../Model/orderdetail.module';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-products-component',
  templateUrl: './fetch-products.component.html',
  providers: [FormBuilder, FormControl]

})




export class FetchProductsComponent {

  public products: Product[];

  public user: User;
  isAdmin: boolean = false;
  username = "";
  password = "";
  name = "";
  description = "";
  price: number = null;
  productId: number = null;
  imageName = "";
  index: number = null;
  baseUrl: string = "";
  showProductsBool: boolean = false;
  editProduct: Product;
  error = "";
  imageUrl = "";
  cart: Cart;

  private _http: HttpClient;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
    




  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private modalService: ModalService, private toastr: ToastrService) {
    this.baseUrl = baseUrl;
    this._http = http;

  }

  logout() {
    this.showProducts();
    this.user = null;
    this.username = "";
    this.password = "";
    this.cart = null;
  }


  login() {
    this.toastr.show('Loggar in, vänligen vänta');

    console.log(this.username + " " + this.password);


    this._http.get<User>(this.baseUrl + 'api/apishop/login/' + this.username + '/' + this.password).subscribe(result => {
      this.user = result
      if (this.user != null) {

        this.isAdmin = this.user.isAdmin;
        this.modalService.close("openLogin");
        this.fetchData();
        this.showProducts();

      } else {
        this.error = "User or password is incorect";
      }
    }, error => console.error(error));


  }

  openLogin() {
    this.modalService.open("openLogin");
  }


  showProducts() {
    this.showProductsBool = !this.showProductsBool;

  }


  onSubmitAdd(form: NgForm) {
    this.modalService.close("addProduct");
    const p: EditProduct = { name: form.value.name, description: form.value.description, price: +form.value.price, imageName: "empty" };

    const formData = new FormData();
    formData.append('file', this.fileData);

    this.onSubmit();

    console.log("Form data " + formData + ' ' + this.fileData.name);

    this._http.post<Product[]>(this.baseUrl + 'api/apishop/', p, this.httpOptions).subscribe(results => {
      this.products = results;
      console.log(this.products);
    }, error => console.error(error));

  }

  deleteProduct(id: number, index: number) {

    this._http.delete<Product[]>(
      this.baseUrl + 'api/apishop/' + id, this.httpOptions).subscribe(results => {
        console.log(results);
        this.products = results;

      }, error => console.error(error))
  }


  openModal(id: string) {
    this.modalService.open(id);
  }


  saveChanges() {
    this.modalService.close('editProduct');
    const p: EditProduct = { name: this.name, description: this.description, price: +this.price, imageName: this.imageName };

    this._http.put<Product[]>(this.baseUrl + 'api/apishop/' + this.productId, p, this.httpOptions).subscribe(results => {
      console.log(results);
      this.products = results;

    }, error => console.error(error));
  }


  async fetchData() {
    await this._http.get<Product[]>(this.baseUrl + 'api/apishop').subscribe(result => {
      

      this.products = result

      
      


    }, error => console.error(error));

  }

  

 

  openDetails(window: string, productId: number, index: number) {
    this.populateProduct(index);
    this.modalService.open(window);

  }

  populateProduct(index: number)  {
    this.index = index;
    this.name = this.products[index].name;
    this.description = this.products[index].description;
    this.price = this.products[index].price;
    this.imageName = this.products[index].imageName;
    this.productId = this.products[index].productId;
  }


  updateName() {
    console.log("Nu")
  }

  openEditProduct(window: string, productId: number, index: number) {

    this.populateProduct(index);
    this.modalService.open(window);

  }

  closeModal(id: string) {
    this.modalService.close(id);
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



  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }

  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData, this.previewUrl);
    this._http.post(this.baseUrl + 'api/apishop/UploadImage/', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Disposition': 'multipart/form-data'
      }, reportProgress: true, observe: 'events'
    })
      .subscribe(event => {

      });
  }


  openCart() {
    this.modalService.open('cart')
  }

  addToCart(pId: number, index: number) {

    this.toastr.success('Varan tillagd i korgen');

    var prod = this.products[index];

    var od = getOrderDetail(prod, prod.price, 1);
    
    if (this.cart == null) {

      let ods: OrderDetail[] = [{ product: prod, price: prod.price, units: 1 }];
      this.cart = getCart(ods);

    } else {

      var indexOfProduct = this.cart.orderDetails.findIndex(x =>
        x.product.productId == prod.productId)

      if (indexOfProduct == -1) {
        this.cart.orderDetails.push(od);
      } else {
        this.cart.orderDetails[indexOfProduct].units++;
      }


      
    }
    
  }

  submitOrder() {
    this.toastr.success('Ordern lagd');
    this.modalService.close('cart');








  }



}

interface EditProduct {
  name: string;
  description: string;
  price: number;
  imageName: string;
}
