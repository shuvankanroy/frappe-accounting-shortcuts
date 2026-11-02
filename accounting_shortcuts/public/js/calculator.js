/**
 * Accounting Shortcuts: Integrated Accountant Calculator
 * Ctrl+N / Alt+C in Amount Fields: Interactive formula arithmetic with 1-key field injection.
 */

(function () {
  'use strict';

  const Calculator = {
    targetInput: null,
    isOpen: false,

    toggle: function (activeInput) {
      if (this.isOpen) {
        this.close();
      } else {
        this.open(activeInput);
      }
    },

    open: function (activeInput) {
      this.targetInput = activeInput || document.activeElement;
      let panel = document.getElementById('adt-calculator-panel');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'adt-calculator-panel';
        panel.innerHTML = `
          <div class="adt-calc-header">
            <span>🧮 Calculator (Ctrl+N / Alt+C)</span>
            <span style="cursor: pointer; padding: 0 4px;" id="adt-calc-close">✕</span>
          </div>
          <div class="adt-calc-screen">
            <div class="adt-calc-expr" id="adt-calc-expr">0</div>
            <div class="adt-calc-result" id="adt-calc-result">0.00</div>
          </div>
          <div style="padding: 6px 8px; background: #FFF;">
            <input type="text" id="adt-calc-field" class="adt-calc-input" placeholder="Type formula e.g. 1500*1.18" />
          </div>
          <div class="adt-calc-pad">
            <div class="adt-calc-btn op" data-val="C">C</div>
            <div class="adt-calc-btn op" data-val="CE">CE</div>
            <div class="adt-calc-btn op" data-val="%">%</div>
            <div class="adt-calc-btn op" data-val="/">÷</div>
            <div class="adt-calc-btn" data-val="7">7</div>
            <div class="adt-calc-btn" data-val="8">8</div>
            <div class="adt-calc-btn" data-val="9">9</div>
            <div class="adt-calc-btn op" data-val="*">×</div>
            <div class="adt-calc-btn" data-val="4">4</div>
            <div class="adt-calc-btn" data-val="5">5</div>
            <div class="adt-calc-btn" data-val="6">6</div>
            <div class="adt-calc-btn op" data-val="-">-</div>
            <div class="adt-calc-btn" data-val="1">1</div>
            <div class="adt-calc-btn" data-val="2">2</div>
            <div class="adt-calc-btn" data-val="3">3</div>
            <div class="adt-calc-btn op" data-val="+">+</div>
            <div class="adt-calc-btn" data-val="0">0</div>
            <div class="adt-calc-btn" data-val=".">.</div>
            <div class="adt-calc-btn eq" id="adt-calc-apply">Apply to Field (Enter)</div>
          </div>
        `;
        document.body.appendChild(panel);
        this.bindEvents(panel);
      }

      panel.style.display = 'block';
      this.isOpen = true;
      const field = document.getElementById('adt-calc-field');
      field.value = '';
      if (this.targetInput && this.targetInput.value) {
        field.value = this.targetInput.value.replace(/,/g, '');
      }
      field.focus();
      this.evaluate();
    },

    close: function () {
      const panel = document.getElementById('adt-calculator-panel');
      if (panel) panel.style.display = 'none';
      this.isOpen = false;
      if (this.targetInput && typeof this.targetInput.focus === 'function') {
        this.targetInput.focus();
      }
    },

    bindEvents: function (panel) {
      const field = document.getElementById('adt-calc-field');
      const closeBtn = document.getElementById('adt-calc-close');
      const applyBtn = document.getElementById('adt-calc-apply');

      closeBtn.onclick = () => this.close();
      applyBtn.onclick = () => this.applyResult();

      field.addEventListener('input', () => this.evaluate());
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.applyResult();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        }
      });

      panel.querySelectorAll('.adt-calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-val');
          if (!val) return;
          if (val === 'C' || val === 'CE') {
            field.value = '';
          } else if (val === '%') {
            field.value += '/100';
          } else {
            field.value += val;
          }
          field.focus();
          this.evaluate();
        });
      });
    },

    evaluate: function () {
      const expr = document.getElementById('adt-calc-field').value;
      const exprDisplay = document.getElementById('adt-calc-expr');
      const resultDisplay = document.getElementById('adt-calc-result');

      exprDisplay.textContent = expr || '0';
      if (!expr) {
        resultDisplay.textContent = '0.00';
        return 0;
      }

      try {
        const sanitized = expr.replace(/[^0-9+\-*/().% ]/g, '').replace(/%/g, '/100');
        const val = Function('"use strict";return (' + sanitized + ')')();
        if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
          const res = Math.round((val + Number.EPSILON) * 100) / 100;
          resultDisplay.textContent = res.toFixed(2);
          return res;
        }
      } catch (err) {
        resultDisplay.textContent = '...';
      }
      return null;
    },

    applyResult: function () {
      const res = this.evaluate();
      if (res !== null && this.targetInput) {
        const strVal = res.toString();
        this.targetInput.value = strVal;
        $(this.targetInput).trigger('input').trigger('change').trigger('blur');

        const fieldname = this.targetInput.getAttribute('data-fieldname') || $(this.targetInput).closest('[data-fieldname]').attr('data-fieldname');
        if (window.cur_frm && fieldname) {
          const $gridRow = $(this.targetInput).closest('.grid-row');
          if ($gridRow.length) {
            const grid_row = $gridRow.data('grid_row');
            if (grid_row && grid_row.doc) {
              frappe.model.set_value(grid_row.doc.doctype, grid_row.doc.name, fieldname, res);
            } else {
              const rowIdx = parseInt($gridRow.attr('data-idx')) - 1;
              const tableFieldname = $gridRow.closest('.frappe-control[data-fieldtype="Table"]').attr('data-fieldname') || 'items';
              const grid = cur_frm.get_field(tableFieldname) ? cur_frm.get_field(tableFieldname).grid : null;
              if (grid && grid.grid_rows[rowIdx]) {
                frappe.model.set_value(grid.grid_rows[rowIdx].doc.doctype, grid.grid_rows[rowIdx].doc.name, fieldname, res);
              }
            }
          } else {
            cur_frm.set_value(fieldname, res);
          }
        }
        if (window.frappe && frappe.show_alert) {
          frappe.show_alert({ message: __('Calculated: ₹ ' + res), indicator: 'green' }, 1.5);
        }
      }
      this.close();
    }
  };

  window.AccountingCalculator = Calculator;
})();
