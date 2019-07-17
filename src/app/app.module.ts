import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AlertsModule} from 'angular-alert-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  HttpClientModule } from '@angular/common/http';
import { ViewAssociationService } from './view-association/view-association.service';
import { ViewBlockService } from './view-block/view-block.service';
import { ViewUnitService } from './view-unit/view-unit.service';
import { DashBoardService } from './dash-board/dash-board.service';
import { WordsPipe } from './pipes/words.pipe';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import {AppRouting} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NewAmenityComponent } from './new-amenity/new-amenity.component';
import { ViewreceiptComponent } from './viewreceipt/viewreceipt.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AddBlocksComponent } from './add-blocks/add-blocks.component';
import { ViewFloorsComponent } from './view-floors/view-floors.component';
import { BankComponent } from './bank/bank.component';
import { CheckInvoiceAndDueDateDirective } from './check-invoice-and-due-date.directive';

import {Ng2TelInputModule} from 'ng2-tel-input';
import { ReportComponent } from './report/report.component';
import { ViewreportComponent } from './viewreport/viewreport.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import {ViewBlockComponent} from './view-block/view-block.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {ViewAssociationComponent} from './view-association/view-association.component';
import {ViewUnitComponent} from './view-unit/view-unit.component';

import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    WordsPipe,
    AddExpenseComponent,
    PathNotFoundComponent,
    ViewExpensesComponent,
    ViewInvoiceComponent,
    AppComponent,
    ViewExpensesComponent,
    AddExpenseComponent,
    PathNotFoundComponent,
    ViewInvoiceComponent,
    WordsPipe,
    NewAmenityComponent,
    ViewreceiptComponent,
    GenerateReceiptComponent,
    AddUnitComponent,
    AddBlocksComponent,
    ViewFloorsComponent,
    BankComponent,
    CheckInvoiceAndDueDateDirective,
    ReportComponent,
    ViewreportComponent,
    LoginComponent,
    RegisterComponent,
    EditprofileComponent,
    ViewBlockComponent,
    DashBoardComponent,
    ViewAssociationComponent,
    ViewUnitComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertsModule,
    AngularFontAwesomeModule,
    Ng2SearchPipeModule,
    AppRouting,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    PaginationModule.forRoot(),
    NgxPaginationModule,
    ProgressbarModule.forRoot(),
    Ng2TelInputModule
  ],
  providers: [ViewAssociationService, ViewBlockService, ViewUnitService, DashBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
