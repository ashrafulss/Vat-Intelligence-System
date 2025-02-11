import { Component, OnInit } from '@angular/core';
import { CommissionerateService } from '../../services/commissionerate.service';
import { ReportService } from '../../../analysis/report.service';

@Component({
  selector: 'app-ucommissionerate',
  standalone: false,
  
  templateUrl: './ucommissionerate.component.html',
  styleUrl: './ucommissionerate.component.css'
})
export class UcommissionerateComponent implements OnInit{




  public commissionerateList: any =[];

  public allData: any = [];


  commissionerateNameInvalid: boolean = false; 


  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isPrevClicked: boolean = false;
  isNextClicked: boolean = false;
  isEditing: boolean = false;  
  
  public currentPage: number = 1;  
  public pageSize: number = 5;     


  commissionerateName: string = '';  
  commissionerateId:string ='';
  searchTerm: string = '';  
 


  constructor(private commissionerateService: CommissionerateService,  private reportService: ReportService) { }

  ngOnInit(): void {
   
    this.getCommissionerateList();
  

  }
  
 

  public totalPagesCommissionerate(): number {
    return Math.ceil(this.allData.length / this.pageSize);
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




  onCreateCommissionerate() {


    if (!this.commissionerateName || this.commissionerateName.trim() === '') {
      this.commissionerateNameInvalid = true; // Show validation error
      return; // Stop further execution
    }

    // Reset validation error
    this.commissionerateNameInvalid = false;



    if (this.isEditing) {
      // Ensure that commissionerateId is available for the update
      const commissionerateId = this.commissionerateId; // Get the ID of the commissionerate being editedco

      console.log(commissionerateId+'----------------------------------------------------')

  
      // Update existing commissionerate
      this.commissionerateService.updateCommissionerate(commissionerateId, this.commissionerateName).subscribe(
        (response) => {
          console.log('Commissionerate updated successfully:', response);
          // alert('Commissionerate updated successfully!');
          this.refresh();  // Refresh the form or list
        },
        (error) => {
          console.error('Error updating commissionerate:', error);
          alert('Failed to update commissionerate');
        }
      );
    } else {
      // Add new commissionerate
      this.commissionerateService.saveCommissionerates(this.commissionerateName).subscribe(
        (response) => {
          console.log('Commissionerate created successfully:', response);
          // alert('Commissionerate saved successfully!');
          this.refresh();  // Refresh the form or list
        },
        (error) => {
          console.error('Error creating commissionerate:', error);
          alert('Failed to save commissionerate');
        }
      );
    }
  }
  
  

  onDeleteCommissionerate(commId: string) {
    if (confirm('Are you sure you want to delete this commissionerate?')) {
      this.commissionerateService.deleteCommissionerate(commId).subscribe(
        () => {
          console.log('Commissionerate deleted successfully');
          this.refresh();

        },
        (err) => {
          console.error('Error deleting commissionerate:', err);
        }
      );
    } else {
      console.log('Deletion canceled');
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



 // Getter to filter the list based on the search term across all pages
get filteredCommissionerates() {
  if (!this.searchTerm) {
    return this.commissionerateList; // Return paginated data if no search term
  }
  
  // Filter all data based on the search term
  const filteredData = this.allData.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  // Apply pagination to the filtered results
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filteredData.slice(startIndex, endIndex);
}



  

 

}
