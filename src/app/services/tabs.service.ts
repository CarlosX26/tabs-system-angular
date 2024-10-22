import { Injectable } from '@angular/core';

interface ITab {
  id: number;
  title: string;
  content: string;
  size: string;
}

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  public tabs: ITab[] = [
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
  ];
  public openTabs: ITab[] = [];

  constructor() {}

  openTab(tab: ITab) {
    const tabIsOpened = this.openTabs.some((e) => e.id === tab.id);

    if (!tabIsOpened) {
      this.openTabs.push(tab);
    }
    console.log('openTabs', this.openTabs);
  }

  closeTab(tab: ITab) {
    const tabIndex = this.openTabs.findIndex((e) => e.id === tab.id);

    if (tabIndex !== -1) {
      this.openTabs.splice(tabIndex, 1);
    }
    console.log('openTabs', this.openTabs);
  }
}
