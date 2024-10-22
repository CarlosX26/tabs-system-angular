import { Component } from '@angular/core';
import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  resizingTab: any = null;
  startX = 0;
  startSize = 0;

  constructor(public tabsService: TabsService) {}

  onDragStart(event: DragEvent, tab: any) {
    event.dataTransfer?.setData('tabData', JSON.stringify(tab));
  }

  onResizeStart(event: MouseEvent, tab: any) {
    this.resizingTab = tab;
    this.startX = event.clientX;
    this.startSize = parseFloat(tab.size);
    document.addEventListener('mousemove', this.onResize.bind(this));
    document.addEventListener('mouseup', this.onResizeEnd.bind(this));
  }

  onResize(event: MouseEvent) {
    if (this.resizingTab) {
      const deltaX = event.clientX - this.startX;
      const containerWidth = window.innerWidth;
      const newSize =
        (((this.startSize / 100) * containerWidth + deltaX) / containerWidth) *
        100;
      this.resizingTab.size = `${newSize}%`;
    }
  }

  onResizeEnd() {
    this.resizingTab = null;
    document.removeEventListener('mousemove', this.onResize.bind(this));
    document.removeEventListener('mouseup', this.onResizeEnd.bind(this));
  }
}
