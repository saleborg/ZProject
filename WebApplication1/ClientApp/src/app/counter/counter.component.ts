import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  constructor(private toastr: ToastrService) { }

  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
    }

    public decrementcounter() {
      this.toastr.success("Hello, I'm the toastr message.")
    }

}
