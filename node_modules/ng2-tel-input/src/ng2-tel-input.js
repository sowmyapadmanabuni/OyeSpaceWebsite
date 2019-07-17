import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var Ng2TelInput = /** @class */ (function () {
    function Ng2TelInput(el, platformId) {
        this.el = el;
        this.platformId = platformId;
        this.hasError = new EventEmitter();
        this.ng2TelOutput = new EventEmitter();
        this.countryChange = new EventEmitter();
        this.intlTelInputObject = new EventEmitter();
    }
    Ng2TelInput.prototype.ngOnInit = function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.ngTelInput = window.intlTelInput(this.el.nativeElement, this.ng2TelInputOptions);
            this.el.nativeElement.addEventListener("countrychange", function () {
                _this.countryChange.emit(_this.ngTelInput.getSelectedCountryData());
            });
            this.intlTelInputObject.emit(this.ngTelInput);
        }
    };
    Ng2TelInput.prototype.onBlur = function () {
        var isInputValid = this.isInputValid();
        if (isInputValid) {
            var telOutput = this.ngTelInput.getNumber();
            this.hasError.emit(isInputValid);
            this.ng2TelOutput.emit(telOutput);
        }
        else {
            this.hasError.emit(isInputValid);
        }
    };
    Ng2TelInput.prototype.isInputValid = function () {
        return this.ngTelInput.isValidNumber();
    };
    Ng2TelInput.prototype.setCountry = function (country) {
        this.ngTelInput.setCountry(country);
    };
    Ng2TelInput.decorators = [
        { type: Directive, args: [{
                    selector: '[ng2TelInput]',
                },] },
    ];
    /** @nocollapse */
    Ng2TelInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    Ng2TelInput.propDecorators = {
        ng2TelInputOptions: [{ type: Input, args: ['ng2TelInputOptions',] }],
        hasError: [{ type: Output, args: ['hasError',] }],
        ng2TelOutput: [{ type: Output, args: ['ng2TelOutput',] }],
        countryChange: [{ type: Output, args: ['countryChange',] }],
        intlTelInputObject: [{ type: Output, args: ['intlTelInputObject',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return Ng2TelInput;
}());
export { Ng2TelInput };
//# sourceMappingURL=ng2-tel-input.js.map