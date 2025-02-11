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
  public circleListAll: any = [];
  public taxPayerList: any =[];
  public allData: any = [];
  public divisionAllData: any = [];
  public circleAllData: any =[];
  public taxPayerAllData: any = [];

  isCommissionerate:boolean = false;
  commissionerateNameInvalid: boolean = false; 
  isDivision:boolean = false;
  isCircle:boolean = false;
  isTaxPayer:boolean = false;
  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isPrevClicked: boolean = false;
  isNextClicked: boolean = false;
  isEditing: boolean = false;  
  
  public currentPage: number = 1;  
  public pageSize: number = 5;     
  public pageSizes: number =2;

  commissionerateName: string = '';  
  commissionerateCode: string = ''; 
  commissionerateId:string ='';
  showSection: string = ''; 
  currentCommissionerateId: string = ''; 

  constructor(private commissionerateService: CommissionerateService,  private reportService: ReportService) { }
  
 


  public totalPagesDivision(): number {
    return Math.ceil(this.divisionAllData.length / this.pageSize);
  }

  public totalPagesCircle(): number {
    return Math.ceil(this.circleAllData.length / this.pageSize);
  }

  public totalPagesTaxPayer(): number {
    return Math.ceil(this.taxPayerAllData.length / this.pageSize);
  }
  

   
   public getCommissionerateList(){

   
    
     this.commissionerateService.getCommissionerates().subscribe(res => {
   
         if (res.status === 200) {
             this.allData = res.body.reverse();
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




  
   public getDivisionListAll(){


    this.commissionerateService.getDivisionAll().subscribe(res => {
  
        if (res.status === 200) {
          
            this.divisionAllData = res.body;
            this.loadPageDivison(this.currentPage);
        }
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.divisionListAll = [];
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





  public getCircleListAll(){


    this.commissionerateService.getCirclesAll().subscribe(res => {
  
        if (res.status === 200) {
          
            this.circleAllData = res.body;
            this.loadPageCircle(this.currentPage);
        }
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.circleAllData = [];
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





  public getTaxPayerListAll(){


    this.reportService.getVatPayerList().subscribe(res => {
  
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
    this.getDivisionListAll();
    this.getCircleListAll();
    this.getTaxPayerListAll();


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




   loadPage(page: number) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.commissionerateList = this.allData.slice(startIndex, endIndex);
  }

 
  nextPage() {
    if ((this.currentPage * this.pageSize) < this.allData.length) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

 
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }


     loadPageDivison(page: number) {
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.divisionListAll = this.divisionAllData.slice(startIndex, endIndex);
    }

    nextPageDivision() {
      console.log(this.divisionAllData.length+"----------------------------------------------");
      console.log(this.currentPage * this.pageSize+"----------------------------------------------")

      if ((this.currentPage * this.pageSize) < this.divisionAllData.length) {
        this.currentPage++;
        this.loadPageDivison(this.currentPage);
      }

    }
  
  
    prevPageDivision() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPageDivison(this.currentPage);
      }
    }



    // -------------------------------------------------


    loadPageCircle(page: number) {
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.circleListAll = this.circleAllData.slice(startIndex, endIndex);
    }

    nextPageCircle() {
 
      if ((this.currentPage * this.pageSize) < this.circleAllData.length) {
        this.currentPage++;
        this.loadPageCircle(this.currentPage);
      }

    }
  
  
    prevPageCircle() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPageCircle(this.currentPage);
      }
    }



// ------------------------------------------------------



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







  




  // 📌 Start Editing a Commissionerate
  // editCommissionerate(id: string): void {
  //   const commissionerate = this.commissionerateList.find((c: { id: string; }) => c.id === id);
  //   if (commissionerate) {
  //     this.isEditing = true;
  //     this.commissionerateName = commissionerate.name;  
  //   }
  // }




  

 



  
}



