
import { Component, Inject, OnInit,  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Fixed typo here
})
export class DashboardComponent implements OnInit {






  currentDate: any;
  

  addDate:any;
  



  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dashboardService: DashboardService,) {}

  ngOnInit(): void {

  
    // Check if the platform is the browser (not SSR)
    this.isBrowser = isPlatformBrowser(this.platformId);




    this.currentDate = new Date();

  
    const futureDate = new Date(this.currentDate);

    futureDate.setDate(this.currentDate.getDate() + 5);
  
    
    this.addDate = futureDate.toISOString().split('T')[0];

this.currentDate = new Date().toISOString().split('T')[0];



  }





  chartType = 'bar';  
  isBrowser: boolean = false;


  chartLabels: string[] = ['Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
  chartData = [
    { 
      data: [20000, 28000, 31000, 10000, 28000], 
      label: '',
      backgroundColor: 'rgba(183, 221, 176)',  // Bar color
      borderRadius: 10,
      hoverBackgroundColor: 'white',
      borderColor: 'rgba(183, 221, 176)',                   
      borderWidth: 2, 
      barThickness: 65,
      

      
    }
  ];
  
 


  chartLabels2: string[] = ['Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
  chartData2 = [
    { 
      data: [18000, 28000, 31000, 8000, 29000, 14000], 
      label: '',
      backgroundColor: 'rgba(160, 213, 204)',  // Bar color
      borderRadius: 10,
     
      hoverBackgroundColor: 'white',
      borderColor: 'rgba(160, 213, 204)',                   
      borderWidth: 2, 
      barThickness: 65,
      
    }
  ];







  





  



  chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (tooltipItem: { raw: { toLocaleString: () => string; }; }) {
            return '₱ ' + tooltipItem.raw.toLocaleString(); // Format tooltip as currency
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background color
        titleFont: { size: 20, weight: 'bold' },
        bodyFont: { size: 14 },
        padding: 10,
        borderColor: 'rgba(255, 255, 255, 0.6)', // Tooltip border color
        borderWidth: 1,
      },
      legend: {
        display: false,  // Hide legend
      },
    },
    scales: {
      x: {
        grid: { drawOnChartArea: false },
        ticks: { font: { size: 16 } },
        // Ensure bars have consistent gap and width
        categoryPercentage: 0.8,  // Adjusts space taken by categories (reduce to add space)
        barPercentage: 1.0,      // Ensures bars take the full space of the category
      },
      y: {
        grid: { drawOnChartArea: false },
        ticks: {
          font: { size: 16 },
          stepSize: 7000,
          min: 7000,
          callback: function (value: { toLocaleString: () => any; }) {
            return value.toLocaleString(); // Format y-axis labels
          },
        },
      },
    },


    animation: {  // Animation configuration for chart drawing
      duration: 1500,  // Duration of the animation in milliseconds
      easing: 'easeInOutQuart',  // Easing function for the animation
    },
  };






  // ---------------------------------------------------------------------
  // backend code
  public dashboardCountList: any = [];
  public totalRecords: number = 0;
  public isProgressBarLoading!: boolean;
  public isLoading: boolean = false;

  private getDashboardCountList() {
    this.dashboardService.getDashboardCount().subscribe(res => {
            if (res.status === 200) {
                this.dashboardCountList = res.body
                // this.temp3 = this.totalRecords
            }
        },
        err => {
            this.isProgressBarLoading = false;
            this.isLoading = false;
            if (err.status === 404) {
                this.totalRecords = 0;
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
