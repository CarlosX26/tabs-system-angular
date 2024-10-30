import { Component } from '@angular/core';
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
  droppedDataLeft!: ITab;
  droppedDataCenter!: ITab;
  droppedDataRight!: ITab;

  tabsOpened: ITab[] = [
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
  ];

  tabInView: ITab[] = [this.tabsOpened[0]];

  showDropZone = false;

  dragStartIndex!: number | undefined;

  reorderTabs(lastPosition: number, newPosition: number) {
    const newArray = this.tabsOpened.slice();

    const [movedElement] = newArray.splice(lastPosition, 1);

    newArray.splice(newPosition, 0, movedElement);

    this.tabsOpened = newArray;
  }

  dragStart(index: number) {
    console.log('🚀 ~ AppComponent ~ dragStart ~ index:', index);
    console.log('start drag');
    this.dragStartIndex = index;
    this.showDropZone = true;
  }

  dragEnd() {
    console.log('end drag');
    setTimeout(() => {
      this.showDropZone = false;
      this.dragStartIndex = undefined;
    }, 0);
  }

  dropTab(index: number) {
    this.reorderTabs(this.dragStartIndex!, index);
  }

  onDropLeft({ dropData }: DropEvent<ITab>): void {
    this.droppedDataLeft = dropData;

    if (this.tabInView.length === 2) {
      this.tabInView[0] = this.droppedDataLeft;
      return;
    }

    this.tabInView.unshift(this.droppedDataLeft);
    console.log(this.tabInView);
    console.log(
      '🚀 ~ AppComponent ~ onDropLeft ~ droppedDataLeft:',
      this.droppedDataLeft
    );
  }

  onDropCenter({ dropData }: DropEvent<ITab>): void {
    this.droppedDataCenter = dropData;

    this.tabInView = [this.droppedDataCenter];

    console.log(this.tabInView);
    console.log(
      '🚀 ~ AppComponent ~ onDropLeft ~ droppedDataLeft:',
      this.droppedDataLeft
    );
  }

  onDropRight({ dropData }: DropEvent<ITab>): void {
    console.log('🚀 ~ AppComponent ~ onDropRight ~ dropData:', dropData);
    this.droppedDataRight = dropData;
    if (this.tabInView.length === 2) {
      this.tabInView[1] = this.droppedDataRight;
      return;
    }
    this.tabInView.push(this.droppedDataRight);
    console.log(this.tabInView);
    console.log(
      '🚀 ~ AppComponent ~ onDropRight ~ droppedDataRight:',
      this.droppedDataRight
    );
  }
}
// export class AppComponent {
//   resizingTab: any = null;
//   startX = 0;
//   startSize = 0;

//   constructor(public tabsService: TabsService) {}

//   onResizeStart(event: MouseEvent, tab: any) {
//     this.resizingTab = tab;
//     this.startX = event.clientX;
//     this.startSize = parseFloat(tab.size);
//     document.addEventListener('mousemove', this.onResize.bind(this));
//     document.addEventListener('mouseup', this.onResizeEnd.bind(this));
//   }

//   onResize(event: MouseEvent) {
//     if (this.resizingTab) {
//       const deltaX = event.clientX - this.startX;
//       const containerWidth = window.innerWidth;
//       const newSize =
//         (((this.startSize / 100) * containerWidth + deltaX) / containerWidth) *
//         100;
//       this.resizingTab.size = `${newSize}%`;
//     }
//   }

//   onResizeEnd() {
//     this.resizingTab = null;
//     document.removeEventListener('mousemove', this.onResize.bind(this));
//     document.removeEventListener('mouseup', this.onResizeEnd.bind(this));
//   }
// }
