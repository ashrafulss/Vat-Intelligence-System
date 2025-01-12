import { Component } from '@angular/core';
import { Commissioner } from '../vat-office-model';
import { CommissionerateService } from '../services/commissionerate.service';


@Component({
  selector: 'app-commissionerate',
  templateUrl: './commissionerate.component.html',
  styleUrl: './commissionerate.component.css'
})
export class CommissionerateComponent {


  isCollapsed: { [key: string]: boolean } = {};
  currentlyOpenCommissionerId: string | null = null;
  currentlyOpenDivisionId: string | null = null;
  currentlyOpenCircleId: string | null = null;
  public commissionerateList: any =[];
  public divisionList: any =[];
  public circleList: any =[];
  public taxPayerList: any =[];
  public isLoading: boolean = false;
  public isProgressBarLoading!: boolean;
  // public commissionerateOid: string='';
  // public divisionOid: string='';
  // public circleOid: string='';
  commissioners: Commissioner[] = [];


//  this one is collapsed for commissionerate
  toggleCommissionerCollapse(commissionerCode: string) {
    this.currentlyOpenCommissionerId = 
      this.currentlyOpenCommissionerId === commissionerCode ? null : commissionerCode;
  }
  // this one is collapased for division
  toggleDivisionCollapse(divisionCode: string) {
    this.currentlyOpenDivisionId = 
      this.currentlyOpenDivisionId === divisionCode ? null : divisionCode;
  }
// this one is collpased for circle
  toggleCircleCollapse(circleCode: string) {

    this.currentlyOpenCircleId = 
      this.currentlyOpenCircleId === circleCode ? null : circleCode;

  }
  


  constructor(private commissionerateService: CommissionerateService) { }

