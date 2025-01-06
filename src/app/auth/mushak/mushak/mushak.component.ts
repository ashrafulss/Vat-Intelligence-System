import { Component } from '@angular/core';

@Component({
  selector: 'app-mushak',
  templateUrl: './mushak.component.html',
  styleUrl: './mushak.component.css'
})
export class MushakComponent {




  accordionItems = [
    { id: 'collapseOne', title: 'Accordion Item 1', content: 'This is the content of item 1' },
    { id: 'collapseTwo', title: 'Accordion Item 2', content: 'This is the content of item 2' },
    { id: 'collapseThree', title: 'Accordion Item 3', content: 'This is the content of item 3' }
  ];

}
