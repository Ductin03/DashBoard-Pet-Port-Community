// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from './monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from './income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from './analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from './sales-report-chart/sales-report-chart.component';

// icons
import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { OrderService } from 'src/app/src/services/order.service';
import { error } from 'console';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { SellerService } from 'src/app/src/services/seller.service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MonthlyBarChartComponent,
    IncomeOverviewChartComponent,
    AnalyticsChartComponent,
    SalesReportChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DefaultComponent {
  data:any;
  totalDoctor:any;
  totalSeller:any;
  constructor(private iconService: IconService) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }
  private orderServices=inject(OrderService)
  private doctorService = inject(DoctorService)
  private sellerService = inject(SellerService)
  ngOnInit(){
    this.getOrder()
    this.getTotalDoctor()
    this.getTotalSeller()
  }
  getOrder(){
    this.orderServices.getAllOrder().subscribe({
      next:(res)=>{
        this.data=res.data;
        console.log(this.data);  
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getTotalDoctor(){
    this.doctorService.getTotalDoctor().subscribe({
      next:(res)=>{
        this.totalDoctor=res.data.length
        console.log(this.totalDoctor);   
        this.AnalyticEcommerce[0].amount = this.totalDoctor.toString();     
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  getTotalSeller(){
    this.sellerService.getTotalSeller().subscribe({
      next:(res)=>{
        this.totalSeller=res.data.length
        console.log(this.totalSeller);
        this.AnalyticEcommerce[2].amount = this.totalSeller.toString();     
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  AnalyticEcommerce = [
    {
      title: 'Total Doctors',
      amount: '0'
    },
    {
      title: 'Total Users',
      amount: '0',
    },
    {
      title: 'Total Sales',
      amount: '0'
    }
  ];

}
