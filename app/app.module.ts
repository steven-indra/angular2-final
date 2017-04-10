import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list.component';
import { StockDirective } from './stock.directive';
import { NameListPipe } from './name-list.pipe';
import { ItemFormComponent } from './item-form.component';
import { ReportItemComponent } from './report-item.component';
import { ItemService } from './item.service';
import { lookupListToken, lookupLists } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    StockDirective,
    NameListPipe,
    ItemFormComponent,
    ReportItemComponent
  ],
  providers: [
    ItemService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}