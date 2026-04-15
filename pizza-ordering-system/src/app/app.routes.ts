import { Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToppingsPageComponent } from './pages/toppings-page/toppings-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'toppings', component: ToppingsPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '**', redirectTo: '' },
];
