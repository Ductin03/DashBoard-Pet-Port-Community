// angular import
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';
import { AuthService } from 'src/app/src/services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/app/src/interceptors/http.interceptor';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule,FormsModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;
  infoUser:any;
  constructor(private iconService: IconService,private route:Router,private authServices:AuthService ) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
  }

  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile'
    },
    {
      icon: 'user',
      title: 'View Profile'
    }
  ];
  ngOnInit(){
    const inforUserFromToken=this.authServices.getUserNameFromToken();
    this.infoUser=inforUserFromToken;
    
  }
  logout(){
    this.authServices.logout().subscribe({
      next:()=>{
        this.route.navigateByUrl("login")
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
 
  


}