  ngOnInit(): void {

    this.getCommissionerateList();

    // this.commissioners = [
    //   {
    //     id: 125,
    //     name: 'Commissionerate #1',
    //     description: 'Large Taxpayer Unit - VAT',
    //     division: [
    //       {
    //         id: 101,
    //         name: 'Division #1',
    //         circle: [
    //           {
    //             id: 1001,
    //             name: 'Circle #1',
    //             taxpayer: [
    //               { id: 10001, name: 'Taxpayer #1' },
    //               { id: 10002, name: 'Taxpayer #2' },
    //               { id: 10003, name: 'Taxpayer #3' }
    //             ]
    //           },
    //           {
    //             id: 1002,
    //             name: 'Circle #2',
    //             taxpayer: [
    //               { id: 10004, name: 'Taxpayer #4' },
    //               { id: 10005, name: 'Taxpayer #5' },
    //               { id: 10006, name: 'Taxpayer #6' }
    //             ]
    //           },
    //           {
    //             id: 1003,
    //             name: 'Circle #3',
    //             taxpayer: [
    //               { id: 10007, name: 'Taxpayer #7' },
    //               { id: 10008, name: 'Taxpayer #8' },
    //               { id: 10009, name: 'Taxpayer #9' }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         id: 102,
    //         name: 'Division #2',
    //         circle: [
    //           {
    //             id: 1004,
    //             name: 'Circle #4',
    //             taxpayer: [
    //               { id: 10010, name: 'Taxpayer #10' },
    //               { id: 10011, name: 'Taxpayer #11' },
    //               { id: 10012, name: 'Taxpayer #12' }
    //             ]
    //           },
    //           {
    //             id: 1005,
    //             name: 'Circle #5',
    //             taxpayer: [
    //               { id: 10013, name: 'Taxpayer #13' },
    //               { id: 10014, name: 'Taxpayer #14' },
    //               { id: 10015, name: 'Taxpayer #15' }
    //             ]
    //           },
    //           {
    //             id: 1006,
    //             name: 'Circle #6',
    //             taxpayer: [
    //               { id: 10016, name: 'Taxpayer #16' },
    //               { id: 10017, name: 'Taxpayer #17' },
    //               { id: 10018, name: 'Taxpayer #18' }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         id: 103,
    //         name: 'Division #3',
    //         circle: [
    //           {
    //             id: 1007,
    //             name: 'Circle #7',
    //             taxpayer: [
    //               { id: 10019, name: 'Taxpayer #19' },
    //               { id: 10020, name: 'Taxpayer #20' },
    //               { id: 10021, name: 'Taxpayer #21' }
    //             ]
    //           },
    //           {
    //             id: 1008,
    //             name: 'Circle #8',
    //             taxpayer: [
    //               { id: 10022, name: 'Taxpayer #22' },
    //               { id: 10023, name: 'Taxpayer #23' },
    //               { id: 10024, name: 'Taxpayer #24' }
    //             ]
    //           },
    //           {
    //             id: 1009,
    //             name: 'Circle #9',
    //             taxpayer: [
    //               { id: 10025, name: 'Taxpayer #25' },
    //               { id: 10026, name: 'Taxpayer #26' },
    //               { id: 10027, name: 'Taxpayer #27' }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   },
    
     
    //   {
    //     id: 3,
    //     name: 'Commissionerate #3',
    //     description: 'Customs, Excise, and VAT Commissionerate, Dhaka (South)',
    //     division: [
    //       {
    //         "id": 301,
    //         "name": "Division #5",
    //         "circle": [
    //           {
    //             "id": 30101,
    //             "name": "Circle #13",
    //             "taxpayer": [
    //               { "id": 3010101, "name": "Taxpayer #37" },
    //               { "id": 3010102, "name": "Taxpayer #38" },
    //               { "id": 3010103, "name": "Taxpayer #39" }
    //             ]
    //           },
    //           {
    //             "id": 30102,
    //             "name": "Circle #14",
    //             "taxpayer": [
    //               { "id": 3010201, "name": "Taxpayer #40" },
    //               { "id": 3010202, "name": "Taxpayer #41" },
    //               { "id": 3010203, "name": "Taxpayer #42" }
    //             ]
    //           },
    //           {
    //             "id": 30103,
    //             "name": "Circle #15",
    //             "taxpayer": [
    //               { "id": 3010301, "name": "Taxpayer #43" },
    //               { "id": 3010302, "name": "Taxpayer #44" },
    //               { "id": 3010303, "name": "Taxpayer #45" }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "id": 302,
    //         "name": "Division #6",
    //         "circle": [
    //           {
    //             "id": 30201,
    //             "name": "Circle #16",
    //             "taxpayer": [
    //               { "id": 3020101, "name": "Taxpayer #46" },
    //               { "id": 3020102, "name": "Taxpayer #47" },
    //               { "id": 3020103, "name": "Taxpayer #48" }
    //             ]
    //           },
    //           {
    //             "id": 30202,
    //             "name": "Circle #17",
    //             "taxpayer": [
    //               { "id": 3020201, "name": "Taxpayer #49" },
    //               { "id": 3020202, "name": "Taxpayer #50" },
    //               { "id": 3020203, "name": "Taxpayer #51" }
    //             ]
    //           },
    //           {
    //             "id": 30203,
    //             "name": "Circle #18",
    //             "taxpayer": [
    //               { "id": 3020301, "name": "Taxpayer #52" },
    //               { "id": 3020302, "name": "Taxpayer #53" },
    //               { "id": 3020303, "name": "Taxpayer #54" }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
        
    //   }
    // ];
    
   
  }


//  this one is for get all commissionerateList
  public getCommissionerateList(){
   
    this.commissionerateService.getCommissionerates().subscribe(res => {
  
        if (res.status === 200) {
            this.commissionerateList = res.body
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
// this one is for get all divisionList
  public getDivisionList(commisionarateID: string){
    console.log("Calling ");
    
    // this.isLoading = true;
    this.commissionerateService.getDivisions(commisionarateID).subscribe(res => {
        if (res.status === 200) {
          this.divisionList = res.body;
          // setTimeout(()=>{this.isLoading = false;}, 2000);
          return;
        }
        // setTimeout(()=>{this.isLoading = false;}, 2000);
        
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
            this.divisionList = [];
            return;
          }
          if(err.status ===500){
            // this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
            this.divisionList = [];
            return;
          }
          if (err.error && err.error.message) {
            this.divisionList = [];
              // this.messageService.add({severity: 'error', summary: 'Data not found', detail: ''});
          }
    },
    () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
    });
  }
// this one is for get all circleList
  public getCircleList( divisionOid: string, commissionerateOid: string){
    this.commissionerateService.getCircles(divisionOid,commissionerateOid).subscribe(res => {
      if (res.status === 200) {
        this.circleList = res.body;
        // setTimeout(()=>{this.isLoading = false;}, 2000);
        return;
      }
      // setTimeout(()=>{this.isLoading = false;}, 2000);
    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.circleList = [];
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
// this one is for get all taxpayerList
  public getTaxPayerList(circleOid:string, divisionOid:string, commissionerateOid:string){
    this.commissionerateService.getTaxPayers(circleOid, divisionOid, commissionerateOid).subscribe(res => {
       
      if (res.status === 200) {
        this.taxPayerList = res.body;
        // setTimeout(()=>{this.isLoading = false;}, 2000);
        return;
      }
      // setTimeout(()=>{this.isLoading = false;}, 2000);


    },
    err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
            this.circleList = [];
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




}
