import { Routes, RouterModule } from '@angular/router';

import { ItemFormComponent } from './item-form.component';
import { ItemListComponent } from './item-list.component';
import { ReportItemComponent } from './report-item.component';

const appRoutes: Routes = [
  { path: 'add', component: ItemFormComponent },
  { path: 'report', component: ReportItemComponent },
  { path: ':path', component: ItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all&all' }
];

export const routing = RouterModule.forRoot(appRoutes);
