import {Inject, Injectable} from '@angular/core';
import swal from 'sweetalert2';
@Injectable()
export class MessagesService  {

  constructor(){

  }

  public static SuccessMessage(message): void {
     swal.fire({
      type: 'success',
      title: 'Success! <br> '+ message,
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  public static ErrorMessage(message) {
     swal.fire({
      type: 'error',
      title: 'Oops <br>'+ message,
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  public static WarningMessage(message) {
     swal.fire({
      type: 'warning',
      title: 'Oops! <br> '+ message,
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  public static AuthenticatMessage() {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }

}
