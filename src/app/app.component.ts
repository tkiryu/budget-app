import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { NAVIGATION_ITEMS } from './shared/navigation-items';

import { IgxNavigationDrawerComponent } from 'igniteui-angular/navigation-drawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;

  public navigationItems: Array<{
    icon: string,
    link: string,
    text: string
  }> = [];

  @ViewChild(IgxNavigationDrawerComponent) public navdrawer: IgxNavigationDrawerComponent;

  constructor(private router: Router) {
    this.navigationItems = [...NAVIGATION_ITEMS];
  }

  public ngOnInit(): void {
    this.router.events
      .filter((x) => x instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (event.url !== '/' && !this.navdrawer.pin) {
          // Close drawer when selecting a view on mobile (unpinned)
          this.navdrawer.close();
        }
      });

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        console.log(event);
        this.title = event['title']
      });
  }
}
