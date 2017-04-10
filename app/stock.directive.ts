import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[msStock]'
})
export class StockDirective {
    myStock = 0;
  @HostBinding('class.out-of-stock') isOutOfStock = false;

  @HostBinding('class.need-order') isNeedOrder = false;

  @HostBinding('class.save') isSave = false;
  
  @Input() set msStock(value) {
    this.myStock = value;
    this.checkStock(this.myStock);
  }

  private checkStock(stock)
  {
    if (this.myStock===0)
    {
        this.isOutOfStock = true;
        this.isNeedOrder = false;
        this.isSave = false;
    }else if (this.myStock <= 10)
    {
        this.isOutOfStock = false;
        this.isNeedOrder = true;
        this.isSave = false;
    }else
    {
        this.isOutOfStock = false;
        this.isNeedOrder = false;
        this.isSave = true;
    }
  }
}
