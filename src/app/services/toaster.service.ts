import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  toast(message: string, test: string, hposition: MatSnackBarHorizontalPosition = 'right', vposition: MatSnackBarVerticalPosition = 'bottom') {
    this._snackBar.open(message, test, {
      horizontalPosition: hposition,
      verticalPosition: vposition,
    });
  }

}
