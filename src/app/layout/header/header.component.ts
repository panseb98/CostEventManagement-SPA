import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<boolean>();
  constructor(private authService: AuthService) {}
  async ngOnInit(): Promise<void> {
    const res = this.authService.getUsername();
    console.log(res);
  }

  user: string = 'Enea';
  
  // constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}
