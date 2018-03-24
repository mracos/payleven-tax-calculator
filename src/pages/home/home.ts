import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

const CREDIT_TAX: any = {
  EACH: 2.49,
  FIRST: 4.19,
};
const DEBIT_TAX: number = 2.49;

interface PaymentOption {
  installments: number,
  kind: "DEBIT" | "CREDIT",
  name: string,
  tax: number,
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public payment: number;
  public paymentOption: PaymentOption;
  public possibleInstallments: Array<number> = Array.from(Array(12).keys(), (v) => v + 1);

  constructor(public actionSheetCtrl: ActionSheetController) {}

  public get paymentOptions() :Array<PaymentOption> {
    const debitInstallment: PaymentOption = {
      installments: 1,
      kind: "DEBIT",
      name: "1x - Débito",
      tax: DEBIT_TAX,
    };

    return [debitInstallment].concat(this.possibleInstallments.map((installment: number) => {
      const afterFirstInstallment: number = installment - 1;

      const creditOption: PaymentOption = {
        installments: installment,
        kind: "CREDIT",
        name: `${installment}x - Crédito`,
        tax: CREDIT_TAX.FIRST + (CREDIT_TAX.EACH * afterFirstInstallment),
      };

      return creditOption;
    }));
  }

  public areTwoPaymentOptionsEqual(firstPayment: PaymentOption, secondPayment: PaymentOption) :Boolean {
    return (firstPayment.name === secondPayment.name);
  }
}
