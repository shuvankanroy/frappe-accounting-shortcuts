/**
 * Tally Shortcuts: Interactive Floating Dock & Details Drawer
 * Always-visible floating button bar with 1-click execution and expandable cheatsheet.
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
          dock.innerHTML = `
            <span class="adt-dock-pill" data-act="ctrl-a"><strong>Ctrl+A</strong> Save</span>
            <span class="adt-dock-pill" data-act="alt-g"><strong>Alt+G</strong> Go To</span>
            <span class="adt-dock-pill" data-act="f8"><strong>F8</strong> Sale</span>
            <span class="adt-dock-pill" data-act="f9"><strong>F9</strong> Purch</span>
            <span class="adt-dock-pill" data-act="f5"><strong>F5</strong> Pay</span>
            <span class="adt-dock-pill" data-act="f6"><strong>F6</strong> Recv</span>
            <span class="adt-dock-pill" data-act="f4"><strong>F4</strong> Contra</span>
            <span class="adt-dock-pill" data-act="f7"><strong>F7</strong> Journal</span>
            <span class="adt-dock-pill" data-act="calc"><strong>Ctrl+N</strong> Calc</span>
            <span class="adt-dock-pill" data-act="f1" style="background: #047857; padding: 2px 6px; border-radius: 4px; font-weight: 700;">F1 Shortcuts ▲</span>
          `;

          dock.querySelectorAll('.adt-dock-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
              e.stopPropagation();
              const act = pill.getAttribute('data-act');
              if (act === 'f1') {
                this.toggleDrawer();
              } else {
                this.executeAction(act);
              }
            });
          });

          dock.addEventListener('click', () => {
            this.toggleDrawer();
          });

          document.body.appendChild(dock);
        }
      }, 1500);
    },

    toggleDrawer: function () {
      let drawer = document.getElementById('adt-shortcut-details-drawer');
      if (!drawer) {
        drawer = this.createDrawer();
      }
      if (drawer.style.display === 'block') {
        drawer.style.display = 'none';
      } else {
        drawer.style.display = 'block';
      }
    },

    createDrawer: function () {
      const drawer = document.createElement('div');
      drawer.id = 'adt-shortcut-details-drawer';
      drawer.innerHTML = `
        <div style="background: #065F46; color: #FFFFFF; padding: 10px 16px; font-weight: 700; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
          <span>⚡ Tally & KhataOS Shortcut Command Center</span>
          <span style="cursor: pointer; font-size: 14px;" id="adt-drawer-close">✕</span>
        </div>
        <div style="padding: 12px 16px; overflow-y: auto; max-height: calc(80vh - 85px);">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <!-- Column 1: Vouchers -->
            <div>
              <div style="font-weight: 700; color: #065F46; font-size: 12px; margin-bottom: 6px; text-transform: uppercase; border-bottom: 1.5px solid #D1E7DD; padding-bottom: 2px;">Voucher Keys</div>
              <div class="adt-sc-list">
                <div class="adt-sc-row" data-action="f8"><kbd>F8</kbd> Sales Invoice</div>
                <div class="adt-sc-row" data-action="f9"><kbd>F9</kbd> Purchase Invoice</div>
                <div class="adt-sc-row" data-action="f5"><kbd>F5</kbd> Payment Voucher</div>
                <div class="adt-sc-row" data-action="f6"><kbd>F6</kbd> Receipt Voucher</div>
                <div class="adt-sc-row" data-action="f4"><kbd>F4</kbd> Contra Voucher</div>
                <div class="adt-sc-row" data-action="f7"><kbd>F7</kbd> Journal Voucher</div>
                <div class="adt-sc-row" data-action="alt-f6"><kbd>Alt+F6</kbd> Credit Note</div>
                <div class="adt-sc-row" data-action="alt-f5"><kbd>Alt+F5</kbd> Debit Note</div>
                <div class="adt-sc-row" data-action="alt-f7"><kbd>Alt+F7</kbd> Godown Transfer</div>
                <div class="adt-sc-row" data-action="ctrl-f8"><kbd>Ctrl+F8</kbd> Sales Order</div>
                <div class="adt-sc-row" data-action="ctrl-f9"><kbd>Ctrl+F9</kbd> Purchase Order</div>
                <div class="adt-sc-row" data-action="f10"><kbd>F10</kbd> All Voucher Types</div>
              </div>
            </div>

            <!-- Column 2: Tools & Masters -->
            <div>
              <div style="font-weight: 700; color: #065F46; font-size: 12px; margin-bottom: 6px; text-transform: uppercase; border-bottom: 1.5px solid #D1E7DD; padding-bottom: 2px;">Tools & Masters</div>
              <div class="adt-sc-list">
                <div class="adt-sc-row" data-action="ctrl-a"><kbd>Ctrl+A</kbd> Accept / Save</div>
                <div class="adt-sc-row" data-action="alt-g"><kbd>Alt+G</kbd> Go To Universal Search</div>
                <div class="adt-sc-row" data-action="calc"><kbd>Ctrl+N</kbd> Calculator (or Alt+C)</div>
                <div class="adt-sc-row" data-action="alt-c"><kbd>Alt+C</kbd> Quick Master Drawer</div>
                <div class="adt-sc-row" data-action="ctrl-enter"><kbd>Ctrl+Enter</kbd> Alter Master / Post</div>
                <div class="adt-sc-row" data-action="alt-f"><kbd>Alt+F</kbd> Find Ledger Statement</div>
                <div class="adt-sc-row" data-action="repeat-narration"><kbd>Ctrl+R</kbd> Repeat Narration</div>
                <div class="adt-sc-row" data-action="alt-2"><kbd>Alt+2</kbd> Duplicate Voucher</div>
                <div class="adt-sc-row" data-action="alt-d"><kbd>Alt+D</kbd> Delete Draft / Day Book</div>
                <div class="adt-sc-row" data-action="alt-x"><kbd>Alt+X</kbd> Cancel Voucher</div>
              </div>
            </div>

            <!-- Column 3: Gateway Single-Letters & Reports -->
            <div>
              <div style="font-weight: 700; color: #065F46; font-size: 12px; margin-bottom: 6px; text-transform: uppercase; border-bottom: 1.5px solid #D1E7DD; padding-bottom: 2px;">Gateway Single Keys</div>
              <div class="adt-sc-list">
                <div class="adt-sc-row" data-action="k-daybook"><kbd>K</kbd> Day Book (Alt+D)</div>
                <div class="adt-sc-row" data-action="b-bs"><kbd>B</kbd> Balance Sheet</div>
                <div class="adt-sc-row" data-action="p-pl"><kbd>P</kbd> Profit & Loss</div>
                <div class="adt-sc-row" data-action="s-stock"><kbd>S</kbd> Stock Summary</div>
                <div class="adt-sc-row" data-action="h-coa"><kbd>H</kbd> Chart of Accounts</div>
                <div class="adt-sc-row" data-action="n-bank"><kbd>N</kbd> Banking Hub & BRS</div>
                <div class="adt-sc-row" data-action="f2-date"><kbd>F2</kbd> Change Document Date</div>
                <div class="adt-sc-row" data-action="alt-f2-period"><kbd>Alt+F2</kbd> Change Period</div>
                <div class="adt-sc-row" data-action="f3-company"><kbd>F3</kbd> Switch Company (Alt+K)</div>
                <div class="adt-sc-row" data-action="esc"><kbd>Esc</kbd> Back / Close Drawer</div>
              </div>
            </div>
          </div>
        </div>
        <div style="background: #F8FAFC; padding: 6px 16px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B; display: flex; justify-content: space-between;">
          <span>💡 Click any shortcut above to run immediately, or use keyboard</span>
          <span><strong>Tally Shortcuts Addon</strong></span>
        </div>
      `;

      document.body.appendChild(drawer);

      drawer.querySelector('#adt-drawer-close').onclick = () => { drawer.style.display = 'none'; };

      drawer.querySelectorAll('.adt-sc-row').forEach(row => {
        row.addEventListener('click', () => {
          const act = row.getAttribute('data-action');
          drawer.style.display = 'none';
          this.executeAction(act);
        });
      });

      return drawer;
    },

    executeAction: function (act) {
      const d = window.TallyKeyboardDispatcher;
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
        'ctrl-f8': () => frappe.new_doc('Sales Order'),
        'ctrl-f9': () => frappe.new_doc('Purchase Order'),
        'f10': () => window.TallyGoTo && window.TallyGoTo.open(),
        'ctrl-a': () => d && d.triggerAccept(),
        'alt-g': () => window.TallyGoTo && window.TallyGoTo.open(),
        'calc': () => window.TallyCalculator && window.TallyCalculator.toggle(),
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
        's-stock': () => frappe.set_route('query-report', 'Stock Summary'),
        'h-coa': () => frappe.set_route('Tree', 'Account'),
        'n-bank': () => frappe.set_route('accounting-banking'),
        'f2-date': () => d && d.triggerDateChange(),
        'alt-f2-period': () => d && d.triggerPeriodChange(),
        'f3-company': () => d && d.switchCompanyDialog(),
        'esc': () => window.history.back()
      };

      if (actions[act]) {
        actions[act]();
      }
    }
  };

  window.TallyFloatingDock = FloatingDock;
  $(document).on('app_ready', function () {
    FloatingDock.init();
  });
})();
