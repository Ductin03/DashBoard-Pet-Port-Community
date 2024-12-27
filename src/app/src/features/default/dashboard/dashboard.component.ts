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
import { UserService } from 'src/app/src/services/user.service';
import { Router } from '@angular/router';

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
  displayedUsers: any[] = [];
  totalSeller:any;
  totalPetOwner:any;
  limit: number = 5;
  constructor(private iconService: IconService) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }
  private userService=inject(UserService)
  private doctorService = inject(DoctorService)
  private sellerService = inject(SellerService)
  private router = inject(Router)
  ngOnInit(){
    this.getPetOwner()
    this.getTotalDoctor()
    this.getTotalSeller()
  }
  getPetOwner(){
    this.userService.getAllPetowner().subscribe({
      next:(res)=>{
        this.data=res;
        this.totalPetOwner = res.length;
        this.displayedUsers = this.data.slice(0, this.limit);
        this.AnalyticEcommerce[1].amount = this.totalPetOwner.toString();   
        console.log(this.data);  
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  loadMore(){
    this.router.navigateByUrl("admin/pet-owner")
  }
  
  getTotalDoctor(){
    this.doctorService.getTotalDoctor().subscribe({
      next:(res)=>{
        this.totalDoctor=res.data.length
        console.log(this.totalDoctor);   
        this.AnalyticEcommerce[0].amount = this.totalDoctor.toString();     
        console.log(this.displayedUsers);
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
      title: 'Tổng bác sĩ',
      amount: '0'
    },
    {
      title: 'Tổng chủ vật nuôi',
      amount: '0',
    },
    {
      title: 'Tổng cửa hàng',
      amount: '0'
    }
  ];

}
