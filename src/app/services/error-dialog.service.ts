import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog.component';

@Injectable()
export class ErrorDialogService {

  constructor(private dialog: MdDialog) { }

  /**
   * Opens a fail dialog
   * @param d       dialog component
   * @param message corresponding message
   * @returns {Observable<any>}
   */
  public dialogPopup(message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<any>;

    dialogRef = this.dialog.open(ErrorDialogComponent);
    dialogRef.componentInstance.message = message;
    /*setTimeout(() => {
      dialogRef.close();
    }, 1000);*/
    return dialogRef.afterClosed();
  }

}
