import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private toastr: ToastrService) { }

  public handleError(error: any): void {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error}`;
    } else {
      errorMessage = `Error Code: ${error.status || 500}\nMessage: ${error.error.message || 'Server error'}`;
    }
    this.toastr.error(errorMessage, "Error", { positionClass: 'toast-top-right' });
  }

}
