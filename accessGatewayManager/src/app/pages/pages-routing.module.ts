import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLogComponent } from '@app/pages/access-log/access-log.component';
import { GatewayAccessComponent } from '@app/pages/gateway-access/gateway-access.component';
import { PagesComponent } from '@app/pages/pages.component';
import { PagesGuard } from '@app/pages/pages.guard';

const routes: Routes = [
  {
    path: 'acgm',
    component: PagesComponent,
    canActivate: [PagesGuard],
    children: [
      { path: 'gateway-access', component: GatewayAccessComponent },
      { path: 'access-log', component: AccessLogComponent },
    ],
  },
  { path: '**', component: PagesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
