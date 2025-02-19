import { Component, OnInit } from '@angular/core';
import { CommissionerateService } from '../services/commissionerate.service';
import { ReportService } from '../../analysis/report.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  breadcrumb: string[] = ['VAT Office > Update']; 

  public commissionerateList: any =[];
  public divisionListAll: any =[];
  public taxPayerList: any =[];
  public allData: any = [];
  public divisionAllData: any = [];
  public circleAllData: any =[];
  public taxPayerAllData: any = [];

  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isEditing: boolean = false;  

  showSection: string = ''; 
 

  constructor(private commissionerateService: CommissionerateService,  private reportService: ReportService) { }
  
 

  

   
   public getCommissionerateList(){

   
    
     this.commissionerateService.getCommissionerates().subscribe(res => {
   
         if (res.status === 200) {
             this.allData = res.body.reverse();
            //  this.loadPage(this.currentPage);
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




  
  //  public getDivisionListAll(){


  //   this.commissionerateService.getDivisionAll().subscribe(res => {
  
  //       if (res.status === 200) {
          
  //           this.divisionAllData = res.body;
  //           // this.loadPageDivison(this.currentPage);
  //       }
  //   },
  //   err => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //       if (err.status === 404) {
  //           this.divisionListAll = [];
  //       }

  //       if (err.error && err.error.message) {
  //           // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
  //       }
  //   },
  //   () => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //   });
  // }





  // public getCircleListAll(){


  //   this.commissionerateService.getCirclesAll().subscribe(res => {
  
  //       if (res.status === 200) {
          
  //           this.circleAllData = res.body;
  //           // this.loadPageCircle(this.currentPage);
  //       }
  //   },
  //   err => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //       if (err.status === 404) {
  //           this.circleAllData = [];
  //       }

  //       if (err.error && err.error.message) {
  //           // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
  //       }
  //   },
  //   () => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //   });
  // }





  // public getTaxPayerListAll(){


  //   this.reportService.getVatPayerList().subscribe(res => {
  
  //       if (res.status === 200) {
  //           this.taxPayerAllData = res.body;
  //           // this.loadPageTaxPayer(this.currentPage);
  //       }
  //   },
  //   err => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //       if (err.status === 404) {
  //           this.taxPayerList = [];
  //       }

  //       if (err.error && err.error.message) {
  //           // this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
  //       }
  //   },
  //   () => {
  //       this.isProgressBarLoading = false;
  //       this.isLoading = false;
  //   });
  // }



  ngOnInit(): void {

    this.toggleSection('commissionerate');
    this.updateBreadcrumb('Commissionerate')
    // this.getCommissionerateList();

    // this.getDivisionListAll();
    // this.getCircleListAll();
    // this.getTaxPayerListAll();


  }


 

 

  updateBreadcrumb(level: string): void {

    switch (level) {
      case 'Commissionerate':
        this.breadcrumb = ['VAT Office > Update','Commissionerate'];
        break;
      case 'Division':
        this.breadcrumb = ['VAT Office > Update', 'Division'];
        break;
      case 'Circle':
        this.breadcrumb = ['VAT Office > Update', 'Circle'];
        break;
      case 'TaxPayer':
        this.breadcrumb = ['VAT Office > Update', 'Tax Payer'];
        break;
      default:
        this.breadcrumb = ['VAT Office > Update']; 
    }
  }



  toggleSection(section: string) {
  
    if (this.showSection === section) {
      this.showSection = '';  
    } else {
      this.showSection = section; 
    
    }


   


  }







  
}



