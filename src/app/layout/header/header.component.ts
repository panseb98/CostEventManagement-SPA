import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public menuToggled = new EventEmitter<boolean>();

  public constructor(private authService: AuthService, public deviceService: DeviceDetectorService) {}
  
  public logout(): void {
    this.authService.logout();
  }
}
