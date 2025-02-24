import { Component, OnInit, ViewChild } from '@angular/core';
import { CommissionerateService } from '../../services/commissionerate.service';
import { ReportService } from '../../../analysis/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SrvRecord } from 'node:dns';

@Component({
  selector: 'app-utaxpayer',
  standalone: false,

  templateUrl: './utaxpayer.component.html',
  styleUrl: './utaxpayer.component.css'
})
export class UtaxpayerComponent implements OnInit {


  breadcrumb: string[] = ['VAT Office > Update'];
  public commissionerateList: any = [];
  public divisionListAll: any = [];
  public circleListAll: any = [];
  public taxPayerList: any = [];
  public allData: any = [];
  public divisionAllData: any = [];
  public circleAllData: any = [];
  public taxPayerAllData: any = [];
  public ownershipList: any = [
    "Proprietorship", 
    "Private Limited",
    "Private Limited, Others",
    "Public Limited",
    "Government"


  ];

  public forcedRegistrationList: any=[
    "Yes", "No"
  ]

  public registrationList: any = [
    "Normal Registration", 
    "Central Registration",

  ];

  public registrationCategoryList: any = [
    "New-Registration", 
    "Re-Registration",



  ];

  public residencyList:any=[
    "Resident",
    "Non-Resident"
  ]

  isCommissionerate: boolean = false;
  commissionerateNameInvalid: boolean = false;
  isDivision: boolean = false;
  isCircle: boolean = false;
  isTaxPayer: boolean = false;
  public isLoading: boolean = true;
  public isProgressBarLoading!: boolean;
  isPrevClicked: boolean = false;
  isNextClicked: boolean = false;
  isEditing: boolean = false;

  public currentPage: number = 1;
  public pageSize: number = 5;
  public pageSizes: number = 2;

  commissionerateName: string = '';
  commissionerateCode: string = '';
  commissionerateId: string = '';
  showSection: string = '';
  currentCommissionerateId: string = '';
  selectedCommissionerateId: any;
  selectedCommissionerateName: any;
  selectedOwnership: any;

  selectedNormalCentralRegistration:any;
  selectedRegistrationCategory:any;
  selectedForcedRegistration:any;
  selectedResidency:any;

  divisionListByComID: any = [];
  selectedDivisionName!: string;
  divisionId: any;
  circleListByComID: any=[];
  selectedDivisionId: any;
  selectedCircleName!: string;
  selectedCircleId: any;


    @ViewChild('modalContent') modalContent: any;
    @ViewChild('deleteModal') deleteModal: any;
  modalMessage!: string;
  

  constructor(private commissionerateService: CommissionerateService, private reportService: ReportService, private modalService: NgbModal) { }




  public totalPagesDivision(): number {
    return Math.ceil(this.divisionAllData.length / this.pageSize);
  }

  public totalPagesCircle(): number {
    return Math.ceil(this.circleAllData.length / this.pageSize);
  }

  public totalPagesTaxPayer(): number {
    return Math.ceil(this.taxPayerAllData.length / this.pageSize);
  }



