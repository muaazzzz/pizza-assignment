# pizza-assignment
# Simple Pizza Ordering System in Angular

This document combines the assignment brief, a macOS setup guide for Angular, and a practical tutorial for building the pizza ordering app described in the source file.

## 1. Assignment Brief

The project is a pizza ordering system built with Angular. The app should let a user:

- Select pizza size.
- Choose toppings.
- Apply promotional offers.
- See pricing update dynamically as selections change.
- Review the order in a cart or summary page.

### Pizza Sizes

- Small - $5
- Medium - $7
- Large - $8
- Extra Large - $9

### Toppings

#### Veg Options

- Tomatoes - $1.00
- Onions - $0.50
- Bell pepper - $1.00
- Mushrooms - $1.20
- Pineapple - $0.75

#### Non Veg Options

- Sausage - $1.00
- Pepperoni - $2.00
- Barbecue chicken - $3.00

### Promotional Offers

- Offer 1: 1 Medium pizza with 2 toppings = $5
- Offer 2: 2 Medium pizzas with 4 toppings each = $9
- Offer 3: 1 Large pizza with 4 toppings, where Pepperoni and Barbecue chicken count as 2 toppings, gets 50% discount

### Delivery Expectations

- Build the application in Angular.
- Include a feature-rich user interface.
- Keep price calculations dynamic.
- Record a demo showing size selection, topping selection, offer application, and live price updates.
- Push the source code to GitHub, GitLab, or another source control platform, or share the source directly.

---

## 2. Angular Setup on macOS

If you have never used Angular before, install the following first:

### 2.1 Install Homebrew

Homebrew is the easiest way to install developer tools on macOS.

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, Homebrew will usually tell you if it needs to be added to your shell profile.

### 2.2 Install Node.js and npm

Angular runs on Node.js. npm comes with Node.

Install Node with Homebrew:

```bash
brew install node
```

Verify the installation:

```bash
node -v
npm -v
```

If you already have Node installed, make sure it is reasonably up to date. Angular works best with a current LTS version.

### 2.3 Install the Angular CLI

The Angular CLI creates and manages Angular projects.

Install it globally:

```bash
npm install -g @angular/cli
```

Check that it is available:

```bash
ng version
```

### 2.4 Install an Editor

Visual Studio Code is the most common choice.

Recommended extensions:

- Angular Language Service
- ESLint
- Prettier - Code formatter

### 2.5 Create a New Angular Project

Go to the folder where you want the project and run:

```bash
ng new pizza-ordering-system
```

The CLI may ask questions such as:

- Would you like to add routing? Choose Yes.
- Which stylesheet format? Choose CSS, SCSS, or your preferred option.

Then move into the project folder:

```bash
cd pizza-ordering-system
```

### 2.6 Run the App

Start the development server:

```bash
ng serve
```

Open the browser at:

```text
http://localhost:4200
```

If you want the app to open automatically:

```bash
ng serve --open
```

### 2.7 Useful Angular CLI Commands

- `ng generate component component-name` creates a component.
- `ng generate service service-name` creates a service.
- `ng generate module module-name` creates a module.
- `ng build` creates a production build.
- `ng test` runs unit tests.
- `ng lint` checks code quality if linting is configured.

### 2.8 Common macOS Troubleshooting

If `ng` is not recognized, restart Terminal or make sure npm global binaries are in your `PATH`.

If Angular CLI installation fails, update npm first:

```bash
npm install -g npm
```

If port 4200 is busy, run Angular on another port:

```bash
ng serve --port 4300
```

---

## 3. What Angular Is

Angular is a TypeScript-based front-end framework for building web applications. It helps you create applications with:

- Reusable components.
- Declarative templates.
- Data binding.
- Dependency injection.
- Routing.
- Reactive or template-driven forms.

Angular is a good fit for the pizza ordering system because the UI has multiple interactive parts: size selection, topping selection, offers, and live order totals.

---

## 4. Angular Project Structure

When you create a new Angular app, you will usually see:

- `src/app/` for application code.
- `src/app/app.component.*` for the root component.
- `src/index.html` as the host page.
- `src/main.ts` as the bootstrap entry point.
- `angular.json` for build and workspace configuration.
- `package.json` for dependencies and scripts.

For a pizza ordering app, a practical structure could be:

- `app/components/pizza-configurator`
- `app/components/cart-summary`
- `app/components/offer-selector`
- `app/services/pizza-pricing.service`
- `app/models/pizza.model.ts`

---

## 5. Core Angular Concepts

### 5.1 Components

Components are the building blocks of Angular UI. Each component usually has:

- A TypeScript class.
- An HTML template.
- Optional CSS or SCSS styles.

Example responsibilities in this project:

- A pizza size selector component.
- A toppings selector component.
- A cart or summary component.
- An order total component.

### 5.2 Templates and Data Binding

Angular templates connect the UI to component data.

Common binding styles:

- Interpolation: `{{ totalPrice }}`
- Property binding: `[disabled]="isInvalid"`
- Event binding: `(click)="addTopping(topping)"`
- Two-way binding: `[(ngModel)]="selectedSize"`

### 5.3 Directives

Directives change how the DOM behaves.

- `*ngIf` shows or hides content.
- `*ngFor` repeats content in a list.
- `ngClass` adds CSS classes dynamically.

Example use in this app:

- Show discount text only if an offer applies.
- Render the list of toppings dynamically.

### 5.4 Services

Services hold reusable logic and business rules. For this project, a service should calculate:

- Base pizza price.
- Topping totals.
- Offer discounts.
- Final price.

This keeps pricing logic out of the UI components.

### 5.5 Routing

Routing lets the app show different pages such as:

- Home
- Build Pizza
- Cart
- Checkout Summary

