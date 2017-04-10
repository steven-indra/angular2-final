import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from './item.service';
import { lookupListToken } from './providers';

@Component({
  selector: 'ms-item-form',
  templateUrl: 'app/item-form.component.html',
  styleUrls: ['app/item-form.component.css']
})
export class ItemFormComponent {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    @Inject(lookupListToken) public lookupLists,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      category: this.formBuilder.control('Vegetables'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      stock: this.formBuilder.control('',Validators.compose([
        Validators.required,
        this.stockValidator
      ]))
    });
  }

  stockValidator(control) {
    if (control.value.trim().length === 0) {
      return null;
    }
    let stock = parseInt(control.value);
    if (stock > 0) {
      return null;
    } else {
      return {
        'stock': {
          min: 1,
        }
      };
    }
  }

  onSubmit(item) {
    this.itemService.add(item)
      .subscribe(() => {
        this.router.navigate(['/', 'all&all']);
      });
  }
}
