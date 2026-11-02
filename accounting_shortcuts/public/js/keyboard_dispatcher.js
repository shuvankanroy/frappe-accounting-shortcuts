/**
 * Accounting Shortcuts: Global Zero-Mouse Keyboard Dispatcher
 * Keyboard-first accounting navigation for Frappe Framework & ERPNext
 */

(function () {
  'use strict';

  if (window.AccountingKeyboardDispatcher) {
    return;
  }

  const Dispatcher = {
    DOCTYPE_MAP: {
      'payment-entry': 'Payment Entry',
      'journal-entry': 'Journal Entry',
      'sales-invoice': 'Sales Invoice',
      'purchase-invoice': 'Purchase Invoice',
      'stock-entry': 'Stock Entry',
      'delivery-note': 'Delivery Note',
      'purchase-receipt': 'Purchase Receipt',
      'sales-order': 'Sales Order',
      'purchase-order': 'Purchase Order',
      'stock-reconciliation': 'Stock Reconciliation',
      'payroll-entry': 'Payroll Entry'
    },

    init: function () {
      console.log('[AccountingShortcuts] Initializing Keyboard Dispatcher...');
      window.addEventListener('keydown', this.handleKeyDown.bind(this), true);
    },

    normalizeDocType: function (dt) {
      if (!dt) return dt;
      return this.DOCTYPE_MAP[dt.toLowerCase()] || dt;
    },

    handleKeyDown: function (e) {
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable ||
        activeEl.classList.contains('input-with-feedback') ||
        activeEl.classList.contains('form-control')
      );
      const isNumericField = activeEl && (
        activeEl.getAttribute('data-fieldtype') === 'Currency' ||
        activeEl.getAttribute('data-fieldtype') === 'Float' ||
        activeEl.getAttribute('data-fieldname') === 'rate' ||
        activeEl.getAttribute('data-fieldname') === 'amount' ||
        activeEl.getAttribute('data-fieldname') === 'qty'
      );

      // 1. Esc & Ctrl+Q (Back / Close)
      if (e.key === 'Escape' || (e.ctrlKey && (e.key === 'q' || e.key === 'Q'))) {
        if (this.handleEscape(e)) return;
      }

      // 2. Ctrl+A (Universal Accept & Save)
      if (e.ctrlKey && !e.altKey && !e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        if (window.cur_dialog || window.cur_frm) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerAccept();
          return;
        }
      }

      // 3. Calculator (Ctrl+N or Alt+C in Amount Fields)
      if (e.ctrlKey && !e.altKey && !e.shiftKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingCalculator) {
          window.AccountingCalculator.toggle(activeEl);
        }
        return;
      }

      // 4. Go To (Alt+G, Ctrl+G) & Ledger Finder (Alt+F)
      if (e.altKey && !e.ctrlKey && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingGoTo) {
          window.AccountingGoTo.open();
        }
        return;
      }

      if (e.ctrlKey && !e.altKey && !e.shiftKey && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingGoTo) {
          window.AccountingGoTo.open();
        }
        return;
      }

      if (e.altKey && !e.ctrlKey && !e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        e.stopPropagation();
        this.openLedgerFinder();
        return;
      }

      // 5. Master Creation (Alt+C) & Master Alteration (Ctrl+Enter)
      if (e.altKey && !e.ctrlKey && !e.shiftKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        e.stopPropagation();
        if (isNumericField && window.AccountingCalculator) {
          window.AccountingCalculator.toggle(activeEl);
        } else if (window.AccountingVoucherRunner) {
          window.AccountingVoucherRunner.openQuickMasterDrawer(activeEl);
        }
        return;
      }

      if (e.ctrlKey && !e.altKey && e.key === 'Enter') {
        if (isInputFocused && activeEl.getAttribute('data-fieldtype') === 'Link') {
          e.preventDefault();
          e.stopPropagation();
          this.alterMasterFromField(activeEl);
          return;
        }
        if (window.cur_frm && !window.cur_dialog) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerDocSubmit();
          return;
        }
      }

      // 6. Function Keys (F1 - F12)
      if (!e.altKey && !e.ctrlKey) {
        if (e.key === 'F1') {
          e.preventDefault();
          e.stopPropagation();
          if (window.AccountingFloatingDock) window.AccountingFloatingDock.showShortcutsGuide();
          return;
        }
        if (e.key === 'F2') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerDateChange();
          return;
        }
        if (e.key === 'F3') {
          e.preventDefault();
          e.stopPropagation();
          this.switchCompanyDialog();
          return;
        }
        if (e.key === 'F4') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Internal Transfer' });
          return;
        }
        if (e.key === 'F5') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Pay' });
          return;
        }
        if (e.key === 'F6') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Receive' });
          return;
        }
        if (e.key === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Journal Entry');
          return;
        }
        if (e.key === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Invoice');
          return;
        }
        if (e.key === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Invoice');
          return;
        }
        if (e.key === 'F10') {
          e.preventDefault();
          e.stopPropagation();
          if (window.AccountingGoTo) window.AccountingGoTo.open();
          return;
        }
        if (e.key === 'F11') {
          e.preventDefault();
          e.stopPropagation();
          frappe.set_route('Form', 'Company', frappe.defaults.get_user_default('Company'));
          return;
        }
      }

      // 7. Alt + Function Keys (Debit/Credit Notes, Transfers, Delivery)
      if (e.altKey && !e.ctrlKey) {
        if (e.key === 'F1' || e.key === 'F5') {
          e.preventDefault();
          e.stopPropagation();
          if (frappe.query_report) {
            frappe.show_alert({ message: __('Toggled Detailed / Condensed View (Alt+F5)'), indicator: 'blue' });
          } else {
            this.openVoucher('Purchase Invoice', { is_return: 1 });
          }
          return;
        }
        if (e.key === 'F2') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerPeriodChange();
          return;
        }
        if (e.key === 'F3') {
          e.preventDefault();
          e.stopPropagation();
          this.switchCompanyDialog();
          return;
        }
        if (e.key === 'F6') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Invoice', { is_return: 1 });
          return;
        }
        if (e.key === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Stock Entry', { purpose: 'Material Transfer' });
          return;
        }
        if (e.key === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Delivery Note');
          return;
        }
        if (e.key === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Receipt');
          return;
        }
      }

      // 8. Ctrl + Function Keys (Orders & Physical Stock)
      if (e.ctrlKey && !e.altKey) {
        if (e.key === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Order');
          return;
        }
        if (e.key === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Order');
          return;
        }
        if (e.key === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Stock Reconciliation');
          return;
        }
      }

      // 9. Alt Combinations (Duplicate, Delete, Repeat Narration)
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          e.stopPropagation();
          if (cur_frm && !cur_frm.is_new()) {
            this.deleteCurrentVoucher();
          } else {
            this.openDayBook();
          }
          return;
        }
        if (e.key === 'x' || e.key === 'X') {
          e.preventDefault();
          e.stopPropagation();
          this.cancelCurrentVoucher();
          return;
        }
        if (e.key === '2') {
          e.preventDefault();
          e.stopPropagation();
          this.duplicateCurrentVoucher();
          return;
        }
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          e.stopPropagation();
          this.repeatNarration();
          return;
        }
      }

      // 10. Single-Letter Keys on Desk (when no input is focused)
      if (!isInputFocused && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
        const key = e.key.toUpperCase();
        const singleKeys = {
          'C': () => window.AccountingVoucherRunner && window.AccountingVoucherRunner.openQuickMasterDrawer(),
          'A': () => frappe.set_route('desk', 'accounting'),
          'H': () => frappe.set_route('Tree', 'Account'),
          'V': () => this.openVoucher('Payment Entry', { payment_type: 'Pay' }),
          'K': () => this.openDayBook(),
          'N': () => frappe.set_route('accounting-banking'),
          'B': () => frappe.set_route('query-report', 'Balance Sheet'),
          'P': () => frappe.set_route('query-report', 'Profit and Loss Statement'),
          'S': () => frappe.set_route('query-report', 'Stock Summary'),
          'R': () => frappe.set_route('query-report', 'Financial Ratios'),
          'D': () => frappe.set_route('accounting-reports'),
          'O': () => frappe.set_route('accounting-dashboard'),
          'Q': () => window.history.back(),
          'T': () => frappe.set_route('List', 'ToDo')
        };

        if (singleKeys[key]) {
          e.preventDefault();
          e.stopPropagation();
          singleKeys[key]();
        }
      }
    },

    handleEscape: function (e) {
      if (window.AccountingCalculator && window.AccountingCalculator.isOpen) {
        e.preventDefault();
        e.stopPropagation();
        window.AccountingCalculator.close();
        return true;
      }

      const gotoModal = document.getElementById('adt-goto-modal');
      if (gotoModal && gotoModal.style.display !== 'none') {
        e.preventDefault();
        e.stopPropagation();
        gotoModal.style.display = 'none';
        return true;
      }

      const openModal = document.querySelector('.modal.show, .modal-backdrop');
      if (openModal) {
        e.preventDefault();
        e.stopPropagation();
        if (window.cur_dialog) {
          window.cur_dialog.hide();
        } else {
          $('.modal.show').modal('hide');
        }
        return true;
      }

      if (window.cur_frm) {
        e.preventDefault();
        e.stopPropagation();
        frappe.set_route('List', cur_frm.doctype);
        return true;
      }

      return false;
    },

    triggerAccept: function () {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      setTimeout(() => {
        if (window.cur_dialog) {
          if (window.cur_dialog.primary_action) {
            window.cur_dialog.get_primary_btn().click();
          } else {
            window.cur_dialog.hide();
          }
          return;
        }

        if (window.cur_frm) {
          if (cur_frm.is_dirty()) {
            cur_frm.save();
            frappe.show_alert({ message: __('Voucher Saved (Ctrl+A)'), indicator: 'green' }, 1.5);
          } else if (cur_frm.doc.docstatus === 0) {
            cur_frm.savesubmit();
          }
        }
      }, 50);
    },

    triggerDocSubmit: function () {
      if (cur_frm) {
        frappe.confirm(__('Submit and post voucher to General Ledger? (Ctrl+Enter)'), function () {
          cur_frm.savesubmit();
        });
      }
    },

    openVoucher: function (doctype, defaults) {
      const target = this.normalizeDocType(doctype);
      if (cur_frm && cur_frm.doctype === target && cur_frm.is_new()) {
        if (defaults) {
          Object.assign(cur_frm.doc, defaults);
          cur_frm.refresh_fields();
        }
      } else {
        frappe.new_doc(target, defaults);
      }
    },

    triggerDateChange: function () {
      const d = new frappe.ui.Dialog({
        title: __('Change Voucher Date (F2)'),
        fields: [{ fieldtype: 'Date', fieldname: 'new_date', label: __('Voucher Date'), default: cur_frm ? cur_frm.doc.posting_date : frappe.datetime.nowdate(), reqd: 1 }],
        primary_action_label: __('Apply Date (Enter)'),
        primary_action: function (values) {
          if (cur_frm) {
            cur_frm.set_value('posting_date', values.new_date);
            frappe.show_alert({ message: __('Date: ' + values.new_date), indicator: 'green' });
          }
          d.hide();
        }
      });
      d.show();
    },

    triggerPeriodChange: function () {
      const d = new frappe.ui.Dialog({
        title: __('Change Period (Alt+F2)'),
        fields: [
          { fieldtype: 'Date', fieldname: 'from_date', label: __('From Date'), default: frappe.datetime.month_start(), reqd: 1 },
          { fieldtype: 'Date', fieldname: 'to_date', label: __('To Date'), default: frappe.datetime.month_end(), reqd: 1 }
        ],
        primary_action_label: __('Apply Period'),
        primary_action: function (values) {
          if (frappe.query_report) {
            frappe.query_report.set_filter_value('from_date', values.from_date);
            frappe.query_report.set_filter_value('to_date', values.to_date);
            frappe.query_report.refresh();
          }
          d.hide();
        }
      });
      d.show();
    },

    duplicateCurrentVoucher: function () {
      if (cur_frm && cur_frm.doc && !cur_frm.is_new()) {
        frappe.model.copy_doc(cur_frm.doc, 0, function (new_doc) {
          new_doc.posting_date = frappe.datetime.nowdate();
          frappe.set_route('Form', cur_frm.doctype, new_doc.name);
          frappe.show_alert({ message: __('Voucher Duplicated (Alt+2)'), indicator: 'blue' });
        });
      }
    },

    deleteCurrentVoucher: function () {
      if (cur_frm && cur_frm.doc && !cur_frm.is_new() && cur_frm.doc.docstatus === 0) {
        frappe.confirm(__('Delete draft voucher ' + cur_frm.doc.name + '? (Alt+D)'), function () {
          frappe.delete_doc(cur_frm.doctype, cur_frm.doc.name, function () {
            frappe.set_route('List', cur_frm.doctype);
          });
        });
      }
    },

    cancelCurrentVoucher: function () {
      if (cur_frm && cur_frm.doc && cur_frm.doc.docstatus === 1) {
        frappe.confirm(__('Cancel voucher ' + cur_frm.doc.name + '? (Alt+X)'), function () {
          cur_frm.savecancel();
        });
      }
    },

    repeatNarration: function () {
      if (!cur_frm) return;
      const party = cur_frm.doc.customer || cur_frm.doc.supplier || cur_frm.doc.party;
      frappe.call({
        method: 'frappe.client.get_list',
        args: {
          doctype: cur_frm.doctype,
          filters: party ? { party: party, docstatus: 1 } : { docstatus: 1 },
          fields: ['remarks', 'user_remark'],
          limit: 1,
          order_by: 'creation desc'
        },
        callback: function (r) {
          if (r.message && r.message.length) {
            const remark = r.message[0].user_remark || r.message[0].remarks || '';
            if (remark) {
              if (cur_frm.fields_dict.remarks) cur_frm.set_value('remarks', remark);
              if (cur_frm.fields_dict.user_remark) cur_frm.set_value('user_remark', remark);
              frappe.show_alert({ message: __('Narration repeated (Ctrl+R)'), indicator: 'green' });
            }
          }
        }
      });
    },

    openDayBook: function () {
      frappe.set_route('query-report', 'General Ledger', {
        from_date: frappe.datetime.nowdate(),
        to_date: frappe.datetime.nowdate()
      });
    },

    openLedgerFinder: function () {
      const d = new frappe.ui.Dialog({
        title: __('Find Ledger Statement (Alt+F)'),
        fields: [{ fieldtype: 'Link', options: 'Account', fieldname: 'account', label: __('Account / Ledger'), reqd: 1 }],
        primary_action_label: __('Open Statement'),
        primary_action: function (values) {
          frappe.set_route('query-report', 'General Ledger', { account: values.account });
          d.hide();
        }
      });
      d.show();
    },

    switchCompanyDialog: function () {
      frappe.call({
        method: 'frappe.client.get_list',
        args: { doctype: 'Company', fields: ['name'], limit: 20 },
        callback: function (r) {
          if (r.message && r.message.length) {
            const d = new frappe.ui.Dialog({
              title: __('Switch Company (F3)'),
              fields: [{ fieldtype: 'Select', fieldname: 'company', label: __('Company'), options: r.message.map(c => c.name), default: frappe.defaults.get_user_default('Company') }],
              primary_action_label: __('Switch'),
              primary_action: function (values) {
                frappe.defaults.set_user_default('Company', values.company);
                d.hide();
                location.reload();
              }
            });
            d.show();
          }
        }
      });
    }
  };

  window.AccountingKeyboardDispatcher = Dispatcher;
  $(document).on('app_ready', function () {
    Dispatcher.init();
  });
})();
