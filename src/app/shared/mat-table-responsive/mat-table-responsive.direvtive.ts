import {
    AfterViewInit,
    Directive,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2
  } from '@angular/core';
  import { BehaviorSubject, combineLatest, map, mapTo, Subject, takeUntil } from 'rxjs';
  
  @Directive({
    selector: '[matTableResponsive]'
  })
  export class MatTableResponsiveDirective
    implements OnInit, AfterViewInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();
  
    private thead: HTMLTableSectionElement | undefined;
    private tbody: HTMLTableSectionElement | undefined;
  
    private theadChanged$ = new BehaviorSubject(true);
    private tbodyChanged$ = new Subject<boolean>();
  
    private theadObserver = new MutationObserver(() =>
      this.theadChanged$.next(true)
    );
    private tbodyObserver = new MutationObserver(() =>
      this.tbodyChanged$.next(true)
    );
  
    public constructor(private table: ElementRef, private renderer: Renderer2) {}
  
    public ngOnInit() {
      this.thead = this.table.nativeElement.querySelector('thead');
      this.tbody = this.table.nativeElement.querySelector('tbody');
  
      this.theadObserver.observe(this.thead as HTMLTableSectionElement, {
        characterData: true,
        subtree: true
      });
      this.tbodyObserver.observe(this.tbody as HTMLTableSectionElement, { childList: true });
    }
  
    public ngAfterViewInit() {
      combineLatest([this.theadChanged$, this.tbodyChanged$])
        .pipe(
          mapTo([(this.thead as HTMLTableSectionElement).rows.item(0), (this.thead as HTMLTableSectionElement).rows]),
          map(
            ([headRow, bodyRows]: any) => [
              [...headRow.children].map(headerCell => headerCell.textContent),
              [...bodyRows].map(row => [...row.children])
            ]
          ),
          takeUntil(this.onDestroy$)
        )
        .subscribe(([columnNames, rows]: any) =>
          rows.forEach((rowCells: any) =>
            rowCells.forEach((cell: any) =>
              this.renderer.setAttribute(
                cell,
                'data-column-name',
                columnNames[cell.cellIndex]
              )
            )
          )
        );
    }
  
    public ngOnDestroy(): void {
      this.theadObserver.disconnect();
      this.tbodyObserver.disconnect();
  
      this.onDestroy$.next(true);
    }
  }