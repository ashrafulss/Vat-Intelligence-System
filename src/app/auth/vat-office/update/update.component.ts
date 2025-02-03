import { Component, OnInit } from '@angular/core';
import { CommissionerateService } from '../services/commissionerate.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {





  constructor(private commissionerateService: CommissionerateService) { }



  public commissionerateList: any =[];
  public demoArray: any =[];
  public divisionList: any =[];
  public taxPayerList: any =[];
  public allData: any = [];
  public divisionAllData: any = [];

  public taxPayerAllData: any = [];

   public isLoading: boolean = true;
   public isProgressBarLoading!: boolean;
   public currentPage: number = 1;  // Tracks the current page
   public pageSize: number = 5;     // Number of items per page
   public pageSizes: number =2;
 
   public getCommissionerateList(){

   
    
     this.commissionerateService.dataArray().subscribe(res => {
   
         if (res.status === 200) {
             this.allData = res.body;
             this.loadPage(this.currentPage);
         }
     },
     err => {
         this.isProgressBarLoading = false;
         this.isLoading = false;
         if (err.status === 404) {
             this.commissionerateList = [];
         }
 
         if (err.error && err.error.message) {
             // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
         }
     },
     () => {
         this.isProgressBarLoading = false;
         this.isLoading = false;
     });
   }
  
   public getDivisionList(){


    this.commissionerateService.divisionArray().subscribe(res => {
  
        if (res.status === 200) {
            this.divisionAllData = res.body;
            this.loadPageDivison(this.currentPage);
        }
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.divisionList = [];
        }

        if (err.error && err.error.message) {
            // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
        }
    },
    () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
    });
  }



  public getTaxPayerList(){


    this.commissionerateService.taxPayerArray().subscribe(res => {
  
        if (res.status === 200) {
            this.taxPayerAllData = res.body;
            this.loadPageTaxPayer(this.currentPage);
        }
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.taxPayerList = [];
        }

        if (err.error && err.error.message) {
            // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
        }
    },
    () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
    });
  }



  ngOnInit(): void {

    this.toggleSection('commissionerate');
    this.updateBreadcrumb('Commissionerate')
    this.getCommissionerateList();
    this.getDivisionList();
    this.getTaxPayerList();


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






  isPrevClicked: boolean = false;
  isNextClicked: boolean = false;
  






   // Load data for the current page
   loadPage(page: number) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.commissionerateList = this.allData.slice(startIndex, endIndex);
  }

  // Move to the next page
  nextPage() {
    if ((this.currentPage * this.pageSize) < this.allData.length) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  // Move to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }





     // Load data for the current page
     loadPageDivison(page: number) {
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.divisionList = this.divisionAllData.slice(startIndex, endIndex);
    }
  
    // Move to the next page
    nextPageDivision() {
      if ((this.currentPage * this.pageSize) < this.divisionAllData.length) {
        this.currentPage++;
        this.loadPageDivison(this.currentPage);
      }
    }
  
    // Move to the previous page
    prevPageDivision() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPageDivison(this.currentPage);
      }
    }








     // Load data for the current page
     loadPageTaxPayer(page: number) {
      const startIndex = (page - 1) * this.pageSizes;
      const endIndex = startIndex + this.pageSizes;
      this.taxPayerList = this.taxPayerAllData.slice(startIndex, endIndex);
    }
  
    // Move to the next page
    nextPageTaxPayer() {
      if ((this.currentPage * this.pageSizes) < this.taxPayerAllData.length) {
        this.currentPage++;
        this.loadPageTaxPayer(this.currentPage);
      }
    }
  
    // Move to the previous page
    prevPageTaxPayer() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPageTaxPayer(this.currentPage);
      }
    }









    deleteCommissionerate() {
      if (confirm('Are you sure you want to delete?')) {
        console.log('Commissionerate deleted.');
      } else {
        console.log('Deletion canceled.');
      }
    }




    editCommissionerate(){
      
    }
    



  
}



