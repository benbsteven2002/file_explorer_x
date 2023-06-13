// directory.service.ts

import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  directorySelected: EventEmitter<string> = new EventEmitter<string>();
}
