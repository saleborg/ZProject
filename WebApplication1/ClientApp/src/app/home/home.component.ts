import { Component, OnInit } from '@angular/core';

import { ModalService } from '../_modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
    styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})



export class HomeComponent implements OnInit {
    bodyText: string;

  
    constructor(private modalService: ModalService) { }

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
}

