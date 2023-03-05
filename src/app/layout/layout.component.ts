import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../auth/services/auth.service';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public menuItems: MenuItem[] = [
    {
      title: 'Lista twoich wydarzeń',
      icon: 'home',
      link: '/event',
      color: '#ff7f0e',
    },
    {
      title: 'Dodaj nowe wydarzenie',
      icon: 'home',
      link: '/event/add',
      color: '#ff7f0e',
    },
    {
      title: 'Dołącz do wydarzenia',
      icon: 'home',
      link: '/event/join',
      color: '#ff7f0e',
    },
    {
      title: 'Dodaj koszty',
      icon: 'home',
      link: '/event/cost',
      color: '#ff7f0e',
    }
  ];

  public opened = true;

  public constructor(public deviceService: DeviceDetectorService) { }

  public ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.opened = false;
    }
  }

  public toggle(): void {
    this.opened = !this.opened;
  }

  public addItem(): void {
    if (this.deviceService.isMobile()) {
      this.opened = false;
    }
  }
}
