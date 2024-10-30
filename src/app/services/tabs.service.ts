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
export class TabsService {}
