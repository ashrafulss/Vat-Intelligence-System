import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommissionerateService } from '../../services/commissionerate.service';
import { ReportService } from '../../../analysis/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // You can use ng-bootstrap if you prefer


@Component({
  selector: 'app-ucommissionerate',
  standalone: false,
  
  templateUrl: './ucommissionerate.component.html',
  styleUrl: './ucommissionerate.component.css'
})
export class UcommissionerateComponent implements OnInit{



  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('modalContent') modalContent: any;

  public commissionerateList: any =[];
  public allData: any = [];
  commissionerateNameInvalid: boolean = false; 

  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isEditing: boolean = false;  
  
  public currentPage: number = 1;  
  public pageSize: number = 5;     

  commissionerateName: string = '';  
  commissionerateId:string ='';
  searchTerm: string = '';  
  modalMessage: string = ''; 
  commissionerateIdToDelete: string ='';



  constructor(
    private commissionerateService: CommissionerateService,  
    private modalService: NgbModal  
  ) {}



  ngOnInit(): void {
   
    this.getCommissionerateList();
  

  }
  
 

  public totalPagesCommissionerate(): number {
    return Math.ceil(this.allData.length / this.pageSize);
  }


   
   public getCommissionerateList(){

   
    
     this.commissionerateService.getCommissionerates().subscribe(res => {
   
         if (res.status === 200) {
          this.allData = res.body.sort((a: { createdOn: string | number | Date; }, b: { createdOn: string | number | Date; }) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

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



   onInputChange() {
    this.commissionerateNameInvalid = !this.commissionerateName.trim();
  }

   addCommissionerate() {
   
    if (!this.commissionerateName || this.commissionerateName.trim() === '') {
      this.commissionerateNameInvalid = true; 
      return; 
    }

    this.commissionerateNameInvalid = false;

    if (this.isEditing) {
      const commissionerateId = this.commissionerateId; 
      console.log(commissionerateId + '----------------------------------------------------')
     

      this.commissionerateService.updateCommissionerate(commissionerateId, this.commissionerateName).subscribe(
        (response) => {
          console.log('Commissionerate updated successfully:', response);
          this.modalMessage = 'Commissionerate updated successfully!';
          this.modalService.open(this.modalContent, { centered: true });  
          this.refresh(); 
        },
        (error) => {
          console.error('Error updating commissionerate:', error);
          this.modalMessage = 'Failed to update commissionerate';
          this.modalService.open(this.modalContent, { centered: true });  
        }
      );
    } else {
   
      this.commissionerateService.saveCommissionerates(this.commissionerateName).subscribe(
        (response) => {
          console.log('Commissionerate added successfully:', response);
          this.modalMessage = 'Commissionerate added successfully!';
          this.modalService.open(this.modalContent, { centered: true });  
          this.refresh();  
        },
        (error) => {
          console.error('Error added commissionerate:', error);
          this.modalMessage = 'Failed to added commissionerate';
          this.modalService.open(this.modalContent, { centered: true });  
        }
      );
    }

    
  }
  

 
  onDeleteCommissionerate(commId: string) {
    this.commissionerateIdToDelete = commId; 
    this.modalService.open(this.deleteModal, { centered: true });
  }

 
  confirmDelete(modal: any) {
    if (!this.commissionerateIdToDelete) return;

    this.commissionerateService.deleteCommissionerate(this.commissionerateIdToDelete).subscribe(
      () => {
        console.log('Commissionerate deleted successfully');
        this.refresh();
        modal.close(); 
      },
      (err) => {
        console.error('Error deleting commissionerate:', err);
        modal.dismiss('error'); 
      }
    );
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




  editCommissionerate(commissionerateId: string, name: string, code: string) {
    this.commissionerateName = name;
    this.commissionerateId = commissionerateId;  // Store the ID for updating
    this.isEditing = true;


  setTimeout(() => {
    const inputElement = document.getElementById('commissionerateNameInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
    }
  }, 100); // Small delay to allow UI update
  }
  


  refresh(){
    console.log('hello')
     this.commissionerateName = '';
    this.isEditing = false;
    this.commissionerateNameInvalid = false;
   this.getCommissionerateList();
  }


get filteredCommissionerates() {
  if (!this.searchTerm) {
    return this.commissionerateList; 
  }
  
 
  const filteredData = this.allData.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

 
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filteredData.slice(startIndex, endIndex);
}



  

 

}
