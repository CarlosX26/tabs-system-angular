import { Component, HostListener } from '@angular/core';
import { DropEvent } from 'angular-draggable-droppable';

interface ITab {
  id: number;
  title: string;
  content: string;
  size: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tabs: ITab[] = [
    {
      id: 0,
      title: 'Tab 1',
      content: 'Conteúdo tab 1',
      size: '100%',
    },
    {
      id: 1,
      title: 'Tab 2',
      content: 'Conteúdo tab 2',
      size: '100%',
    },
    {
      id: 2,
      title: 'Tab 3',
      content: 'Conteúdo tab 3',
      size: '100%',
    },
    {
      id: 3,
      title: 'Tab 4',
      content: 'Conteúdo tab 4',
      size: '100%',
    },
    {
      id: 4,
      title: 'Tab 5',
      content: 'Conteúdo tab 5',
      size: '100%',
    },
    {
      id: 5,
      title: 'Tab 6',
      content: 'Conteúdo tab 6',
      size: '100%',
    },
  ];

  tabsOpened: ITab[] = [];

  tabInView: ITab[] = [];

  showDropZone = false;

  dragStartIndex!: number | undefined;

  isResizing = false;
  startX = 0;
  startWidth = 0;

  resizeTabs(event: MouseEvent) {
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = 50;
    event.preventDefault();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const deltaX = ((event.clientX - this.startX) / window.innerWidth) * 100;

    const newWidth = Math.round(this.startWidth + deltaX);
    const remainingWidth = Math.round(100 - newWidth);

    if (newWidth > 10 && remainingWidth > 10) {
      this.tabInView[0].size = `${newWidth}%`;
      this.tabInView[1].size = `${remainingWidth}%`;
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    console.log({
      tabs: this.tabs,
      tabInView: this.tabInView,
      tabsOpened: this.tabsOpened,
    });

    this.isResizing = false;
  }

  reorderTabs(lastPosition: number, newPosition: number) {
    const newArray = this.tabsOpened.slice();

    const [movedElement] = newArray.splice(lastPosition, 1);

    newArray.splice(newPosition, 0, movedElement);

    this.tabsOpened = newArray;
  }

  dragStart(index: number) {
    this.dragStartIndex = index;
    this.showDropZone = true;
  }

  dragEnd() {
    setTimeout(() => {
      this.showDropZone = false;
      this.dragStartIndex = undefined;
    }, 0);
  }

  dropTab(index: number) {
    this.reorderTabs(this.dragStartIndex!, index);
  }

  openTab(tab: ITab) {
    this.tabInView = [{ ...tab }];
  }

  openTabSidebar(tab: ITab) {
    const tabIndexInOpened = this.tabsOpened.findIndex((t) => t.id === tab.id);

    this.tabInView = [{ ...tab }];

    if (tabIndexInOpened === -1) {
      this.tabsOpened = [...this.tabsOpened, { ...tab }];
    }
  }

  closeTab(tab: ITab) {
    this.tabsOpened = this.tabsOpened.filter((t) => t.id !== tab.id);

    const tabIndexInView = this.tabInView.findIndex((t) => t.id === tab.id);

    if (tabIndexInView !== -1) {
      this.tabInView = this.tabInView.filter((t) => t.id !== tab.id);
    }

    if (this.tabInView.length === 1) {
      const currentTab = this.tabInView[0];
      this.tabInView = [{ ...currentTab, size: '100%' }];
    }
  }

  onDropLeft({ dropData }: DropEvent<ITab>): void {
    const tab = { ...dropData };

    if (this.tabInView.length === 2) {
      this.tabInView[0] = tab;
      return;
    }

    this.tabInView.unshift(tab);
  }

  onDropCenter({ dropData }: DropEvent<ITab>): void {
    const tab = { ...dropData };

    this.tabInView = [tab];
  }

  onDropRight({ dropData }: DropEvent<ITab>): void {
    const tab = { ...dropData };
    if (this.tabInView.length === 2) {
      this.tabInView[1] = tab;
      return;
    }

    this.tabInView.push(tab);
  }
}
