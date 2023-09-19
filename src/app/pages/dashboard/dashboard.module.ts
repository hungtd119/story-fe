import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  imports: [DashboardRoutingModule, NzLayoutModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
