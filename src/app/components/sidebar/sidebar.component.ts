import { Component } from '@angular/core';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarVisible = false;

  constructor(public tabsService: TabsService) {}

  get tabs() {
    return this.tabsService.tabs;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  openTab(tab: any) {
    this.tabsService.openTab(tab);
    this.closeSidebar();
  }
}
