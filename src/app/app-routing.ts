import {NgModule} from '@angular/core'; 
import {RouterModule,Routes} from '@angular/router';
import {AddExpenseComponent} from './add-expense/add-expense.component';
import {ViewExpensesComponent} from './view-expenses/view-expenses.component';
import {ViewInvoiceComponent} from './view-invoice/view-invoice.component';
import {ViewreceiptComponent} from './viewreceipt/viewreceipt.component';
import {GenerateReceiptComponent} from './generate-receipt/generate-receipt.component';
import {AddUnitComponent} from './add-unit/add-unit.component';
import {AddBlocksComponent} from './add-blocks/add-blocks.component';
import {ViewFloorsComponent} from './view-floors/view-floors.component';
import {ViewBlockComponent} from './view-block/view-block.component';
import {ReportComponent} from './report/report.component';
import {ViewreportComponent} from './viewreport/viewreport.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ViewAssociationComponent } from './view-association/view-association.component';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '',redirectTo:'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashBoardComponent },
            { path: 'association', component: ViewAssociationComponent },
            { path: 'viewBlocks', component: ViewBlockComponent },
            { path: 'viewunit', component: ViewUnitComponent },
            { path: 'viewexpense', component: ViewExpensesComponent },
            { path: 'viewinvoice', component: ViewInvoiceComponent },
            { path: 'viewreceipt', component: ViewreceiptComponent },
            { path: 'addexpense', component: AddExpenseComponent },
            { path: 'generatereceipt', component: GenerateReceiptComponent },
            { path: 'addunit', component: AddUnitComponent },
            { path: 'addBlocks', component: AddBlocksComponent },
            { path: 'viewFloors', component: ViewFloorsComponent },
            { path: 'report', component: ReportComponent },
            { path: 'viewreport', component: ViewreportComponent },
            { path: 'editprofile', component: EditprofileComponent }],
            canActivate:[AuthGuard]
    }
]

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRouting {

}