  public getCommissionerateList() {



    this.commissionerateService.getCommissionerates().subscribe(res => {

      if (res.status === 200) {
        this.allData = res.body;

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





  public getDivisionListAll() {


    this.commissionerateService.getDivisionAll().subscribe(res => {

      if (res.status === 200) {

        this.divisionAllData = res.body;

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





  public getCircleListAll() {


    this.commissionerateService.getCirclesAll().subscribe(res => {

      if (res.status === 200) {

        this.circleAllData = res.body;

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





  public getTaxPayerListAll(circleId:string, commisionarateID: string, divisionID:string ) {


    this.commissionerateService.getTaxPayers(circleId, commisionarateID, divisionID).subscribe(res => {

      if (res.status === 200) {

        // this.taxPayerAllData = res.body;
        this.taxPayerAllData = res.body.sort((a: { createdOn: string | number | Date; }, b: { createdOn: string | number | Date; }) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

        // console.log(this.taxPayerAllData.name)
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
    // this.getTaxPayerListAll();


  }






  updateBreadcrumb(level: string): void {

    switch (level) {
      case 'Commissionerate':
        this.breadcrumb = ['VAT Office > Update', 'Commissionerate'];
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



  searchTerm: string = '';


  // Getter to filter the list based on the search term across all pages
  get filteredTaxpyer() {

    if (!this.searchTerm) {
      return this.taxPayerList; // Return paginated data if no search term
    }

    // Fix: Filter out invalid items before calling `.toLowerCase()`
    const filteredData = this.taxPayerAllData.filter(
      (item: { taxPayerName?: string }) =>
        item.taxPayerName &&
        item.taxPayerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Apply pagination to the filtered results
    const startIndex = (this.currentPage - 1) * this.pageSizes;
    const endIndex = startIndex + this.pageSizes;
    return filteredData.slice(startIndex, endIndex);
  }







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


  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = true;
  }

  onCommissionerateSelect(commissionerate: any) {
    this.selectedCommissionerateId = commissionerate.id;
    this.selectedCommissionerateName = commissionerate.name;
    this.selectedDivisionName = ''; // Reset division selection
    this.selectedCircleName = '';
    this.divisionListByComID = []; // Clear existing divisions while loading
    this.commissionerateId = commissionerate.id;

 

    // Fetch divisions dynamically based on the selected Commissionerate ID
    this.getDivisionListByCommissionerateID(commissionerate.id);
} 


onDivisionSelect(division: any) {
  this.selectedDivisionId = division.id;
  this.selectedDivisionName = division.name;
  this.selectedCircleName = ''; // Reset division selection
  this.circleListByComID = []; // Clear existing divisions while loading
  this.divisionId = division.id;


  // Fetch divisions dynamically based on the selected Commissionerate ID
  this.getCircleListByDivisionID(division.id, this.commissionerateId);
} 

onCircleSelect(circle :any){
  this.circleId = circle.id;
  this.selectedCircleId = circle.id;
  this.selectedCircleName = circle.name;

  this.getTaxPayerListAll(this. circleId, this.commissionerateId, this.divisionId.id );
}


onOwnershipSelect(owenership: any) {

  this.selectedOwnership = owenership;
 
} 

onNormalCentralRegistrationSelect(registration: any) {

  this.selectedNormalCentralRegistration = registration;
 
} 

onRegistrationCategorySelect(category: any){
  this.selectedRegistrationCategory = category
}

onForcedRegistration(forced:any){
  this.selectedForcedRegistration = forced;
}


onResidency(residency:any){
  this.selectedResidency = residency;
}

public getCircleListByDivisionID(divisionID:string, commisionarateID: string){
  
  this.commissionerateService.getCircles(divisionID, commisionarateID).subscribe(res => {
      if (res.status === 200) {
        this.circleListByComID = res.body;
      
        return;
      }
     
  },
  err => {
      this.isProgressBarLoading = false;
      this.isLoading = false;
      if (err.status === 404) {
          // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
          this.circleListByComID = [];
          return;
        }
        if(err.status ===500){
          // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
          this.circleListByComID = [];
          return;
        }
        if (err.error && err.error.message) {
          this.circleListByComID = [];
            // this.messageService.add({severity: 'error', summary: 'Data not found', detail: ''});
        }
  },
  () => {
      this.isProgressBarLoading = false;
      this.isLoading = false;
  });

  
}

circleId:string = '';
taxPayerName: string = '';


oldBinNo:string ='';

binNo:string ='';

etinNo:string = '';

economicActivity: string ='';
areaOfManufacture: string ='';
areaOfService: string ='';
businessClassificationCode:string ='';

address:string='';
registrationType: string='';
email:string ='';
mobileNo:string ='';
TAXpayerid:string ='';


addTaxPayer(){


   
  // this.commissionerateService.saveTaxpayer(
  //   this.commissionerateId, this.divisionId, this.circleId, this.taxPayerName, 

  //   this.selectedOwnership, this.selectedNormalCentralRegistration, this.selectedRegistrationCategory, this.selectedForcedRegistration,

  //   this.selectedResidency, this.oldBinNo, this.binNo, this.etinNo, 
    
  //   this.economicActivity, this.areaOfManufacture, this.areaOfService, this.businessClassificationCode,
  //   this.address, this.registrationType, this.email, this.mobileNo
  
  
  // ).subscribe(
  //   (response) => {
  //     console.log('Taxpayer add successfully:', response);
  //     this.modalMessage = 'Taxpayer add successfully!';
  //     this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
  //     this.refresh();  // Refresh the form or list
  //   },
  //   (error) => {
  //     console.error('Error creating Taxpayer:', error);
  //     this.modalMessage = 'Failed to save Division';
  //     this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
  //   })








  if (this.isEditing) {
 
    const TAXpayerid = this.TAXpayerid; // Get the ID of the commissionerate being edited
    console.log(TAXpayerid + '------------------------TAXpayerid----------------------------')
   

    // Update existing commissionerate
    this.commissionerateService.updateTAXpayer(TAXpayerid, 
      
      this.commissionerateId, this.divisionId, this.circleId, this.taxPayerName, 

      this.selectedOwnership, this.selectedNormalCentralRegistration, this.selectedRegistrationCategory, this.selectedForcedRegistration,
    
      this.selectedResidency, this.oldBinNo, this.binNo, this.etinNo, 
      
      this.economicActivity, this.areaOfManufacture, this.areaOfService, this.businessClassificationCode,
      this.address, this.registrationType, this.email, this.mobileNo
    
    ).subscribe(
      (response) => {
        console.log('taxpayer updated successfully:', response);
        this.modalMessage = 'taxpayer updated successfully!';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
        this.refresh();  // Refresh the form or list
      },
      (error) => {
        console.error('Error updating taxpayer:', error);
        this.modalMessage = 'Failed to update taxpayer';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
      }
    );
  } else {
    
    this.commissionerateService.saveTaxpayer(
  
  this.commissionerateId, this.divisionId, this.circleId, this.taxPayerName, 

  this.selectedOwnership, this.selectedNormalCentralRegistration, this.selectedRegistrationCategory, this.selectedForcedRegistration,

  this.selectedResidency, this.oldBinNo, this.binNo, this.etinNo, 
  
  this.economicActivity, this.areaOfManufacture, this.areaOfService, this.businessClassificationCode,
  this.address, this.registrationType, this.email, this.mobileNo
  
  ).subscribe(
      (response) => {
        console.log('taxpayer added successfully:', response);
        this.modalMessage = 'taxpayer added successfully!';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on success
        this.refresh();  // Refresh the form or list
      },
      (error) => {
        console.error('Error added taxpayer:', error);
        this.modalMessage = 'Failed to added taxpayer';
        this.modalService.open(this.modalContent, { centered: true });  // Open the modal on failure
      }
    );
  }




}




refresh() {

  this.selectedCommissionerateName='';
  this.selectedDivisionName = '';
  this.selectedCircleName = '';
  this.taxPayerName ='';

  this.selectedOwnership = '';
  this.selectedNormalCentralRegistration = '';
  this.selectedRegistrationCategory = '';
  this.selectedForcedRegistration = '';

  this.selectedResidency = '';
  this.oldBinNo ='';
  this.binNo ='';
  this.etinNo = '';

  this.economicActivity ='';
  this.areaOfManufacture ='';
  this.areaOfService ='';
  this.businessClassificationCode='';

  this.address ='';
  this.registrationType ='';
  this.email ='';
  this.mobileNo = '';


  this.TAXpayerid = '';
  this.isEditing = false;

  this.getTaxPayerListAll(this.circleId, this.commissionerateId, this.divisionId);

}
 

editTaxpayer(taxpayer:any){
  this.isDropdownOpen = false;

  this.TAXpayerid = taxpayer.id;


   const selectedCommissionerate = this.allData.find(
    (comm: { id: any; }) => comm.id === taxpayer.commissionerateOid
  );
  this.selectedCommissionerateName = selectedCommissionerate ? selectedCommissionerate.name : null;

  const selectedDivision = this.divisionAllData.find(
    (div: { id: any; }) => div.id === taxpayer.divisionOid
  );
  this.selectedDivisionName = selectedDivision ? selectedDivision.name : null;

  const selectedCircle = this.circleAllData.find(
    (circle: { id: any; }) => circle.id === taxpayer.circleOid
  );
  this.selectedCircleName = selectedCircle ? selectedCircle.name : null;


  this.taxPayerName = taxpayer.taxPayerName;


  this.selectedOwnership = taxpayer.typeOfOwnership;
  this.selectedNormalCentralRegistration = taxpayer.normalCentralRegistration;
  this.selectedRegistrationCategory = taxpayer.registrationCategory;
  this.selectedForcedRegistration = taxpayer.forcedRegistration;

  this.selectedResidency = taxpayer.residencyStatus;
  this.oldBinNo = taxpayer.oldBinNo;
  this.binNo = taxpayer.binNo;
  this.etinNo = taxpayer.etinNo;


  this.economicActivity = taxpayer.economicActivity;
  this.areaOfManufacture= taxpayer.areasOfManufacturing;
  this.areaOfService = taxpayer.areasOfService;
  this.businessClassificationCode = taxpayer.businessClassificationCode;

  this.address = taxpayer.address;
  this.registrationType = taxpayer.registrationType;
  this.email = taxpayer.emailAddress;
  this.mobileNo = taxpayer.mobileNo;

  this.isEditing = true;
  this.selectedCommissionerateId = taxpayer.commissionerateOid;
  this.selectedDivisionId = taxpayer.divisionOid;
}





  
  onDeleteTAXpayer(commId: string) {
    this.TAXpayerid = commId; // Store ID for later deletion
    this.modalService.open(this.deleteModal, { centered: true });
  }

 
    confirmDelete(modal: any) {
      if (!this.TAXpayerid) return;
  
      this.commissionerateService.deleteTAXpayer(this.TAXpayerid).subscribe(
        () => {
          console.log('TAXpayer deleted successfully');
          this.refresh();
          modal.close(); // Close modal on success
        },
        (err) => {
          console.error('Error deleting TAXpayer:', err);
          modal.dismiss('error'); // Close modal on failure
        }
      );
    }


}
