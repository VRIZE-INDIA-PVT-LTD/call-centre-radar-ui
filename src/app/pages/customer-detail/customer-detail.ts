import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Agent, Customer } from '../../models/call-radar.models';
import { CallRadarStore } from '../../services/call-radar.store';

type UserType = 'customer' | 'agent';

@Component({
  imports: [RouterLink],
  selector: 'app-customer-detail',
  styleUrl: './customer-detail.scss',
  templateUrl: './customer-detail.html',
})
export class CustomerDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(CallRadarStore);

  readonly userTypeParam = this.route.snapshot.paramMap.get('userType') ?? '';
  readonly userId = this.route.snapshot.paramMap.get('userId') ?? '';
  readonly userType: UserType | null = this.isUserType(this.userTypeParam) ? this.userTypeParam : null;

  readonly user: Agent | Customer | undefined = this.userType === 'customer'
    ? this.store.getCustomerById(this.userId)
    : this.userType === 'agent'
      ? this.store.getAgentById(this.userId)
      : undefined;

  readonly calls = this.userType === 'customer'
    ? this.store.getCallsByCustomer(this.userId)
    : this.userType === 'agent'
      ? this.store.getCallsByAgent(this.userId)
      : [];

  formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleString();
  }

  counterpartLabel(agentName: string, customerName: string): string {
    return this.userType === 'agent' ? `Customer ${customerName}` : `Agent ${agentName}`;
  }

  private isUserType(value: string): value is UserType {
    return value === 'customer' || value === 'agent';
  }
}
