<template>
  <div id="app">
    <ui-toolbar
      brand="Calculadora de taxas Payleven"
      text-color="white"
      type="colored"
      :remove-nav-icon="true"
    />
    <div class="ptc-container">
      <div class="ptc-container__form">
        <ui-textbox
          floating-label
          label="Quanto quer receber?"
          type="number"
          v-model.number="payment"
        />
        <ui-select
          floating-label
          label="Forma de pagamento"
          v-model="paymentOption"
          :options="creditTable"
        />
      </div>
      <div class="ptc-container__results">
        <template v-if="this.payment && this.paymentOption.value.installments">
          <p>
            O valor a ser cobrado é: R$ {{ adjustedPayment | numberFixedTwo }}
          </p>
          <p v-if="this.paymentOption.value.installments > 1">
            O valor de R$ {{ adjustedPayment | numberFixedTwo }} será pago em
            {{ paymentOption.value.installments }} parcelas de R$ {{ installmentValue | numberFixedTwo }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UiRadioGroup,
  UiSelect,
  UiTextbox,
  UiToolbar,
} from 'keen-ui/src'

export default {
  name: 'app',

  data() {
    return {
      debitTax: 2.49,
      creditTax: {
        first: 4.19,
        each: 2.49,
      },
      possibleInstallments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      payment: null,
      paymentOption: {
        value: {
          installments: null,
          tax: null,
        },
      },
    }
  },

  computed: {
    creditTable() {
      const debitOptions = [{
        label: `Débito: 1x (${this.debitTax}%)`,
        value: {
          installments: 1,
          tax: this.debitTax,
        },
      }]
      const creditOptions = this.possibleInstallments.map((installments) => {
        const tax = this.creditTax.first + ((installments - 1) * this.creditTax.each)
        return {
          label: `Crédito: ${installments}x (${tax.toFixed(2)}%)`,
          value: {
            installments,
            tax,
          }
        }
      })

      return [].concat(debitOptions, creditOptions)
    },

    taxesPercent() {
      return this.paymentOption.value.tax / 100;
    },

    adjustedPayment() {
      return (this.payment / (1 - this.taxesPercent))
    },

    installmentValue() {
      return (this.adjustedPayment / this.paymentOption.value.installments)
    },
  },

  components: {
    UiRadioGroup,
    UiSelect,
    UiTextbox,
    UiToolbar,
  },
}
</script>

<style lang="sass">
@import './assets/reset';
.ptc-container
  min-height: 100vh
  padding: 10px
  max-width: 500px
  margin: auto

.ptc-container__form
  border-bottom: 1px solid $secondary

.ptc-container__results
  text-align: center
</style>
