import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  toast(message: string, test: string, type:string,hposition: MatSnackBarHorizontalPosition = 'right', vposition: MatSnackBarVerticalPosition = 'bottom',) {
    const cssclass = []
    switch(type) {
      case 'info':
        cssclass.push('info')
        // code block
        break;
        case 'error':
        cssclass.push('red')
        // code block
        break;
        default:
        cssclass.push('green')
        // code block
    }
    this._snackBar.open(message, test, {
      horizontalPosition: hposition,
      verticalPosition: vposition,
      panelClass:cssclass,
      duration: 2300
    });
  }

}