For a beginner project, you can keep everything on one page first, then add routing later if needed.

### 5.6 Forms

Angular supports two main form styles:

- Template-driven forms for simpler UIs.
- Reactive forms for more complex and scalable forms.

The pizza ordering app can work with either approach. If you expect more validation and dynamic rules, reactive forms are usually better.

---

## 6. Building the Pizza Ordering App

### 6.1 Recommended App Flow

1. User selects a pizza size.
2. User selects one or more toppings.
3. The app calculates the subtotal.
4. The app checks whether any offer applies.
5. The app shows the final total and discount.
6. The user reviews the cart before submission.

### 6.2 Suggested Data Models

You can represent the menu as structured data:

- Pizza sizes with base prices.
- Toppings with prices and category.
- Offers with matching rules.

Example model ideas:

- `PizzaSize` with `name` and `price`
- `Topping` with `name`, `price`, and `countWeight`
- `Offer` with `name`, `description`, and `apply(order)` logic

### 6.3 Pricing Logic

The pricing system should calculate:

1. Base size price.
2. Total topping price.
3. Offer-based discount.
4. Final payable amount.

Important point for Offer 3:

- Pepperoni and Barbecue chicken count as 2 toppings each for the rule.

That means the app needs a weight or count rule for toppings, not just a price.

### 6.4 Dynamic Updates

Whenever the user changes a size or topping, the app should recompute:

- Subtotal
- Discount
- Grand total

This is one of Angular’s strengths because the UI can update instantly when the component state changes.

### 6.5 UI Layout Ideas

A clean beginner-friendly layout could include:

- Left panel: pizza size and toppings selection.
- Right panel: cart summary and offer details.
- Bottom section: pricing breakdown and checkout button.

---

## 7. Angular Tutorial for Beginners

### 7.1 Create Your First Component

Generate a component:

```bash
ng generate component components/pizza-builder
```

The component will usually include:

- `pizza-builder.component.ts`
- `pizza-builder.component.html`
- `pizza-builder.component.css`

Inside the TypeScript file, you define the data and methods the template will use.

### 7.2 Displaying Data

In the template, use interpolation to show values:

```html
<p>Total: {{ totalPrice }}</p>
```

### 7.3 Handling User Clicks

Use event binding to respond to clicks:

```html
<button (click)="selectSize('Medium')">Medium</button>
```

### 7.4 Showing Lists

Use `*ngFor` to render toppings:

```html
<li *ngFor="let topping of toppings">
  {{ topping.name }} - {{ topping.price }}
</li>
```

### 7.5 Conditional Display

Use `*ngIf` to show discounts only when needed:

```html
<p *ngIf="discount > 0">Discount applied: {{ discount }}</p>
```

### 7.6 Keeping State in Components

Component state is just the data stored in the class, such as:

- Selected size
- Selected toppings
- Subtotal
- Discount
- Final total

As the state changes, Angular updates the template.

### 7.7 Component Communication

If your app has multiple components, you may need to pass data between them.

Common patterns:

- Parent to child with `@Input()`
- Child to parent with `@Output()` and `EventEmitter`
- Shared state with a service

For the pizza app, a service is often the simplest way to share order state.

### 7.8 Services and Dependency Injection

Inject a service into a component when you need shared logic:

```ts
constructor(private pizzaPricingService: PizzaPricingService) {}
```

This keeps your UI components smaller and easier to manage.

### 7.9 Forms for Order Input

If you want user details such as name, address, or phone number, use forms.

For example, a checkout form might collect:

- Customer name
- Delivery address
- Contact number
- Special instructions

### 7.10 Routing in Practice

If you enable routing, you can create pages like:

- `/home`
- `/build`
- `/cart`
- `/checkout`

This makes the application feel more complete and easier to demo.

---

## 8. Suggested Implementation Plan

### Step 1: Set Up the Project

- Install Node.js.
- Install Angular CLI.
- Create the project.
- Run the app locally.

### Step 2: Build the Menu Data

- Add pizza sizes.
- Add toppings.
- Add promotional offers.

### Step 3: Build the UI

- Create size selection controls.
- Create topping selection controls.
- Create a cart summary panel.

### Step 4: Add Pricing Logic

- Calculate base price.
- Add topping totals.
- Apply offers.
- Update totals live.

### Step 5: Polish the Experience

- Show selected items clearly.
- Highlight active offers.
- Make the layout responsive.

### Step 6: Demo and Deliver

- Test the app with different combinations.
- Record a screen demo.
- Push to source control.

---

## 9. Example Pricing Scenarios

### Scenario 1

- Medium pizza = $7
- Two toppings = $1.50 to $4.00 depending on choices
- Offer 1 may reduce the final price to $5 if the conditions are met

### Scenario 2

- Two medium pizzas with four toppings each
- Offer 2 sets the total to $9 when the rule matches

### Scenario 3

- One large pizza with four toppings
- Pepperoni and Barbecue chicken count as two toppings each
- If the rule matches, apply 50% discount

The exact way you encode offers is up to you, but the application should always make the calculation transparent to the user.

---

## 10. Beginner Notes

If Angular feels unfamiliar at first, focus on this order:

1. Learn components.
2. Learn templates and bindings.
3. Learn lists and conditions.
4. Learn services.
5. Learn forms and routing.

That sequence is enough to build a strong first Angular project.

---

## 11. Quick Command Reference

```bash
brew install node
npm install -g @angular/cli
ng new pizza-ordering-system
cd pizza-ordering-system
ng serve --open
```

---

## 12. Final Checklist

- Angular project runs on macOS.
- Pizza size selection works.
- Toppings selection works.
- Offers apply correctly.
- Prices update dynamically.
- UI is easy to understand.
- Demo video shows the full flow.
- Source code is pushed to a repository.
