import { Injectable } from '@angular/core';

export type PizzaSizeName = 'Small' | 'Medium' | 'Large' | 'Extra Large';

export type PizzaSize = {
  name: PizzaSizeName;
  price: number;
};

export type Topping = {
  name: string;
  price: number;
  category: 'Veg' | 'Non Veg';
  countWeight: number;
};

export type CartPizza = {
  id: number;
  sizeName: PizzaSizeName;
  toppingNames: string[];
};

export type PizzaCostBreakdown = {
  id: number;
  size: PizzaSize;
  selectedToppings: Topping[];
  basePrice: number;
  toppingsTotal: number;
  subtotal: number;
};

export type AppliedOffer = {
  offerCode: 'Offer 1' | 'Offer 2' | 'Offer 3';
  label: string;
  timesApplied: number;
  discountAmount: number;
};

export type OrderPricingResult = {
  pizzas: PizzaCostBreakdown[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  appliedOffers: AppliedOffer[];
};

export type OfferDefinition = {
  offerCode: 'Offer 1' | 'Offer 2' | 'Offer 3';
  title: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class PizzaPricingService {
  readonly sizes: PizzaSize[] = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 },
  ];

  readonly toppings: Topping[] = [
    { name: 'Tomatoes', price: 1.0, category: 'Veg', countWeight: 1 },
    { name: 'Onions', price: 0.5, category: 'Veg', countWeight: 1 },
    { name: 'Bell Pepper', price: 1.0, category: 'Veg', countWeight: 1 },
    { name: 'Mushrooms', price: 1.2, category: 'Veg', countWeight: 1 },
    { name: 'Pineapple', price: 0.75, category: 'Veg', countWeight: 1 },
    { name: 'Sausage', price: 1.0, category: 'Non Veg', countWeight: 1 },
    { name: 'Pepperoni', price: 2.0, category: 'Non Veg', countWeight: 2 },
    { name: 'Barbecue Chicken', price: 3.0, category: 'Non Veg', countWeight: 2 },
  ];

  readonly offerDefinitions: OfferDefinition[] = [
    {
      offerCode: 'Offer 1',
      title: '1 Medium + 2 toppings = $5',
      description: 'For each Medium pizza with exactly 2 toppings, total price becomes $5.',
    },
    {
      offerCode: 'Offer 2',
      title: '2 Medium + 4 toppings each = $9',
      description:
        'Any pair of Medium pizzas that each have exactly 4 toppings will cost $9 together.',
    },
    {
      offerCode: 'Offer 3',
      title: '1 Large + weighted 4 toppings = 50% off',
      description:
        'For Large pizzas, Pepperoni and Barbecue Chicken count as 2 toppings each for this offer.',
    },
  ];

  calculateSinglePizza(sizeName: PizzaSizeName, toppingNames: string[]): PizzaCostBreakdown {
    const size = this.findSize(sizeName);
    const selectedToppings = this.findToppings(toppingNames);
    const basePrice = size.price;
    const toppingsTotal = this.sumToppingPrices(selectedToppings);
    const subtotal = basePrice + toppingsTotal;

    return {
      id: -1,
      size,
      selectedToppings,
      basePrice,
      toppingsTotal,
      subtotal,
    };
  }

  calculateOrder(cartPizzas: CartPizza[]): OrderPricingResult {
    const pizzaBreakdowns: PizzaCostBreakdown[] = [];

    for (const pizza of cartPizzas) {
      const size = this.findSize(pizza.sizeName);
      const selectedToppings = this.findToppings(pizza.toppingNames);
      const basePrice = size.price;
      const toppingsTotal = this.sumToppingPrices(selectedToppings);
      const subtotal = basePrice + toppingsTotal;

      pizzaBreakdowns.push({
        id: pizza.id,
        size,
        selectedToppings,
        basePrice,
        toppingsTotal,
        subtotal,
      });
    }

    const subtotal = this.sumPizzaSubtotals(pizzaBreakdowns);
    const offer1 = this.calculateOffer1Discount(pizzaBreakdowns);
    const offer2 = this.calculateOffer2Discount(pizzaBreakdowns);
    const offer3 = this.calculateOffer3Discount(pizzaBreakdowns);

    const appliedOffers: AppliedOffer[] = [];

    if (offer1.timesApplied > 0) {
      appliedOffers.push({
        offerCode: 'Offer 1',
        label: '1 Medium + 2 toppings = $5',
        timesApplied: offer1.timesApplied,
        discountAmount: offer1.discountAmount,
      });
    }

    if (offer2.timesApplied > 0) {
      appliedOffers.push({
        offerCode: 'Offer 2',
        label: '2 Medium + 4 toppings each = $9',
        timesApplied: offer2.timesApplied,
        discountAmount: offer2.discountAmount,
      });
    }

    if (offer3.timesApplied > 0) {
      appliedOffers.push({
        offerCode: 'Offer 3',
        label: '1 Large + weighted 4 toppings = 50% off',
        timesApplied: offer3.timesApplied,
        discountAmount: offer3.discountAmount,
      });
    }

    const totalDiscount = offer1.discountAmount + offer2.discountAmount + offer3.discountAmount;
    const total = Math.max(0, subtotal - totalDiscount);

    return {
      pizzas: pizzaBreakdowns,
      subtotal,
      totalDiscount,
      total,
      appliedOffers,
    };
  }

  private findSize(sizeName: PizzaSizeName): PizzaSize {
    return this.sizes.find((size) => size.name === sizeName) ?? this.sizes[0];
  }

  private findToppings(toppingNames: string[]): Topping[] {
    const selected: Topping[] = [];

    for (const toppingName of toppingNames) {
      const topping = this.toppings.find((item) => item.name === toppingName);

      if (topping) {
        selected.push(topping);
      }
    }

    return selected;
  }

  private sumToppingPrices(toppings: Topping[]): number {
    let sum = 0;

    for (const topping of toppings) {
      sum += topping.price;
    }

    return sum;
  }

  private sumPizzaSubtotals(pizzas: PizzaCostBreakdown[]): number {
    let sum = 0;

    for (const pizza of pizzas) {
      sum += pizza.subtotal;
    }

    return sum;
  }

  private calculateOffer1Discount(pizzas: PizzaCostBreakdown[]): {
    timesApplied: number;
    discountAmount: number;
  } {
    let timesApplied = 0;
    let discountAmount = 0;

    for (const pizza of pizzas) {
      const isMedium = pizza.size.name === 'Medium';
      const hasTwoToppings = pizza.selectedToppings.length === 2;

      if (isMedium && hasTwoToppings) {
        timesApplied += 1;
        discountAmount += Math.max(0, pizza.subtotal - 5);
      }
    }

    return { timesApplied, discountAmount };
  }

  private calculateOffer2Discount(pizzas: PizzaCostBreakdown[]): {
    timesApplied: number;
    discountAmount: number;
  } {
    const eligibleMediumPizzas: PizzaCostBreakdown[] = [];

    for (const pizza of pizzas) {
      const isMedium = pizza.size.name === 'Medium';
      const hasFourToppings = pizza.selectedToppings.length === 4;

      if (isMedium && hasFourToppings) {
        eligibleMediumPizzas.push(pizza);
      }
    }

    let timesApplied = 0;
    let discountAmount = 0;

    const sortedBySubtotal = [...eligibleMediumPizzas].sort((a, b) => b.subtotal - a.subtotal);

    for (let index = 0; index + 1 < sortedBySubtotal.length; index += 2) {
      const firstPizza = sortedBySubtotal[index];
      const secondPizza = sortedBySubtotal[index + 1];
      const pairSubtotal = firstPizza.subtotal + secondPizza.subtotal;

      timesApplied += 1;
      discountAmount += Math.max(0, pairSubtotal - 9);
    }

    return { timesApplied, discountAmount };
  }

  private calculateOffer3Discount(pizzas: PizzaCostBreakdown[]): {
    timesApplied: number;
    discountAmount: number;
  } {
    let timesApplied = 0;
    let discountAmount = 0;

    for (const pizza of pizzas) {
      if (pizza.size.name !== 'Large') {
        continue;
      }

      let weightedToppingCount = 0;

      for (const topping of pizza.selectedToppings) {
        weightedToppingCount += topping.countWeight;
      }

      if (weightedToppingCount === 4) {
        timesApplied += 1;
        discountAmount += pizza.subtotal * 0.5;
      }
    }

    return { timesApplied, discountAmount };
  }
}
