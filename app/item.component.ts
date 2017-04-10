import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './item.service'

@Component({
    selector: 'ms-item',
    templateUrl: 'app/item.component.html',
    styleUrls: ['app/item.component.css']
})
export class ItemComponent {
    @Input() item;
    @Output() delete = new EventEmitter();

    constructor(private itemService: ItemService,
        private router: Router) { }

    onDelete() {
        this.delete.emit(this.item);
    }

    addStock() {
        this.item.stock += 1;
        this.itemService.addStock(this.item)
            .subscribe(() => {
                this.router.navigate(['/', 'all&all']);
            });
    }
    reduceStock() {
        if (this.item.stock > 0) {
            this.item.stock -= 1;
            this.itemService.reduceStock(this.item)
                .subscribe(() => {
                    this.router.navigate(['/', 'all&all']);
                });
        }

    }
}
