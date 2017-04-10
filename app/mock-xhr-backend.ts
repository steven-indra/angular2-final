import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf("report") >= 0) {
            var myReports = this.reports;
            responseOptions = new ResponseOptions({
              body: { reports: JSON.parse(JSON.stringify(myReports)) },
              status: 200
            });
          } else {
            var category = new RegExp('[\\?&]category=([^&#]*)').exec(request.url);
            var stockStatus = new RegExp('[\\?&]stockstatus=([^&#]*)').exec(request.url);
            var myItems;
            if (category[1] === 'all') {
              category[1] = '';
              if (stockStatus[1] === 'all') {
                myItems = this.items.filter(item => item.category.includes(category[1]));
              } else if (stockStatus[1] === 'out-of-order') {
                myItems = this.items.filter(item => item.stock === 0 && item.category.toLowerCase().includes(category[1]));
              } else if (stockStatus[1] === 'need-order') {
                myItems = this.items.filter(item => item.stock <= 10 && item.category.toLowerCase().includes(category[1]));
              } else {
                myItems = this.items.filter(item => item.stock > 10 && item.category.toLowerCase().includes(category[1]));
              }
            } else {
              if (stockStatus[1] === 'all') {
                myItems = this.items.filter(item => item.category.toLowerCase().includes(category[1]));
              } else if (stockStatus[1] === 'out-of-order') {
                myItems = this.items.filter(item => item.stock === 0 && item.category.toLowerCase().includes(category[1]));
              } else if (stockStatus[1] === 'need-order') {
                myItems = this.items.filter(item => item.stock <= 10 && item.category.toLowerCase().includes(category[1]));
              } else {
                myItems = this.items.filter(item => item.stock > 10 && item.category.toLowerCase().includes(category[1]));
              }
            }
            responseOptions = new ResponseOptions({
              body: { items: JSON.parse(JSON.stringify(myItems)) },
              status: 200
            });
          }


          break;
        case RequestMethod.Post:
          var item = JSON.parse(request.text().toString());
          if (item.id > 0) {
            var myItem = this.items.find(myItem => myItem.id === item.id);
            var index = this.items.indexOf(myItem);
            this.items[index].stock = item.stock;
            this.reports.push({date: new Date(), description: `mengubah stock item dengan nama ${item.name}`});
          } else {
            item.id = this._getNewId();
            this.items.push(item);
            this.reports.push({date: new Date(), description: `menambah item baru dengan nama ${item.name}`});
          }

          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteItem(id) {
    var item = this.items.find(item => item.id === id);
    var index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.reports.push({date: new Date(), description: `menghapus item dengan nama ${item.name} dan id ${item.id}`});
    }
  }

  _getNewId() {
    if (this.items.length > 0) {
      return Math.max.apply(Math, this.items.map(item => item.id)) + 1;
    }
  }

  reports = [];

  items = [
    {
      id: 1,
      name: "Cucumber",
      category: "Vegetables",
      stock: 10
    },
    {
      id: 2,
      name: "Watermelon",
      category: "Fruits",
      stock: 0
    }, {
      id: 3,
      name: "Oranges",
      category: "Fruits",
      stock: 5
    }, {
      id: 4,
      name: "Eggplant",
      category: "Vegetables",
      stock: 20
    }, {
      id: 5,
      name: "Banana",
      category: "Fruits",
      stock: 20
    }
  ];
}