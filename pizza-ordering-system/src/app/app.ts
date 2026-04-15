import { Component, inject } from '@angular/core';
import {
  type CartPizza,
  type OfferDefinition,
  type OrderPricingResult,
  type PizzaCostBreakdown,
  PizzaPricingService,
  type PizzaSizeName,
} from './services/pizza-pricing.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly pricingService = inject(PizzaPricingService);

  readonly sizes = this.pricingService.sizes;
  readonly toppings = this.pricingService.toppings;
  readonly offers: OfferDefinition[] = this.pricingService.offerDefinitions;

  selectedSizeName: PizzaSizeName = 'Small';
  selectedToppings = new Set<string>();
  cart: CartPizza[] = [];
  nextPizzaId = 1;

  setSize(sizeName: PizzaSizeName): void {
    this.selectedSizeName = sizeName;
  }

  toggleTopping(toppingName: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedToppings.add(toppingName);
      return;
    }

    this.selectedToppings.delete(toppingName);
  }

  isToppingSelected(toppingName: string): boolean {
    return this.selectedToppings.has(toppingName);
  }

  addCurrentPizzaToCart(): void {
    const newPizza: CartPizza = {
      id: this.nextPizzaId,
      sizeName: this.selectedSizeName,
      toppingNames: [...this.selectedToppings],
    };

    this.cart = [...this.cart, newPizza];
    this.nextPizzaId += 1;
  }

  removePizzaFromCart(id: number): void {
    this.cart = this.cart.filter((pizza) => pizza.id !== id);
  }

  clearCart(): void {
    this.cart = [];
  }

  get previewPizza(): PizzaCostBreakdown {
    return this.pricingService.calculateSinglePizza(this.selectedSizeName, [
      ...this.selectedToppings,
    ]);
  }

  get orderPricing(): OrderPricingResult {
    return this.pricingService.calculateOrder(this.cart);
  }

  get cartPizzas(): PizzaCostBreakdown[] {
    return this.orderPricing.pizzas;
  }

  get orderSubtotal(): number {
    return this.orderPricing.subtotal;
  }

  get orderDiscount(): number {
    return this.orderPricing.totalDiscount;
  }

  get orderTotal(): number {
    return this.orderPricing.total;
  }

  get appliedOffers() {
    return this.orderPricing.appliedOffers;
  }
}
