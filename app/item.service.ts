import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http: Http) {}
  get(category, stockStatus) {
    let searchParams = new URLSearchParams();
    if (category === '')
    {
        category = 'all';
    }
    if (stockStatus === '')
    {
        stockStatus = 'all';
    }
    searchParams.append('category', category);
    searchParams.append('stockstatus', stockStatus);
    return this.http.get('items', { search: searchParams })
      .map(response => {
        return response.json().items;
      });
  }

  getReport() {
    return this.http.get('report')
      .map(response => {
        return response.json().reports;
      });
  }
  
  add(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }

  addStock(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }
  reduceStock(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }
  
  delete(deleteItem) {
    return this.http.delete(`items/${deleteItem.id}`)
      .map(response => {});
  }
}
