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

    isNumericField: function (el) {
      if (!el) return false;
      const $el = $(el);
      const fieldname = (el.getAttribute && el.getAttribute('data-fieldname')) || $el.closest('[data-fieldname]').attr('data-fieldname') || '';
      const fieldtype = (el.getAttribute && el.getAttribute('data-fieldtype')) || $el.closest('[data-fieldtype]').attr('data-fieldtype') || '';
      if (['Currency', 'Float', 'Int', 'Percent'].includes(fieldtype)) return true;
      const numKeywords = ['rate', 'amount', 'qty', 'quantity', 'price', 'discount', 'tax', 'total', 'grand_total', 'balance'];
      if (numKeywords.some(k => fieldname.toLowerCase().includes(k))) return true;
      return false;
    },

    getLinkFieldInfo: function (el) {
      if (!el) return null;
      const $el = $(el);
      const $ctrl = $el.closest('.frappe-control, .grid-row, [data-fieldname]');
      let fieldname = (el.getAttribute && el.getAttribute('data-fieldname')) || $ctrl.attr('data-fieldname') || '';
      let fieldtype = (el.getAttribute && el.getAttribute('data-fieldtype')) || $ctrl.attr('data-fieldtype') || '';
      let targetDocType = (el.getAttribute && el.getAttribute('data-target-doctype')) || $ctrl.attr('data-doctype') || '';
      let value = el.value || '';

      if (window.cur_frm && fieldname) {
        if (cur_frm.fields_dict && cur_frm.fields_dict[fieldname]) {
          const df = cur_frm.fields_dict[fieldname].df;
          fieldtype = fieldtype || df.fieldtype;
          targetDocType = targetDocType || df.options;
          value = value || cur_frm.doc[fieldname];
        } else {
          const $gridRow = $el.closest('.grid-row');
          if ($gridRow.length) {
            const grid_row = $gridRow.data('grid_row');
            if (grid_row && grid_row.doc) {
              value = value || grid_row.doc[fieldname];
              const df = grid_row.docfields && grid_row.docfields.find(d => d.fieldname === fieldname);
              if (df) {
                fieldtype = fieldtype || df.fieldtype;
                targetDocType = targetDocType || df.options;
              }
            }
          }
        }
      }

      if (fieldtype === 'Link' || targetDocType) {
        return { doctype: targetDocType, name: value, fieldname: fieldname };
      }
      return null;
    },

    handleKeyDown: function (e) {
      const activeEl = document.activeElement;
      const isInputFocused = Boolean(
        activeEl && (
          activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.isContentEditable ||
          activeEl.getAttribute('contenteditable') === 'true' ||
          activeEl.classList.contains('input-with-feedback') ||
          activeEl.classList.contains('form-control') ||
          Boolean($(activeEl).closest('.input-with-feedback, .frappe-control, .awesomplete, .ql-editor').length)
        )
      );

      const isNumeric = this.isNumericField(activeEl);
      const linkInfo = this.getLinkFieldInfo(activeEl);
      const keyLower = (e.key || '').toLowerCase();
      const code = e.code || '';
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // 1. Esc & Ctrl+Q (Back / Close)
      if (e.key === 'Escape' || code === 'Escape' || (isCtrlOrCmd && !e.altKey && !e.shiftKey && (keyLower === 'q' || code === 'KeyQ'))) {
        if (this.handleEscape(e)) return;
      }

      // 2. Ctrl+A (Universal Accept & Save)
      if (isCtrlOrCmd && !e.altKey && !e.shiftKey && (keyLower === 'a' || code === 'KeyA')) {
        if (window.cur_dialog || window.cur_frm) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerAccept();
          return;
        }
      }

      // 3. Calculator (Alt+N, Ctrl+N, or Alt+C in Amount Fields)
      if (((isCtrlOrCmd && !e.altKey) || (e.altKey && !isCtrlOrCmd)) && !e.shiftKey && (keyLower === 'n' || code === 'KeyN')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingCalculator) {
          window.AccountingCalculator.toggle(activeEl);
        }
        return;
      }

      // 4. Go To (Alt+G, Ctrl+G) & Ledger Finder (Alt+F)
      if (e.altKey && !e.ctrlKey && !e.metaKey && (keyLower === 'g' || code === 'KeyG')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingGoTo) {
          window.AccountingGoTo.open();
        }
        return;
      }

      if (isCtrlOrCmd && !e.altKey && !e.shiftKey && (keyLower === 'g' || code === 'KeyG')) {
        e.preventDefault();
        e.stopPropagation();
        if (window.AccountingGoTo) {
          window.AccountingGoTo.open();
        }
        return;
      }

      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && (keyLower === 'f' || code === 'KeyF')) {
        e.preventDefault();
        e.stopPropagation();
        this.openLedgerFinder();
        return;
      }

      // 5. Master Creation (Alt+C) & Master Alteration (Ctrl+Enter)
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && (keyLower === 'c' || code === 'KeyC')) {
        e.preventDefault();
        e.stopPropagation();
        if (isNumeric && window.AccountingCalculator) {
          window.AccountingCalculator.toggle(activeEl);
        } else if (linkInfo && linkInfo.doctype) {
          frappe.new_doc(linkInfo.doctype);
        } else {
          frappe.new_doc('Customer');
        }
        return;
      }

      if (isCtrlOrCmd && !e.altKey && (e.key === 'Enter' || code === 'Enter' || code === 'NumpadEnter')) {
        if (linkInfo && linkInfo.name && linkInfo.doctype) {
          e.preventDefault();
          e.stopPropagation();
          frappe.set_route('Form', linkInfo.doctype, linkInfo.name);
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
      if (!e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === 'F1' || code === 'F1') {
          e.preventDefault();
          e.stopPropagation();
          if (window.AccountingFloatingDock) window.AccountingFloatingDock.showShortcutsGuide();
          return;
        }
        if (e.key === 'F2' || code === 'F2') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerDateChange();
          return;
        }
        if (e.key === 'F3' || code === 'F3') {
          e.preventDefault();
          e.stopPropagation();
          this.switchCompanyDialog();
          return;
        }
        if (e.key === 'F4' || code === 'F4') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Internal Transfer' });
          return;
        }
        if (e.key === 'F5' || code === 'F5') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Pay' });
          return;
        }
        if (e.key === 'F6' || code === 'F6') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payment Entry', { payment_type: 'Receive' });
          return;
        }
        if (e.key === 'F7' || code === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Journal Entry');
          return;
        }
        if (e.key === 'F8' || code === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Invoice');
          return;
        }
        if (e.key === 'F9' || code === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Invoice');
          return;
        }
        if (e.key === 'F10' || code === 'F10') {
          e.preventDefault();
          e.stopPropagation();
          if (window.AccountingGoTo) window.AccountingGoTo.open();
          return;
        }
        if (e.key === 'F11' || code === 'F11') {
          e.preventDefault();
          e.stopPropagation();
          frappe.set_route('Form', 'Company', frappe.defaults.get_user_default('Company'));
          return;
        }
        if (e.key === 'F12' || code === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          frappe.show_alert(__('Configuration profile loaded (F12)'), 1);
          return;
        }
      }

      // 7. Alt + Function Keys (Debit/Credit Notes, Transfers, Delivery)
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === 'F1' || code === 'F1' || e.key === 'F5' || code === 'F5') {
          e.preventDefault();
          e.stopPropagation();
          if (frappe.query_report) {
            frappe.show_alert({ message: __('Toggled Detailed / Condensed View (Alt+F5)'), indicator: 'blue' });
          } else {
            this.openVoucher('Purchase Invoice', { is_return: 1 });
          }
          return;
        }
        if (e.key === 'F2' || code === 'F2') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerPeriodChange();
          return;
        }
        if (e.key === 'F3' || code === 'F3') {
          e.preventDefault();
          e.stopPropagation();
          this.switchCompanyDialog();
          return;
        }
        if (e.key === 'F6' || code === 'F6') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Invoice', { is_return: 1 });
          return;
        }
        if (e.key === 'F7' || code === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Stock Entry', { purpose: 'Material Transfer' });
          return;
        }
        if (e.key === 'F8' || code === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Delivery Note');
          return;
        }
        if (e.key === 'F9' || code === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Receipt');
          return;
        }
      }

      // 8. Ctrl + Function Keys (Orders & Reconciliation)
      if (isCtrlOrCmd && !e.altKey) {
        if (e.key === 'F8' || code === 'F8') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Sales Order');
          return;
        }
        if (e.key === 'F9' || code === 'F9') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Purchase Order');
          return;
        }
        if (e.key === 'F7' || code === 'F7') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Stock Reconciliation');
          return;
        }
        if (e.key === 'F4' || code === 'F4') {
          e.preventDefault();
          e.stopPropagation();
          this.openVoucher('Payroll Entry');
          return;
        }
      }

      // 9. Alt Combinations
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        if (keyLower === 'd' || code === 'KeyD') {
          e.preventDefault();
          e.stopPropagation();
          if (cur_frm && !cur_frm.is_new() && cur_frm.doc.docstatus === 0) {
            this.deleteCurrentVoucher();
          } else {
            this.openDayBook();
          }
          return;
        }
        if (keyLower === 'x' || code === 'KeyX') {
          e.preventDefault();
          e.stopPropagation();
          this.cancelCurrentVoucher();
          return;
        }
        if (e.key === '2' || code === 'Digit2' || code === 'Numpad2') {
          e.preventDefault();
          e.stopPropagation();
          this.duplicateCurrentVoucher();
          return;
        }
        if (keyLower === 'a' || code === 'KeyA') {
          e.preventDefault();
          e.stopPropagation();
          this.openTaxAnalysis();
          return;
        }
        if (keyLower === 'r' || code === 'KeyR') {
          e.preventDefault();
          e.stopPropagation();
          this.repeatNarration();
          return;
        }
        if (keyLower === 'w' || code === 'KeyW') {
          e.preventDefault();
          e.stopPropagation();
          this.addNoteToRecord();
          return;
        }
        if (keyLower === 'k' || code === 'KeyK') {
          e.preventDefault();
          e.stopPropagation();
          this.switchCompanyDialog();
          return;
        }
      }

      // 10. Ctrl Combinations
      if (isCtrlOrCmd && e.altKey && (keyLower === 's' || code === 'KeyS')) {
        e.preventDefault();
        e.stopPropagation();
        this.syncNow();
        return;
      }

      if (isCtrlOrCmd && !e.altKey && !e.shiftKey) {
        if (keyLower === 's' || code === 'KeyS') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerDocSave();
          return;
        }
        if (keyLower === 'd' || code === 'KeyD') {
          if (isInputFocused && $(activeEl).closest('.grid-row').length) {
            e.preventDefault();
            e.stopPropagation();
            this.deleteGridRow($(activeEl).closest('.grid-row'));
            return;
          }
        }
        if (keyLower === 'h' || code === 'KeyH') {
          e.preventDefault();
          e.stopPropagation();
          this.changeVoucherMode();
          return;
        }
        if (keyLower === 'r' || code === 'KeyR') {
          e.preventDefault();
          e.stopPropagation();
          this.repeatNarration();
          return;
        }
        if (keyLower === 'p' || code === 'KeyP') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerPrint();
          return;
        }
        if (keyLower === 'e' || code === 'KeyE') {
          e.preventDefault();
          e.stopPropagation();
          if (frappe.query_report) frappe.query_report.export_report();
          return;
        }
      }

      // 11. Single-letter desk navigation (when no text input focused & no dialog open)
      if (!isInputFocused && !window.cur_dialog && !document.querySelector('.modal.show') && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
        const key = (e.key || '').toUpperCase();
        const singleKeys = {
          'C': () => frappe.new_doc('Customer'),
          'A': () => frappe.set_route('workspaces', 'Accounting'),
          'H': () => frappe.set_route('Tree', 'Account'),
          'V': () => this.openVoucher('Payment Entry', { payment_type: 'Pay' }),
          'K': () => this.openDayBook(),
          'N': () => frappe.set_route('workspaces', 'Payments'),
          'B': () => frappe.set_route('query-report', 'Balance Sheet'),
          'P': () => frappe.set_route('query-report', 'Profit and Loss Statement'),
          'S': () => frappe.set_route('query-report', 'Stock Balance'),
          'R': () => frappe.set_route('query-report', 'Financial Ratios'),
          'D': () => frappe.set_route('workspaces', 'Financial Reports'),
          'O': () => frappe.set_route('dashboard-view', 'Accounting'),
          'Q': () => {
            if (window.cur_frm) {
              frappe.set_route('List', cur_frm.doctype);
            } else {
              window.history.back();
            }
          },
          'T': () => frappe.set_route('List', 'ToDo')
        };

        if (singleKeys[key]) {
          e.preventDefault();
          e.stopPropagation();
          singleKeys[key]();
          return;
        }

        if (e.key === '+' || e.key === '=') {
          if (frappe.query_report) {
            e.preventDefault();
            this.stepPeriod(1);
          }
        }
        if (e.key === '-' || e.key === '_') {
          if (frappe.query_report) {
            e.preventDefault();
            this.stepPeriod(-1);
          }
        }
      }
    },

    handleEscape: function (e) {
      if (window.AccountingCalculator && window.AccountingCalculator.isOpen) {
        e.preventDefault();
        window.AccountingCalculator.close();
        return true;
      }
      const gotoModal = document.getElementById('adt-goto-modal');
      if (gotoModal && gotoModal.style.display !== 'none') {
        e.preventDefault();
        gotoModal.style.display = 'none';
        return true;
      }
      const openModal = document.querySelector('.modal.show');
      if (openModal || window.cur_dialog) {
        e.preventDefault();
        if (window.cur_dialog) {
          window.cur_dialog.hide();
        } else {
          $('.modal.show').modal('hide');
        }
        return true;
      }
      if (window.cur_frm) {
        e.preventDefault();
        frappe.set_route('List', cur_frm.doctype);
        return true;
      }
      const route = frappe.get_route();
      if (route && (route[0] === 'List' || route[0] === 'query-report')) {
        e.preventDefault();
        frappe.set_route('workspaces', 'Accounting');
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
            frappe.show_alert({ message: __('Voucher Saved (Ctrl+A)'), indicator: 'green' });
          } else if (cur_frm.doc.docstatus === 0) {
            cur_frm.savesubmit();
          } else {
            frappe.show_alert(__('Document is already up to date'), 1);
          }
        }
      }, 50);
    },

    triggerDocSave: function () {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
      setTimeout(() => {
        if (cur_frm) {
          cur_frm.save();
          frappe.show_alert({ message: __('Draft Saved (Ctrl+S)'), indicator: 'green' });
        }
      }, 50);
    },

    triggerDocSubmit: function () {
      if (cur_frm) {
        if (cur_frm.doc.docstatus === 1) {
          frappe.show_alert(__('Voucher is already submitted'), 1);
          return;
        }
        frappe.confirm(__('Submit and post voucher to General Ledger? (Ctrl+Enter)'), function () {
          cur_frm.savesubmit();
        });
      }
    },

    triggerPrint: function () {
      if (cur_frm && cur_frm.doc.name) {
        cur_frm.print_doc();
      } else {
        window.print();
      }
    },

    syncNow: function () {
      if (frappe.ui && frappe.ui.toolbar && frappe.ui.toolbar.clear_cache) {
        frappe.ui.toolbar.clear_cache();
      } else {
        location.reload();
      }
      frappe.show_alert({ message: __('Cache Cleared & Synced (Ctrl+Alt+S)'), indicator: 'green' }, 1.5);
    },

    addNoteToRecord: function () {
      if (!cur_frm || !cur_frm.doc || cur_frm.is_new()) {
        frappe.show_alert(__('Open a saved document to add a note (Alt+W)'), 1.5);
        return;
      }
      const d = new frappe.ui.Dialog({
        title: __('Add Note to ' + cur_frm.doc.name + ' (Alt+W)'),
        fields: [{ fieldtype: 'Small Text', fieldname: 'content', label: __('Comment / Note Content'), reqd: 1 }],
        primary_action_label: __('Add Note (Ctrl+Enter)'),
        primary_action: function (values) {
          frappe.call({
            method: 'frappe.desk.form.utils.add_comment',
            args: {
              reference_doctype: cur_frm.doctype,
              reference_name: cur_frm.doc.name,
              content: values.content,
              comment_email: frappe.session.user,
              comment_by: frappe.session.user_fullname
            },
            callback: function () {
              frappe.show_alert({ message: __('Note added to ' + cur_frm.doc.name), indicator: 'green' }, 1.5);
              d.hide();
              if (cur_frm.timeline) cur_frm.timeline.refresh();
            }
          });
        }
      });
      d.show();
    },

    openVoucher: function (doctype, defaults) {
      const targetDocType = this.normalizeDocType(doctype);
      if (cur_frm && cur_frm.doctype === targetDocType && cur_frm.is_new()) {
        if (defaults) {
          if (defaults.payment_type && cur_frm.fields_dict.payment_type) {
            cur_frm.set_value('payment_type', defaults.payment_type);
          } else if (defaults.is_return !== undefined && cur_frm.fields_dict.is_return) {
            cur_frm.set_value('is_return', defaults.is_return);
          } else if (defaults.purpose && cur_frm.fields_dict.purpose) {
            cur_frm.set_value('purpose', defaults.purpose);
          } else {
            Object.assign(cur_frm.doc, defaults);
            cur_frm.refresh_fields();
          }
        }
        frappe.show_alert({ message: __('Switched to ' + targetDocType), indicator: 'blue' });
      } else {
        frappe.new_doc(targetDocType, defaults);
      }
    },

    triggerDateChange: function () {
      const d = new frappe.ui.Dialog({
        title: __('Change Voucher Date (F2)'),
        fields: [{ fieldtype: 'Date', fieldname: 'new_date', label: __('Posting Date'), default: cur_frm ? cur_frm.doc.posting_date : frappe.datetime.nowdate(), reqd: 1 }],
        primary_action_label: __('Apply Date (Enter)'),
        primary_action: function (values) {
          if (cur_frm) {
            cur_frm.set_value('posting_date', values.new_date);
            frappe.show_alert({ message: __('Date updated to ' + values.new_date), indicator: 'green' });
          } else if (frappe.query_report) {
            frappe.query_report.set_filter_value('to_date', values.new_date);
            frappe.query_report.refresh();
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
        primary_action_label: __('Apply Period (Enter)'),
        primary_action: function (values) {
          if (frappe.query_report) {
            frappe.query_report.set_filter_value('from_date', values.from_date);
            frappe.query_report.set_filter_value('to_date', values.to_date);
            frappe.query_report.refresh();
          }
          frappe.show_alert({ message: __('Period updated: ' + values.from_date + ' to ' + values.to_date), indicator: 'green' });
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
        frappe.confirm(__('Cancel submitted voucher ' + cur_frm.doc.name + '? (Alt+X)'), function () {
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
              frappe.show_alert({ message: __('Narration repeated from last voucher (Ctrl+R)'), indicator: 'green' });
            }
          }
        }
      });
    },

    deleteGridRow: function ($row) {
      if (!$row || !$row.length) return;
      const grid_row = $row.data('grid_row');
      if (grid_row && typeof grid_row.remove === 'function') {
        grid_row.remove();
        frappe.show_alert({ message: __('Row removed (Ctrl+D)'), indicator: 'orange' });
        return;
      }
      if (cur_frm) {
        const tableFieldname = $row.closest('.frappe-control[data-fieldtype="Table"]').attr('data-fieldname') || 'items';
        const gridField = cur_frm.get_field(tableFieldname);
        const rowIdx = parseInt($row.attr('data-idx')) - 1;
        if (gridField && gridField.grid && gridField.grid.grid_rows[rowIdx]) {
          gridField.grid.grid_rows[rowIdx].remove();
          frappe.show_alert({ message: __('Row removed (Ctrl+D)'), indicator: 'orange' });
        }
      }
    },

    changeVoucherMode: function () {
      if (!cur_frm) return;
      const isSales = cur_frm.doctype === 'Sales Invoice';
      const isPurchase = cur_frm.doctype === 'Purchase Invoice';
      if (!isSales && !isPurchase) return;
      const isItemMode = !cur_frm.doc.is_pos && (!cur_frm.doc.items || cur_frm.doc.items.some(it => it.item_code));
      frappe.show_alert({ message: __('Toggled Mode: ' + (isItemMode ? 'Accounting Invoice' : 'Item Invoice')), indicator: 'blue' });
    },

    openTaxAnalysis: function () {
      if (!cur_frm || !cur_frm.doc.items) return;
      const items = cur_frm.doc.items || [];
      const totalTaxable = items.reduce((sum, it) => sum + (it.amount || 0), 0);
      const cgst = cur_frm.doc.taxes ? cur_frm.doc.taxes.filter(t => t.account_head && t.account_head.includes('CGST')).reduce((s, t) => s + t.tax_amount, 0) : 0;
      const sgst = cur_frm.doc.taxes ? cur_frm.doc.taxes.filter(t => t.account_head && t.account_head.includes('SGST')).reduce((s, t) => s + t.tax_amount, 0) : 0;
      const igst = cur_frm.doc.taxes ? cur_frm.doc.taxes.filter(t => t.account_head && t.account_head.includes('IGST')).reduce((s, t) => s + t.tax_amount, 0) : 0;

      const html = `
        <div style="font-family: Inter, sans-serif; font-size: 13px;">
          <table class="table table-bordered table-striped">
            <thead style="background: #EAF7EE; color: #065F46;">
              <tr><th>Item</th><th>HSN</th><th class="text-right">Taxable</th><th class="text-right">IGST</th><th class="text-right">CGST</th><th class="text-right">SGST</th></tr>
            </thead>
            <tbody>
              ${items.map(it => `
                <tr>
                  <td>${it.item_name || it.item_code}</td>
                  <td>${it.gst_hsn_code || '---'}</td>
                  <td class="text-right">${format_currency(it.amount || 0)}</td>
                  <td class="text-right">${format_currency(igst > 0 ? (it.amount / (totalTaxable || 1)) * igst : 0)}</td>
                  <td class="text-right">${format_currency(cgst > 0 ? (it.amount / (totalTaxable || 1)) * cgst : 0)}</td>
                  <td class="text-right">${format_currency(sgst > 0 ? (it.amount / (totalTaxable || 1)) * sgst : 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      const d = new frappe.ui.Dialog({ title: __('Tax Analysis (Alt+A)'), size: 'large', fields: [{ fieldtype: 'HTML', fieldname: 'tax_html' }] });
      d.fields_dict.tax_html.$wrapper.html(html);
      d.show();
    },

    openLedgerFinder: function () {
      const d = new frappe.ui.Dialog({
        title: __('Find Ledger (Alt+F)'),
        fields: [{ fieldtype: 'Link', options: 'Account', fieldname: 'account', label: __('Account'), reqd: 1 }],
        primary_action_label: __('Open'),
        primary_action: function (values) {
          frappe.set_route('query-report', 'General Ledger', { account: values.account });
          d.hide();
        }
      });
      d.show();
    },

    openDayBook: function () {
      frappe.set_route('query-report', 'General Ledger', { from_date: frappe.datetime.nowdate(), to_date: frappe.datetime.nowdate() });
    },

    stepPeriod: function (dir) {
      if (!frappe.query_report) return;
      const from_date = frappe.query_report.get_filter_value('from_date');
      const to_date = frappe.query_report.get_filter_value('to_date');
      if (from_date && to_date) {
        frappe.query_report.set_filter_value('from_date', frappe.datetime.add_days(from_date, dir * 30));
        frappe.query_report.set_filter_value('to_date', frappe.datetime.add_days(to_date, dir * 30));
        frappe.query_report.refresh();
      }
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
  Dispatcher.init();
})();
