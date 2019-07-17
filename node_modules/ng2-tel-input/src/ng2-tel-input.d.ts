import { ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class Ng2TelInput implements OnInit {
    private el;
    private platformId;
    ng2TelInputOptions: any;
    hasError: EventEmitter<boolean>;
    ng2TelOutput: EventEmitter<any>;
    countryChange: EventEmitter<any>;
    intlTelInputObject: EventEmitter<any>;
    ngTelInput: any;
    constructor(el: ElementRef, platformId: string);
    ngOnInit(): void;
    onBlur(): void;
    isInputValid(): boolean;
    setCountry(country: any): void;
}
