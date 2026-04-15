import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderFlowService } from '../../services/order-flow.service';

@Component({
  selector: 'app-toppings-page',
  imports: [RouterLink],
  templateUrl: './toppings-page.component.html',
  styleUrl: './toppings-page.component.css',
})
export class ToppingsPageComponent {
  private readonly orderFlow = inject(OrderFlowService);

  get toppings() {
    return this.orderFlow.toppings;
  }

  get selectedSizeName() {
    return this.orderFlow.selectedSizeName;
  }

  get previewPizza() {
    return this.orderFlow.previewPizza;
  }

  toggleTopping(toppingName: string, isChecked: boolean): void {
    this.orderFlow.toggleTopping(toppingName, isChecked);
  }

  isToppingSelected(toppingName: string): boolean {
    return this.orderFlow.isToppingSelected(toppingName);
  }

  addCurrentPizzaToCart(): void {
    this.orderFlow.addCurrentPizzaToCart();
  }
}
