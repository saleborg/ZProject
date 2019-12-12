/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddProductComponent } from './add-product.component';

let component: AddProductComponent;
let fixture: ComponentFixture<AddProductComponent>;

describe('add-product component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddProductComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AddProductComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});