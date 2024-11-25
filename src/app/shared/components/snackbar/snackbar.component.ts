import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  header: string;
  borderCls: any;
  type: any;
  message: any;
  icon: string;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) public data2: any
  ) {
    this.type = data.type || snackBarRef.containerInstance.snackBarConfig.data.type
    this.message = data.message || snackBarRef.containerInstance.snackBarConfig.data.messsage
    this.setToastHeader()
  }

  setToastHeader() {
    switch (this.type) {
      case 'success':
        this.header = 'Success!'
        this.icon = 'done'
        break;
      case 'info':
        this.header = 'Info!'
        this.icon = 'info'
        break;
        case 'error':
          this.header = 'Error!';
          this.icon = 'dangerous'
        break;
      case 'warn':
        this.header = 'Warning!';
        this.icon = 'warning_amber'
        break
    }
  }

  setColorClass() {
    if (this.type === 'success') {
      return 'successIconColor';
    } else if (this.type === 'error') {
      return 'errorIconColor';
    } else if (this.type === 'info') {
      return 'infoIconColor';
    } else if (this.type === 'warn') {
      return 'warnIconColor';
    }
    return ''; // Default case if no condition matches
  }

}
