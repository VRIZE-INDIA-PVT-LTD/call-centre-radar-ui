import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink],
  selector: 'app-customers',
  styleUrl: './customers.scss',
  templateUrl: './customers.html',
})
export class Customers {
  private readonly store = inject(CallRadarStore);

  readonly rows = this.store.customers.map((customer) => {
    const calls = this.store.getCallsByCustomer(customer.id);
    const unresolved = calls.filter((call) => !call.resolved).length;

    return {
      ...customer,
      calls,
      unresolved,
      latestCall: calls[0],
    };
  });

  formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleString();
  }
}
