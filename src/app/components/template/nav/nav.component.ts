import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers:[AuthService]
})
export class NavComponent {
  showMenu: boolean = false;
  showSubMenu: boolean = false;
  admin: boolean = false;

  
  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.isAdmin();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.showMenuEmmiter.subscribe(
      show => this.showMenu = show
    )
  }

  toggleSubMenu() {
    this.showSubMenu = !this.showSubMenu;
  }

  isAdmin(){
    this.admin = this.authService.isAdmin();
      
  }

}
