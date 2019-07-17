import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCheckInvoiceAndDueDate]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:CheckInvoiceAndDueDateDirective,
    multi: true
}]
})
export class CheckInvoiceAndDueDateDirective {

  constructor() { }
        
      @Input() appConfirmEqualValidator: string;
      validate(control: AbstractControl): { [key: string]: any } | null {

          const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
          
          if (controlToCompare && controlToCompare.value ) {
              return { 'InvoiceDateLesserThanDueDate': true };
          }
  
          return null;
      }

}
