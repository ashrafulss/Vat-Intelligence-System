import { Component, OnInit, ViewChild } from '@angular/core';
import { CommissionerateService } from '../../services/commissionerate.service';
import { ReportService } from '../../../analysis/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ucircle',
  standalone: false,
  
  templateUrl: './ucircle.component.html',
  styleUrl: './ucircle.component.css'
})
export class UcircleComponent implements OnInit {


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

  circleName: string = ''; 
  divisionoid: string = ''; 
  commissionerateId:string ='';


  commissionerateCode: string = ''; 
 
  showSection: string = ''; 
  currentCommissionerateId: string = ''; 
  divisionListByComID: any = [];
  selectedCommissionerateId: any;
  selectedCommissionerateName: any;
  selectedDivisionName: any;
  searchTerm: string = '';
  modalMessage!: string;


  @ViewChild('deleteModal') deleteModal: any;
    @ViewChild('modalContent') modalContent: any;
  circleoid!: string;

  constructor(private commissionerateService: CommissionerateService,  private reportService: ReportService, private modalService: NgbModal) { }
  
 


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





  public getCircleListAll(divisionID: string, commisionarateID: string){


    this.commissionerateService.getCircles(divisionID, commisionarateID, ).subscribe(res => {
  
        if (res.status === 200) {
          
            // this.circleAllData = res.body;
            this.circleAllData = res.body.sort((a: { createdOn: string | number | Date; }, b: { createdOn: string | number | Date; }) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

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







  ngOnInit(): void {

    this.toggleSection('commissionerate');
    this.updateBreadcrumb('Commissionerate')
    this.getCommissionerateList();
    this.getDivisionListAll();
    // this.getCircleListAll();
  

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
      if (section === 'division') {
      this.getCommissionerateList();
    } 

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







  






// this one is for get all divisionList
  public getDivisionListByCommissionerateID(commisionarateID: string){
  
    this.commissionerateService.getDivisions(commisionarateID).subscribe(res => {
        if (res.status === 200) {
          this.divisionListByComID = res.body;
        
          return;
        }
       
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
            this.divisionListByComID = [];
            return;
          }
          if(err.status ===500){
            // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
            this.divisionListByComID = [];
            return;
          }
          if (err.error && err.error.message) {
            this.divisionListByComID = [];
              // this.messageService.add({severity: 'error', summary: 'Data not found', detail: ''});
          }
    },
    () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
    });

    
  }


  
  onCommissionerateSelect(commissionerate: any) {
    this.selectedCommissionerateId = commissionerate.id;
    this.selectedCommissionerateName = commissionerate.name;
    this.selectedDivisionName = ''; // Reset division selection
    this.divisionListByComID = []; // Clear existing divisions while loading
    this.commissionerateId = commissionerate.id;

    // Fetch divisions dynamically based on the selected Commissionerate ID
    this.getDivisionListByCommissionerateID(commissionerate.id);
} 


onDivisionSelect(division: any) {
  this.selectedDivisionName = division.name;
  this.divisionoid = division.id;

  this.getCircleListAll(this.divisionoid, division.commissionerateoid, );
  // commissionerateoid: string, divisionoid:string,
}






get filteredCircles() {
  if (!this.searchTerm) {
    return this.circleListAll; // Return paginated data if no search term
  }
  
  // Filter all data based on the search term
  const filteredData = this.circleAllData.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  // Apply pagination to the filtered results
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filteredData.slice(startIndex, endIndex);
}









addCircle() {

  console.log(this.commissionerateId+'-----------------')
  console.log(this.divisionoid+'-----------------')

  console.log(this.circleName+'-----------------')


  // this.commissionerateService.saveCircle(this.commissionerateId, this.divisionoid, this.circleName).subscribe(
  //   (response) => {
  //     console.log('circle created successfully:', response);
  //     this.modalMessage = 'cicle created successfully!';
  //     this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
  //     this.refresh();  // Refresh the form or list
  //   },
  //   (error) => {
  //     console.error('Error creating Division:', error);
  //     this.modalMessage = 'Failed to save Division';
  //     this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
  //   }
  // );




   
  // if (!this.commissionerateName || this.commissionerateName.trim() === '') {
  //   this.commissionerateNameInvalid = true; // Show validation error
  //   return; // Stop further execution
  // }

  // // Reset validation error
  // this.commissionerateNameInvalid = false;

  if (this.isEditing) {
    // Ensure that commissionerateId is available for the update
    const circleoid = this.circleoid; // Get the ID of the commissionerate being edited
    console.log(circleoid + '------------------------circleoid----------------------------')
   

    // Update existing commissionerate
    this.commissionerateService.updateCircle(circleoid, this.commissionerateId, this.divisionoid, this.circleName).subscribe(
      (response) => {
        console.log('Circle updated successfully:', response);
        this.modalMessage = 'Circle updated successfully!';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
        this.refresh();  // Refresh the form or list
      },
      (error) => {
        console.error('Error updating Circle:', error);
        this.modalMessage = 'Failed to update Circle';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
      }
    );
  } else {
    // Add new commissionerate
    this.commissionerateService.saveCircle(this.commissionerateId, this.divisionoid, this.circleName).subscribe(
      (response) => {
        console.log('Circle added successfully:', response);
        this.modalMessage = 'Circle added successfully!';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
        this.refresh();  // Refresh the form or list
      },
      (error) => {
        console.error('Error creating Circle:', error);
        this.modalMessage = 'Failed to added Circle';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
      }
    );
  }

 

  
}


refresh(){
  console.log('hello')
  this.circleoid = '';
   this.selectedCommissionerateName = '';
   this.selectedDivisionName = '';
   this.circleName = '';
  this.isEditing = false;
  this.commissionerateNameInvalid = false;
//  this.getCircleListAll();
}





  editCircle(circle:any) {

    this.circleName = circle.name;
    this.circleoid = circle.id;
    

    
   // Find and set the selected Commissionerate
const selectedCommissionerate = this.allData.find((comm: { id: any; }) => comm.id === circle.commissionerateoid);
if (selectedCommissionerate) {
    this.selectedCommissionerateId = selectedCommissionerate.id;
    this.selectedCommissionerateName = selectedCommissionerate.name;

    // Fetch divisions for the selected Commissionerate
    this.getDivisionListByCommissionerateID(this.selectedCommissionerateId);
}


setTimeout(() => {
  const selectedDivision = this.divisionListByComID.find((div: { id: any; }) => div.id === circle.divisionOid);
  this.selectedDivisionName = selectedDivision ? selectedDivision.name : '';
}, 100);

  setTimeout(() => {
    const inputElement = document.getElementById('circleName') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
    }
  }, 100); // Small delay to allow UI update


  this.isEditing = true;

  }


  // Open the delete confirmation modal
  onDeleteCircle(commId: string) {
    this.circleoid = commId; // Store ID for later deletion
    this.modalService.open(this.deleteModal, { centered: true });
  }

    // Confirm and delete the commissionerate
    confirmDelete(modal: any) {
      if (!this.circleoid) return;
  
      this.commissionerateService.deleteCircle(this.circleoid).subscribe(
        () => {
          console.log('Division deleted successfully');
          this.refresh();
          modal.close(); // Close modal on success
        },
        (err) => {
          console.error('Error deleting Divison:', err);
          modal.dismiss('error'); // Close modal on failure
        }
      );
    }


  
}