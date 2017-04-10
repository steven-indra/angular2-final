import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './item.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ms-report-item',
  templateUrl: 'app/report-item.component.html'
})
export class ReportItemComponent {
  reports;
  paramsSubscription;

  constructor(private itemService:ItemService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.paramsSubscription = this.itemService.getReport()
      .subscribe(reports => {
        this.reports = reports;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
