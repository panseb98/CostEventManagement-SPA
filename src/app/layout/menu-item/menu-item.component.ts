import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() menu: MenuItem[];
  @Output() newItemEvent = new EventEmitter<void>();

  public constructor() {
    this.menu = [];
   }

  public menuChanged(): void {
    this.newItemEvent.emit();
  }

}
