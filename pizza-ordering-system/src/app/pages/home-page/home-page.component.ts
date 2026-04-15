import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderFlowService } from '../../services/order-flow.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private readonly orderFlow = inject(OrderFlowService);

  get sizes() {
    return this.orderFlow.sizes;
  }

  get selectedSizeName() {
    return this.orderFlow.selectedSizeName;
  }

  setSize(sizeName: (typeof this.sizes)[number]['name']): void {
    this.orderFlow.setSize(sizeName);
  }
}
