import { Component, ViewChild } from '@angular/core';
import { TabsService } from 'src/app/services/tabs.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private tabsService: TabsService) {}

  get tabs() {
    return this.tabsService.tabs;
  }

  get openTabs() {
    return this.tabsService.openTabs;
  }

  toggleSideBar() {
    this.sidebar.toggleSidebar();
  }

  onDragStart(event: DragEvent, tab: any) {
    console.log('🚀 ~ TabsComponent ~ onDragStart ~ event:', event, tab);
  }

  closeTab(tab: any) {
    this.tabsService.closeTab(tab);
  }
}
