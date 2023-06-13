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
      case 'directory':
        return '../../assets/folder-open.svg';
      case '.css':
        return '../../assets/css.svg';
      case '.git':
      case '.gitignore':
        return '../../assets/git.svg';
      case '.html':
        return '../../assets/html5.svg';
      case '.png':
      case '.HEIC':
      case '.svg':
        return '../../assets/image.svg';
      case '.mov':
        return '../../assets/video.svg';
      default:
        return '../../assets/file.svg';
    }
  }

  handleButtonPress(parameter: string, isDirectory: boolean): void {
    if (isDirectory == true) {
      console.log('Button pressed with parameter:', parameter);
      this.directoryService.directorySelected.emit(parameter);
    }
  }


}
