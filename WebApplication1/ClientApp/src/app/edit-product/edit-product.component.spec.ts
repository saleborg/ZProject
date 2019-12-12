/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EditProductComponent } from './edit-product.component';

let component: EditProductComponent;
let fixture: ComponentFixture<EditProductComponent>;

describe('edit-product component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EditProductComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EditProductComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});