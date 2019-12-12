/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FetchProductsComponent } from './fetch-products.component';

let component: FetchProductsComponent;
let fixture: ComponentFixture<FetchProductsComponent>;

describe('fetch-products component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FetchProductsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FetchProductsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});