import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { AriaLivePoliteness } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  constructor() {
  }

  toast(message: string, type: string, hposition: MatSnackBarHorizontalPosition = 'right', vposition: MatSnackBarVerticalPosition = 'top',) {
    const cssclass = []
    switch (type) {
      case 'success':
        cssclass.push('successCustomToast')
        break
      case 'info':
        cssclass.push('infoCustomToast')
        break;
      case 'error':
        cssclass.push('errorCustomToast')
        break;
      case 'warn':
        cssclass.push('warnCustomToast')
        break
      default:
        console.warn('Unknown type provided:', type);  // Handle unexpected type values
        break;
    }
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message:message,type:type},
      horizontalPosition: hposition,
      verticalPosition: vposition,
      panelClass: cssclass,
      duration: 1000
    });
  }

}
