import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-directory-item',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.css']
})
export class DirectoryItemComponent {
  @Input() item: any;
  isSelected = false;

  selected: boolean = false;

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

}
