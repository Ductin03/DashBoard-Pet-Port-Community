// angular import
import { Component, inject } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public props
  title = 'Portal Community Pet';
  private iconServices=inject(IconService)
  ngOnInit() {
    this.iconServices.addIcon(...[
      EditOutline
    ])
  }
}
