import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  public menuItems: MenuItem[] = [
    {
      title: 'Lista twoich wydarzeń',
      icon: 'home',
      link: '/sales',
      color: '#ff7f0e',
    },
    {
      title: 'Dodaj nowe wydarzenie',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
    {
      title: 'Dodaj paragon',
      icon: 'home',
      link: '/chart',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Chart',
          icon: 'people',
          color: '#ff7f0e',
          link: '/chart',
        },
      ],
    },
  ];

}
