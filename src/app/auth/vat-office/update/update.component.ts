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








  currentPage = 1; // Track current page
  itemsPerPage = 5; // Number of items per page
  commissionerates = [
    { code: '00', name: 'Customs, Excise and VAT Commissionerate, Dhaka (North)', dateAdded: '30 Jan 2025' },
    { code: '01', name: 'Customs, Excise and VAT Commissionerate, Dhaka (South)', dateAdded: '29 Jan 2025' },
    { code: '02', name: 'Customs, Excise and VAT Commissionerate, Chattogram', dateAdded: '28 Jan 2025' },
    { code: '03', name: 'Customs, Excise and VAT Commissionerate, Khulna', dateAdded: '27 Jan 2025' },
    { code: '04', name: 'Customs, Excise and VAT Commissionerate, Rajshahi', dateAdded: '26 Jan 2025' },
    { code: '05', name: 'Customs, Excise and VAT Commissionerate, Sylhet', dateAdded: '25 Jan 2025' }
  ];


  
}



