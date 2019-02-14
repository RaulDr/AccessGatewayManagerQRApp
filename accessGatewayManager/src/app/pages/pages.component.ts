import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-pages',
  template: `
  <p-growl [(value)]="msgs"></p-growl>
  <clr-main-container>
  <clr-header class="header-1">
    <div class="branding">
      <clr-icon class="nav-link" shape="cpu"></clr-icon>
      <span class="title">Access Gateway</span>
    </div>
    <div class="header-actions">
      <clr-dropdown>
        <button class="nav-icon" clrDropdownTrigger>
          <clr-icon shape="user"></clr-icon>
          <clr-icon shape="caret down"></clr-icon>
        </button>
        <clr-dropdown-menu *clrIfOpen clrPosition="bottom-right">
          <a (click)="logout()" clrDropdownItem>Log out</a>
        </clr-dropdown-menu>
      </clr-dropdown>
    </div>
  </clr-header>
  <div class="content-container">
    <div class="content-area">
      <router-outlet></router-outlet>
    </div>
    <clr-vertical-nav [clrVerticalNavCollapsible]="true" class="nav-trigger--bottom" [clr-nav-level]="1">
    <a clrVerticalNavLink routerLink="/acgm/gateway-access">
    <clr-icon clrVerticalNavIcon shape="bolt"></clr-icon>
        gateway-access
    </a>
    <a clrVerticalNavLink routerLink="/acgm/access-log">
        <clr-icon clrVerticalNavIcon shape="grid-chart"></clr-icon>
        access-log
    </a>
    </clr-vertical-nav>
  </div>
</clr-main-container>
  `,
})
export class PagesComponent implements OnInit {
  msgs: any;
  constructor(private localStorage: AsyncLocalStorage, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.localStorage.clear().subscribe(() => {
      window.localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
