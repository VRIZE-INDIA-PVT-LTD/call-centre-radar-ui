import { Routes } from '@angular/router';
import { AgentPerformance } from './pages/agent-performance/agent-performance';
import { AttentionQueue } from './pages/attention-queue/attention-queue';
import { CallDetail } from './pages/call-detail/call-detail';
import { CustomerDetail } from './pages/customer-detail/customer-detail';
import { Customers } from './pages/customers/customers';
import { Dashboard } from './pages/dashboard/dashboard';
import { Upload } from './pages/upload/upload';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: 'dashboard', component: Dashboard },
	{ path: 'customers', component: Customers },
	{ path: 'customers/:customerId', redirectTo: 'users/customer/:customerId' },
	{ path: 'agents/:agentId', redirectTo: 'users/agent/:agentId' },
	{ path: 'users/:userType/:userId', component: CustomerDetail },
	{ path: 'calls/:callId', component: CallDetail },
	{ path: 'attention', component: AttentionQueue },
	{ path: 'agents', component: AgentPerformance },
	{ path: 'upload', component: Upload },
	{ path: '**', redirectTo: 'dashboard' },
];
