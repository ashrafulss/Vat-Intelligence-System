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


  public commissionerateList: any = [];
  public divisionListAll: any = [];
  public commissionerateAllData: any = [];
  public divisionAllData: any = [];


  commissionerateNameInvalid: boolean = false;
  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isEditing: boolean = false;

  public currentPage: number = 1;
  public pageSize: number = 5;
  public pageSizes: number = 2;


  commissionerateId: string = '';
  searchTermCommissionerate: string = '';
  selectedCommissionerateId!: string;




  modalMessage!: string;
  searchTerm: string = '';
  divisionName: string = '';
  divisionId: string = '';

  selectedCommissionerateName: string = '';




  onCommissionerateSelect(commissionerate: any) {
    this.selectedCommissionerateId = commissionerate.id;
    this.selectedCommissionerateName = commissionerate.name;
    this.commissionerateId = commissionerate.id;

    this.getDivisionListAll(commissionerate.id)

  }




  constructor(private commissionerateService: CommissionerateService, private reportService: ReportService, private modalService: NgbModal) { }




  public totalPagesDivision(): number {
    return Math.ceil(this.divisionAllData.length / this.pageSize);
  }




  public getCommissionerateList() {



    this.commissionerateService.getCommissionerates().subscribe(res => {

      if (res.status === 200) {
        this.commissionerateAllData = res.body.reverse();

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





  public getDivisionListAll(commisionarateID:string) {


    this.commissionerateService.getDivisions(commisionarateID).subscribe(res => {

      if (res.status === 200) {

        // this.divisionAllData = res.body;
        this.divisionAllData = res.body.sort((a: { createdOn: string | number | Date; }, b: { createdOn: string | number | Date; }) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
        this.loadPageDivison(this.currentPage);
        console.log('---------------- Division Names ----------------');
        this.divisionAllData.forEach((division: any) => {
          console.log(division.createdOn);
        });
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
    this.divisionId = commId;
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
    // this.getDivisionListAll();






  }


  loadPageDivison(page: number) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.divisionListAll = this.divisionAllData.slice(startIndex, endIndex);
  }

  nextPageDivision() {
    console.log(this.divisionAllData.length + "----------------------------------------------");
    console.log(this.currentPage * this.pageSize + "----------------------------------------------")

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










  addDivision() {



    if (!this.selectedCommissionerateName || this.divisionName.trim() === '') {
      this.commissionerateNameInvalid = true; 
      return; // Stop further execution
    }

    // Reset validation error
    // this.commissionerateNameInvalid = false;

    if (this.isEditing) {

      const divisionoid = this.divisionId;

      console.log('--------------divisionOid------------' + this.divisionId)
      console.log('--------------selected commissionearte oid------------' + this.selectedCommissionerateId)


      this.commissionerateService.updateDivision(divisionoid, this.commissionerateId, this.divisionName).subscribe(
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
          console.log('Division added successfully:', response);
          this.modalMessage = 'Division added successfully!';
          this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
          this.refresh();  // Refresh the form or list
        },
        (error) => {
          console.error('Error added Division:', error);
          this.modalMessage = 'Failed to added Division';
          this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
        }
      );
    }


  }





  refresh() {
    this.selectedCommissionerateName = '';
    this.divisionName = '';
    this.isEditing = false;
    this.commissionerateNameInvalid = false;
    // this.commissionerateId = '';

    this.getDivisionListAll(this.commissionerateId);

  }


  editDivision(division: any) {

    this.divisionId = division.id;

    this.commissionerateId = division.commissionerateoid;

    this.divisionName = division.name;


    const selectedCommissionerate = this.commissionerateAllData.find((comm: { id: any; }) => comm.id === division.commissionerateoid);
    if (selectedCommissionerate) {

      this.selectedCommissionerateId = selectedCommissionerate.id;
      this.selectedCommissionerateName = selectedCommissionerate.name;


    }


    this.isEditing = true;


    setTimeout(() => {
      const inputElement = document.getElementById('divisionNameInput') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
      }
    }, 100);


  }


  selectCommissionerate(payer: any) {
    this.commissionerateId = payer.id;
    this.searchTermCommissionerate = payer.name;

  }







  // Getter to filter the list based on the search term across all pages
  get filteredDivisions() {
    if (!this.searchTerm) {
      return this.divisionListAll;
    }

    const filteredData = this.divisionAllData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Apply pagination to the filtered results
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }









}

