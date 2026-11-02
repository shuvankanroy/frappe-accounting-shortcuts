/**
 * Accounting Shortcuts: Interactive Pop-Out Shortcuts Guide & Sleek Compact Floating Dock
 * Always-visible floating dock with 1-click execution and comprehensive single & multi-key pop-out modal.
 */

(function () {
  'use strict';

  const FloatingDock = {
    init: function () {
      this.attachDock();
    },

    attachDock: function () {
      setInterval(() => {
        if (!document.getElementById('adt-shortcut-dock') && document.body) {
          const dock = document.createElement('div');
          dock.id = 'adt-shortcut-dock';
          dock.style.cssText = `
            position: fixed;
            bottom: 8px;
            right: 18px;
            z-index: 9997;
            background: #064E3B;
            color: #FFFFFF;
            font-size: 11px;
            padding: 5px 12px;
            border-radius: 20px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.3);
            display: flex;
            gap: 8px;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
            opacity: 0.95;
            cursor: pointer;
            user-select: none;
            transition: all 0.2s ease;
          `;
          dock.innerHTML = `
            <span style="font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              ⚡ <kbd style="background: #047857; color: #FFF; padding: 1px 5px; border-radius: 3px; font-weight: 700;">F1</kbd> Shortcuts
            </span>
            <span style="opacity: 0.4;">|</span>
            <span class="adt-dock-pill" data-act="alt-g" style="padding: 1px 4px; border-radius: 3px;"><strong>Alt+G</strong> Go To</span>
            <span style="opacity: 0.4;">|</span>
            <span class="adt-dock-pill" data-act="ctrl-a" style="padding: 1px 4px; border-radius: 3px;"><strong>Ctrl+A</strong> Save</span>
            <span style="opacity: 0.4;">|</span>
            <span class="adt-dock-pill" data-act="calc" style="padding: 1px 4px; border-radius: 3px;"><strong>Alt+N</strong> Calc</span>
          `;

          dock.querySelectorAll('.adt-dock-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
              e.stopPropagation();
              const act = pill.getAttribute('data-act');
              this.executeAction(act);
            });
          });

          dock.addEventListener('click', () => {
            this.showShortcutsGuide();
          });

          document.body.appendChild(dock);
        }
      }, 1500);
    },

    showShortcutsGuide: function () {
      const sections = [
        {
          category: 'SINGLE-KEY FUNCTIONS',
          badge: 'Direct 1-Key Press',
          badgeColor: '#065F46',
          groups: [
            {
              name: 'Gateway / Desk Navigation (When No Text Input Focused)',
              items: [
                ['C', 'Create Master (Ledger, Group, Stock Item, Unit, Godown)', 'alt-c'],
                ['A', 'Alter Master / Chart of Accounts', 'alter-accounts'],
                ['H', 'Chart of Accounts (Tree Hierarchy)', 'h-coa'],
                ['V', 'Voucher Entry (Payment by default; F4-F9 to switch)', 'f5'],
                ['K', 'Day Book (Today Transactions / General Ledger)', 'k-daybook'],
                ['N', 'Banking Hub & Bank Reconciliation (BRS)', 'n-bank'],
                ['B', 'Balance Sheet Report', 'b-bs'],
                ['P', 'Profit & Loss Statement', 'p-pl'],
                ['S', 'Stock Summary Report', 's-stock'],
                ['R', 'Financial Ratio Analysis', 'r-ratio'],
                ['D', 'Financial Reports Directory', 'd-reports'],
                ['O', 'Executive Financial Dashboard', 'o-dashboard'],
                ['T', 'Accountant Desk / To-Dos & Due Dates', 't-todo'],
                ['Q', 'Quit / Go Back (Same as Esc)', 'esc']
              ]
            },
            {
              name: 'Function Keys (F1 – F12)',
              items: [
                ['F1', 'Pop-out Shortcuts Guide (This Window)', 'f1'],
                ['F2', 'Change Document / Voucher Posting Date', 'f2-date'],
                ['F3', 'Select / Switch Active Company', 'f3-company'],
                ['F4', 'Contra Voucher (Bank & Cash Transfer)', 'f4'],
                ['F5', 'Payment Voucher (Pay Vendor / Expense)', 'f5'],
                ['F6', 'Receipt Voucher (Receive from Customer)', 'f6'],
                ['F7', 'Journal Voucher (Double-Entry Dr/Cr Adjustments)', 'f7'],
                ['F8', 'Sales Invoice / Voucher (GST Billing)', 'f8'],
                ['F9', 'Purchase Invoice / Voucher (Inward Supply)', 'f9'],
                ['F10', 'All Voucher Types Selector Palette', 'f10'],
                ['F11', 'Company Features & Setup', 'f11-company'],
                ['F12', 'Configuration Profile', 'f12-config']
              ]
            },
            {
              name: 'Navigation & Stepping Keys',
              items: [
                ['Esc', 'Close Modal / Cancel Pop-out / Go Back One View', 'esc'],
                ['Enter', 'Next field; in reports, drill-down into row voucher', 'enter'],
                ['Shift+Tab', 'Previous field in sequence', 'prev-field'],
                ['+', 'Step Report Period Forward by 1 Month', 'plus-period'],
                ['-', 'Step Report Period Backward by 1 Month', 'minus-period']
              ]
            }
          ]
        },
        {
          category: 'MULTI-KEY FUNCTIONS',
          badge: 'Key Combinations',
          badgeColor: '#0D9488',
          groups: [
            {
              name: 'Ctrl + Key Combinations',
              items: [
                ['Ctrl+A', 'Universal Accept & Save (Vouchers, Forms & Dialogs)', 'ctrl-a'],
                ['Alt+N / Ctrl+N', 'Accountant Formula Calculator Panel (or Alt+C in amounts)', 'calc'],
                ['Ctrl+G', 'Switch To / Universal Go To Palette', 'alt-g'],
                ['Ctrl+Enter', 'Alter Master under cursor in link fields; Submit voucher', 'ctrl-enter'],
                ['Ctrl+D', 'Remove line item row in grid table', 'ctrl-d'],
                ['Ctrl+H', 'Change Voucher Mode (Item Invoice vs Accounting Invoice)', 'ctrl-h'],
                ['Ctrl+R', 'Repeat Narration from last voucher of same type/party', 'repeat-narration'],
                ['Ctrl+P', 'Print Tax Invoice / Browser Print', 'print'],
                ['Ctrl+E', 'Quick Export Report to CSV', 'export-csv'],
                ['Ctrl+S', 'Save Draft Voucher', 'save-draft'],
                ['Ctrl+Q', 'Quit / Go Back (equivalent to Esc)', 'esc'],
                ['Ctrl+F8', 'Sales Order', 'ctrl-f8'],
                ['Ctrl+F9', 'Purchase Order', 'ctrl-f9'],
                ['Ctrl+F7', 'Physical Stock Reconciliation', 'ctrl-f7'],
                ['Ctrl+F4', 'Payroll Entry', 'ctrl-f4']
              ]
            },
            {
              name: 'Alt + Key Combinations',
              items: [
                ['Alt+G', 'Go To Universal Fuzzy Search Palette', 'alt-g'],
                ['Alt+F', 'Find Ledger Statement by Name', 'alt-f'],
                ['Alt+C', 'In amount field: Calculator; In party/item: Master Drawer', 'alt-c'],
                ['Alt+2', 'Duplicate Current Voucher on Today Date', 'alt-2'],
                ['Alt+D', 'Delete Draft Voucher (in voucher); Open Day Book (on Desk)', 'alt-d'],
                ['Alt+X', 'Cancel Submitted Voucher (preserves sequence number)', 'alt-x'],
                ['Alt+A', 'Statutory GST Tax Analysis Drawer (HSN, CGST, SGST, IGST)', 'alt-a'],
                ['Alt+R', 'Repeat Narration from last voucher for party', 'repeat-narration'],
                ['Alt+K', 'Company Menu / Switch Company (same as F3)', 'f3-company'],
                ['Alt+O', 'Data Import Menu (XML / Excel / CSV)', 'import-menu'],
                ['Alt+E', 'Export Menu (PDF, Excel, JSON)', 'export-menu'],
                ['Alt+P', 'Print Menu / Tax Invoice Print', 'print']
              ]
            },
            {
              name: 'Alt + Function Keys & Special Combinations',
              items: [
                ['Alt+F2', 'Change Financial Period (From Date → To Date)', 'alt-f2-period'],
                ['Alt+F3', 'Select / Switch Active Company', 'f3-company'],
                ['Alt+F5', 'Debit Note (Purchase Return); in reports: Detailed View', 'alt-f5'],
                ['Alt+F6', 'Credit Note (Sales Return)', 'alt-f6'],
                ['Alt+F7', 'Stock Journal / Godown Material Transfer', 'alt-f7'],
                ['Alt+F8', 'Delivery Note / Challan', 'alt-f8'],
                ['Alt+F9', 'Receipt Note / Goods Inward', 'alt-f9'],
                ['Alt+F1', 'Detailed vs Condensed View in Stock Summary', 'alt-f1']
              ]
            }
          ]
        }
      ];

      const html = `
        <div class="adt-shortcuts-popout" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif; max-height: 72vh; overflow-y: auto; padding: 4px 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${sections.map(sec => `
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${sec.badgeColor}; padding-bottom: 6px; margin-bottom: 12px;">
                  <span style="font-weight: 800; font-size: 13px; color: ${sec.badgeColor};">${sec.category}</span>
                  <span style="background: ${sec.badgeColor}; color: #FFF; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 10px; text-transform: uppercase;">${sec.badge}</span>
                </div>
                ${sec.groups.map(grp => `
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.3px;">${grp.name}</div>
                    <div style="display: flex; flex-direction: column; gap: 3px;">
                      ${grp.items.map(([key, desc, act]) => `
                        <div class="adt-popout-row" data-action="${act}" style="display: flex; align-items: center; justify-content: space-between; padding: 3px 6px; border-radius: 4px; cursor: pointer; transition: background 0.1s; background: #FFFFFF; border: 1px solid #F1F5F9;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <kbd style="background: #065F46; color: #FFFFFF; font-weight: 700; font-size: 11px; padding: 2px 6px; border-radius: 4px; min-width: 60px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">${key}</kbd>
                            <span style="font-size: 12px; color: #1E293B;">${desc}</span>
                          </div>
                          <span style="font-size: 10px; color: #94A3B8; opacity: 0.6;">▶</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 12px; text-align: center; font-size: 11px; color: #64748B; background: #EAF7EE; padding: 8px; border-radius: 6px; border: 1px solid #D1E7DD;">
            💡 <strong>Pro Tip:</strong> Click any shortcut row above to trigger it immediately, or use physical keys on your keyboard!
          </div>
        </div>
      `;

      const d = new frappe.ui.Dialog({
        title: __('⚡ Fast Accounting Shortcuts — Single & Multi-Key Guide'),
        size: 'extra-large',
        fields: [{ fieldtype: 'HTML', fieldname: 'shortcuts_html' }]
      });

      d.fields_dict.shortcuts_html.$wrapper.html(html);

      d.fields_dict.shortcuts_html.$wrapper.find('.adt-popout-row').hover(
        function () { $(this).css({ 'background': '#EAF7EE', 'border-color': '#065F46' }); },
        function () { $(this).css({ 'background': '#FFFFFF', 'border-color': '#F1F5F9' }); }
      ).on('click', (e) => {
        const act = $(e.currentTarget).attr('data-action');
        d.hide();
        this.executeAction(act);
      });

      d.show();
    },

    executeAction: function (act) {
      const d = window.AccountingKeyboardDispatcher;
      const actions = {
        'f8': () => frappe.new_doc('Sales Invoice'),
        'f9': () => frappe.new_doc('Purchase Invoice'),
        'f5': () => frappe.new_doc('Payment Entry', { payment_type: 'Pay' }),
        'f6': () => frappe.new_doc('Payment Entry', { payment_type: 'Receive' }),
        'f4': () => frappe.new_doc('Payment Entry', { payment_type: 'Internal Transfer' }),
        'f7': () => frappe.new_doc('Journal Entry'),
        'alt-f6': () => frappe.new_doc('Sales Invoice', { is_return: 1 }),
        'alt-f5': () => frappe.new_doc('Purchase Invoice', { is_return: 1 }),
        'alt-f7': () => frappe.new_doc('Stock Entry', { purpose: 'Material Transfer' }),
        'alt-f8': () => frappe.new_doc('Delivery Note'),
        'alt-f9': () => frappe.new_doc('Purchase Receipt'),
        'ctrl-f8': () => frappe.new_doc('Sales Order'),
        'ctrl-f9': () => frappe.new_doc('Purchase Order'),
        'ctrl-f7': () => frappe.new_doc('Stock Reconciliation'),
        'ctrl-f4': () => frappe.new_doc('Payroll Entry'),
        'f10': () => window.AccountingGoTo && window.AccountingGoTo.open(),
        'ctrl-a': () => d && d.triggerAccept(),
        'alt-g': () => window.AccountingGoTo && window.AccountingGoTo.open(),
        'calc': () => window.AccountingCalculator && window.AccountingCalculator.toggle(),
        'alt-c': () => window.AccountingVoucherRunner && window.AccountingVoucherRunner.openQuickMasterDrawer(),
        'ctrl-enter': () => d && d.triggerDocSubmit(),
        'alt-f': () => d && d.openLedgerFinder(),
        'repeat-narration': () => d && d.repeatNarration(),
        'alt-2': () => d && d.duplicateCurrentVoucher(),
        'alt-d': () => d && d.openDayBook(),
        'alt-x': () => d && d.cancelCurrentVoucher(),
        'k-daybook': () => d && d.openDayBook(),
        'b-bs': () => frappe.set_route('query-report', 'Balance Sheet'),
        'p-pl': () => frappe.set_route('query-report', 'Profit and Loss Statement'),
        's-stock': () => frappe.set_route('query-report', 'Stock Balance'),
        'h-coa': () => frappe.set_route('Tree', 'Account'),
        'n-bank': () => frappe.set_route('workspaces', 'Payments'),
        'r-ratio': () => frappe.set_route('query-report', 'Financial Ratios'),
        'd-reports': () => frappe.set_route('workspaces', 'Financial Reports'),
        'o-dashboard': () => frappe.set_route('dashboard-view', 'Accounting'),
        't-todo': () => frappe.set_route('List', 'ToDo'),
        'alter-accounts': () => frappe.set_route('workspaces', 'Accounting'),
        'alt-w': () => d && d.addNoteToRecord && d.addNoteToRecord(),
        'ctrl-alt-s': () => d && d.syncNow && d.syncNow(),
        'f2-date': () => d && d.triggerDateChange(),
        'alt-f2-period': () => d && d.triggerPeriodChange(),
        'f3-company': () => d && d.switchCompanyDialog(),
        'f11-company': () => frappe.set_route('Form', 'Company', frappe.defaults.get_user_default('Company')),
        'f12-config': () => frappe.show_alert(__('Configuration profile loaded (F12)'), 1),
        'f1': () => this.showShortcutsGuide(),
        'esc': () => window.history.back()
      };

      if (actions[act]) {
        actions[act]();
      }
    }
  };

  window.AccountingFloatingDock = FloatingDock;
  FloatingDock.init();
})();
