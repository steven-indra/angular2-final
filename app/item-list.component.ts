import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ItemService } from './item.service';

@Component({
  selector: 'ms-item-list',
  templateUrl: 'app/item-list.component.html',
  styleUrls: ['app/item-list.component.css']
})
export class ItemListComponent {
  category = '';
  stockStatus = '';
  items;
  paramsSubscription;

  constructor(private itemService:ItemService,
  private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let path = params['path'];
        let category = path.split('&')[0];
        let stockStatus = path.split('&')[1];
        if (stockStatus == '')
        {
            stockStatus = this.stockStatus;
        }
        if (category == '')
        {
            category = this.category;
        }        
        this.getItems(category, stockStatus);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onItemDelete(item) {
    this.itemService.delete(item)
      .subscribe(() => {
        this.getItems(this.category, this.stockStatus);
      });
  }

  getItems(category, stockStatus) {
    this.category = category;
    this.stockStatus = stockStatus;
    this.itemService.get(category, stockStatus)
      .subscribe(items => {
        this.items = items;
      });
  }
}
