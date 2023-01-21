import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventDTO } from '../../models/EventDTO';
import { EventClientService } from '../../services/event-client.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export function isMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) &&
    'ontouchstart' in window
  );
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen asd asda sdasd asd asd', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  public isMobile = isMobile();
  displayedColumns: string[] = ['position', 'name', 'code', 'defaultCurrencyCode', 'balance', 'actions'];
 // dataSource = new Array<EventDTO>();
  dataSource = new MatTableDataSource<EventDTO>();

  constructor(private _eventService: EventClientService) {
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this._eventService.getEvents();
    console.log(this.dataSource);

  }
  public redirectToEvent(id: number) {
    
  }
}
