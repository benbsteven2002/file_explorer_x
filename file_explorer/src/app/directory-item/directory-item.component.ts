// directory-item.ts

import { Component, Input } from '@angular/core';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-directory-item',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.css']
})
export class DirectoryItemComponent {
  @Input() item: any;
  isSelected = false;

  selected: boolean = false;
  constructor(private directoryService: DirectoryService) {}

  toggleSelection() {
    this.selected = !this.selected;
  }

  getIconPath(fileExtension: string): string {
    switch (fileExtension) {
      case '.txt':
        return '../../assets/text.svg';
      case '.pdf':
        return '../../assets/file-pdf.svg';
      case '.js':
        return '../../assets/js.svg';
      case '.json':
        return '../../assets/json.svg';
      default:
        return '../../assets/folder-open.svg';
    }
  }

  handleButtonPress(parameter: string): void {
    console.log('Button pressed with parameter:', parameter);
    this.directoryService.directorySelected.emit(parameter);
  }


}
