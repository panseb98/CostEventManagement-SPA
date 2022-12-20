import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {
  @Input() menu: MenuItem[];

  constructor() {
    this.menu = [];
   }

  ngOnInit(): void {
  }

}
