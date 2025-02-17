import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommissionerateService } from '../../services/commissionerate.service';
import { ReportService } from '../../../analysis/report.service';
import bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-udivision',
  standalone: false,
  
  templateUrl: './udivision.component.html',
  styleUrl: './udivision.component.css'
})
export class UdivisionComponent implements OnInit {

  @ViewChild('modalContent') modalContent: any;
  @ViewChild('deleteModal') deleteModal: any;
  

  public commissionerateList: any =[];
  public divisionListAll: any =[];

  public allData: any = [];
  public divisionAllData: any = [];

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
  dropdown: any;
  modalMessage!: string;



  selectedCommissionerate: any = null;
  divisionName: string = ''; 
  divisionId: string = '';




  
 




  isSearchVisible: boolean = false; // Controls visibility of input field
  isDropdownOpen: boolean =false;
  searchTerm: string = ''; 
  searchTermCommissionerate: string = ''; 
  selectedCommissionerateId!: string;

  
  constructor(private commissionerateService: CommissionerateService,  private reportService: ReportService, private modalService: NgbModal) { }
  
 


  public totalPagesDivision(): number {
    return Math.ceil(this.divisionAllData.length / this.pageSize);
  }



   
   public getCommissionerateList(){

   
    
     this.commissionerateService.getCommissionerates().subscribe(res => {
   
         if (res.status === 200) {
             this.allData = res.body.reverse();
            
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
          
            // this.divisionAllData = res.body;
            this.divisionAllData = res.body.sort((a: { createdOn: string | number | Date; }, b: { createdOn: string | number | Date; }) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
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




  // Open the delete confirmation modal
  onDeleteDivision(commId: string) {
    this.divisionId = commId; // Store ID for later deletion
    this.modalService.open(this.deleteModal, { centered: true });
  }



    // Confirm and delete the commissionerate
    confirmDelete(modal: any) {
      if (!this.divisionId) return;
  
      this.commissionerateService.deleteDivision(this.divisionId).subscribe(
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


  ngOnInit(): void {

  
    this.getCommissionerateList();
    this.getDivisionListAll();

    




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








    
    showSearch(): void {
   this.isSearchVisible = true;
   this.isDropdownOpen = true;

   setTimeout(() => {
    const inputElement = document.getElementById('commissionerateNameInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
    }
  }, 100); // Small delay to allow UI update
    }


  
    
  



    // addCommissionerateAndDivision() {
    //   if (!this.selectedCommissionerate || !this.divisionName.trim()) {
    //     alert('Please select a Commissionerate and enter a Division Name.');
    //     return;
    //   }
  
      
    //   const payload = {
    //     commissionerateId: this.selectedCommissionerate.id,
    //     commissionerateName: this.selectedCommissionerate.name,
      

    //   };
  
   
    
    //   this.commissionerateService.saveDivision(this.commissionerateId, this.divisionName).subscribe(
    //     (response) => {
    //       console.log('Commissionerate created successfully:', response);
    //       this.modalMessage = 'Commissionerate created successfully!';
    //       this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
    //       this.refresh();  // Refresh the form or list
    //     },
    //     (error) => {
    //       console.error('Error creating commissionerate:', error);
    //       this.modalMessage = 'Failed to save commissionerate';
    //       this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
    //     }
    //   );


    // }

    

    addCommissionerateAndDivision() {

   
   
      if (!this.selectedCommissionerate || this.divisionName.trim() === '') {
        // this.commissionerateNameInvalid = true; // Show validation error
        return; // Stop further execution
      }
  
      // Reset validation error
      // this.commissionerateNameInvalid = false;
  
      if (this.isEditing) {
        // Ensure that commissionerateId is available for the update
        const commissionerateId = this.commissionerateId; // Get the ID of the commissionerate being edited
        
  
        // Update existing commissionerate
        this.commissionerateService.updateDivision(commissionerateId, this.divisionName).subscribe(
          (response) => {
            console.log('Division updated successfully:', response);
            this.modalMessage = 'Division updated successfully!';
            this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
            this.refresh();  // Refresh the form or list
          },
          (error) => {
            console.error('Error updating Division:', error);
            this.modalMessage = 'Failed to update Division';
            this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
          }
        );
      } else {
        // Add new Division
        this.commissionerateService.saveDivision(this.commissionerateId, this.divisionName).subscribe(
          (response) => {
            console.log('Division created successfully:', response);
            this.modalMessage = 'Division created successfully!';
            this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
            this.refresh();  // Refresh the form or list
          },
          (error) => {
            console.error('Error creating Division:', error);
            this.modalMessage = 'Failed to save Division';
            this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
          }
        );
      }
  
      
    }





    refresh(){
      this.selectedCommissionerate = null;
      this.divisionName = '';
      this.isEditing = false;
      this.commissionerateNameInvalid = false;
    
     this.getDivisionListAll();

    }


    editDivision(commissionerateId: string, name: string, code: string) {
      // this.commissionerateName = name;
      this.divisionName  = name;
      this.selectedCommissionerate = this.filteredCommissionerates.find((payer: { id: string; }) => payer.id === commissionerateId);
      this.selectedCommissionerateId = commissionerateId;
      this.isEditing = true;
  
  
    // setTimeout(() => {
    //   const inputElement = document.getElementById('commissionerateNameInput') as HTMLInputElement;
    //   if (inputElement) {
    //     inputElement.focus();
    //     inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
    //   }
    // }, 100); // Small delay to allow UI update


    }

  
    selectCommissionerate(payer: any) {
      this.commissionerateId = payer.id;
      // this.selectedCommissionerate.id = payer.id;
      this.searchTermCommissionerate = payer.name;
      this.selectedCommissionerate = payer;
      this.isSearchVisible = false;
      // this.searchTermCommissionerate = '';
    }
    

  





 // Getter to filter the list based on the search term across all pages
 get filteredDivisions() {
  if (!this.searchTerm) {
    return this.divisionListAll; // Return paginated data if no search term
  }
  
  // Filter all data based on the search term
  const filteredData = this.divisionAllData.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  // Apply pagination to the filtered results
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filteredData.slice(startIndex, endIndex);
}


  



 // Getter to filter the list based on the search term across all pages
 get filteredCommissionerates() {
  if (!this.searchTermCommissionerate) {
    return this.allData; // Return paginated data if no search term
  }
  
  // Filter all data based on the search term
  const filteredData = this.allData.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(this.searchTermCommissionerate.toLowerCase())
  );

  // Apply pagination to the filtered results
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filteredData.slice(startIndex, endIndex);
}


 



  
}

