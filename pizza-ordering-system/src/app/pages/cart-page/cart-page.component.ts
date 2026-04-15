import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderFlowService } from '../../services/order-flow.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  private readonly orderFlow = inject(OrderFlowService);

  get offers() {
    return this.orderFlow.offers;
  }

  get cartPizzas() {
    return this.orderFlow.orderPricing.pizzas;
  }

  get orderSubtotal(): number {
    return this.orderFlow.orderPricing.subtotal;
  }

  get orderDiscount(): number {
    return this.orderFlow.orderPricing.totalDiscount;
  }

  get orderTotal(): number {
    return this.orderFlow.orderPricing.total;
  }

  get appliedOffers() {
    return this.orderFlow.orderPricing.appliedOffers;
  }

  removePizzaFromCart(id: number): void {
    this.orderFlow.removePizzaFromCart(id);
  }

  clearCart(): void {
    this.orderFlow.clearCart();
  }
}
