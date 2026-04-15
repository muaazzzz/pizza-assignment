import { Injectable, inject } from '@angular/core';
import {
  type CartPizza,
  type OfferDefinition,
  type OrderPricingResult,
  type PizzaCostBreakdown,
  PizzaPricingService,
  type PizzaSizeName,
} from './pizza-pricing.service';

@Injectable({
  providedIn: 'root',
})
export class OrderFlowService {
  private readonly pricingService = inject(PizzaPricingService);

  readonly sizes = this.pricingService.sizes;
  readonly toppings = this.pricingService.toppings;
  readonly offers: OfferDefinition[] = this.pricingService.offerDefinitions;

  selectedSizeName: PizzaSizeName = 'Small';
  selectedToppingNames: string[] = [];

  private nextPizzaId = 1;
  private cartState: CartPizza[] = [];

  get cart(): CartPizza[] {
    return this.cartState;
  }

  setSize(sizeName: PizzaSizeName): void {
    this.selectedSizeName = sizeName;
  }

  toggleTopping(toppingName: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedToppingNames.includes(toppingName)) {
        this.selectedToppingNames = [...this.selectedToppingNames, toppingName];
      }
      return;
    }

    this.selectedToppingNames = this.selectedToppingNames.filter((name) => name !== toppingName);
  }

  isToppingSelected(toppingName: string): boolean {
    return this.selectedToppingNames.includes(toppingName);
  }

  addCurrentPizzaToCart(): void {
    const pizzaToAdd: CartPizza = {
      id: this.nextPizzaId,
      sizeName: this.selectedSizeName,
      toppingNames: [...this.selectedToppingNames],
    };

    this.cartState = [...this.cartState, pizzaToAdd];
    this.nextPizzaId += 1;

    // Keep the selected size but clear toppings so the next pizza can be built quickly.
    this.selectedToppingNames = [];
  }

  removePizzaFromCart(id: number): void {
    this.cartState = this.cartState.filter((pizza) => pizza.id !== id);
  }

  clearCart(): void {
    this.cartState = [];
  }

  get previewPizza(): PizzaCostBreakdown {
    return this.pricingService.calculateSinglePizza(
      this.selectedSizeName,
      this.selectedToppingNames,
    );
  }

  get orderPricing(): OrderPricingResult {
    return this.pricingService.calculateOrder(this.cartState);
  }
}
