import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor() { 


  }

  ngOnInit(): void {

    this.toggleSection('commissionerate');
    this.updateBreadcrumb('Commissionerate')


  }


  isCommissionerate:boolean = false;
  isDivision:boolean = false;
  isCircle:boolean = false;
  isTaxPayer:boolean = false;


  breadcrumb: string[] = ['Vat Office > Update']; 

updateBreadcrumb(level: string): void {

  switch (level) {
    case 'Commissionerate':
      this.breadcrumb = ['Vat Office > Update','Commissionerate'];
      break;
    case 'Division':
      this.breadcrumb = ['Vat Office > Update', 'Division'];
      break;
    case 'Circle':
      this.breadcrumb = ['Vat Office > Update', 'Circle'];
      break;
    case 'TaxPayer':
      this.breadcrumb = ['Vat Office > Update', 'Tax Payer'];
      break;
    default:
      this.breadcrumb = ['Vat Office > Update']; 
  }
}



showSection: string = '';  // Variable to track the current section to show

  toggleSection(section: string) {
    // Toggle the section visibility
    if (this.showSection === section) {
      this.showSection = '';  // Hide if already open
    } else {
      this.showSection = section;  // Show the selected section
    }
  }


  
}



