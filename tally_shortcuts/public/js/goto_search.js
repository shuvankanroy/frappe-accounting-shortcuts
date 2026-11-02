/**
 * Tally Shortcuts: Universal Go To Search Palette (Alt+G)
 * Instant fuzzy launcher for all vouchers, reports, registers, and masters.
 */

(function () {
  'use strict';

  const GoToSearch = {
    NAV_ITEMS: [
      // Vouchers
      { title: 'Sales Invoice / Voucher (F8)', category: 'Voucher', action: () => frappe.new_doc('Sales Invoice') },
      { title: 'Purchase Invoice / Voucher (F9)', category: 'Voucher', action: () => frappe.new_doc('Purchase Invoice') },
      { title: 'Payment Voucher (F5)', category: 'Voucher', action: () => frappe.new_doc('Payment Entry', { payment_type: 'Pay' }) },
      { title: 'Receipt Voucher (F6)', category: 'Voucher', action: () => frappe.new_doc('Payment Entry', { payment_type: 'Receive' }) },
      { title: 'Contra Voucher (F4)', category: 'Voucher', action: () => frappe.new_doc('Payment Entry', { payment_type: 'Internal Transfer' }) },
      { title: 'Journal Voucher (F7)', category: 'Voucher', action: () => frappe.new_doc('Journal Entry') },
      { title: 'Credit Note / Sales Return (Alt+F6)', category: 'Voucher', action: () => frappe.new_doc('Sales Invoice', { is_return: 1 }) },
      { title: 'Debit Note / Purchase Return (Alt+F5)', category: 'Voucher', action: () => frappe.new_doc('Purchase Invoice', { is_return: 1 }) },
      { title: 'Stock Journal / Godown Transfer (Alt+F7)', category: 'Voucher', action: () => frappe.new_doc('Stock Entry', { purpose: 'Material Transfer' }) },
      { title: 'Delivery Note / Challan (Alt+F8)', category: 'Voucher', action: () => frappe.new_doc('Delivery Note') },
      { title: 'Receipt Note / Goods Receipt (Alt+F9)', category: 'Voucher', action: () => frappe.new_doc('Purchase Receipt') },
      { title: 'Sales Order (Ctrl+F8)', category: 'Voucher', action: () => frappe.new_doc('Sales Order') },
      { title: 'Purchase Order (Ctrl+F9)', category: 'Voucher', action: () => frappe.new_doc('Purchase Order') },
      { title: 'Physical Stock Reconciliation (Ctrl+F7)', category: 'Voucher', action: () => frappe.new_doc('Stock Reconciliation') },

      // Reports & Financials
      { title: 'Day Book (Alt+D / K)', category: 'Report', action: () => frappe.set_route('query-report', 'General Ledger', { from_date: frappe.datetime.nowdate(), to_date: frappe.datetime.nowdate() }) },
      { title: 'Trial Balance', category: 'Report', action: () => frappe.set_route('query-report', 'Trial Balance') },
      { title: 'Profit & Loss Statement (P)', category: 'Report', action: () => frappe.set_route('query-report', 'Profit and Loss Statement') },
      { title: 'Balance Sheet (B)', category: 'Report', action: () => frappe.set_route('query-report', 'Balance Sheet') },
      { title: 'Cash Flow Statement', category: 'Report', action: () => frappe.set_route('query-report', 'Cash Flow') },
      { title: 'Stock Summary (S)', category: 'Report', action: () => frappe.set_route('query-report', 'Stock Summary') },
      { title: 'Financial Ratio Analysis (R)', category: 'Report', action: () => frappe.set_route('query-report', 'Financial Ratios') },
      { title: 'Accounts Receivable Ageing', category: 'Report', action: () => frappe.set_route('query-report', 'Accounts Receivable') },
      { title: 'Accounts Payable Ageing', category: 'Report', action: () => frappe.set_route('query-report', 'Accounts Payable') },
      { title: 'General Ledger Drill-Down', category: 'Report', action: () => frappe.set_route('query-report', 'General Ledger') },

      // GST & Compliance
      { title: 'GST Sales Register', category: 'GST', action: () => frappe.set_route('query-report', 'GST Sales Register') },
      { title: 'GST Purchase Register', category: 'GST', action: () => frappe.set_route('query-report', 'GST Purchase Register') },
      { title: 'GSTR-3B Details', category: 'GST', action: () => frappe.set_route('query-report', 'GSTR-3B Details') },
      { title: 'GSTIN Status & Verification', category: 'GST', action: () => frappe.set_route('query-report', 'GSTIN Status') },
      { title: 'e-Way Bill Logs', category: 'GST', action: () => frappe.set_route('List', 'e-Waybill Log') },
      { title: 'e-Invoice Logs', category: 'GST', action: () => frappe.set_route('List', 'e-Invoice Log') },

      // Masters & Hubs
      { title: 'Chart of Accounts (H)', category: 'Master', action: () => frappe.set_route('Tree', 'Account') },
      { title: 'Customer List', category: 'Master', action: () => frappe.set_route('List', 'Customer') },
      { title: 'Supplier List', category: 'Master', action: () => frappe.set_route('List', 'Supplier') },
      { title: 'Item List / Inventory', category: 'Master', action: () => frappe.set_route('List', 'Item') },
      { title: 'Company Masters', category: 'Master', action: () => frappe.set_route('List', 'Company') }
    ],

    open: function () {
      let modal = document.getElementById('adt-goto-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'adt-goto-modal';
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 41, 30, 0.45);
          backdrop-filter: blur(2px);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 80px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
        `;
        modal.innerHTML = `
          <div style="background: #FFFFFF; width: 560px; max-width: 90vw; border-radius: 8px; box-shadow: 0 16px 36px rgba(0,0,0,0.3); overflow: hidden; border: 1.5px solid #065F46;">
            <div style="background: #065F46; color: #FFFFFF; padding: 10px 16px; font-weight: 700; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
              <span>⚡ Go To: Universal Accounting Search (Alt+G)</span>
              <span style="font-size: 11px; opacity: 0.8; cursor: pointer;" id="adt-goto-close-btn">✕ Esc</span>
            </div>
            <div style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; background: #F4FBF7;">
              <input type="text" id="adt-goto-input" placeholder="Type report, voucher, master or shortcut (e.g. sales, day book, p&l)..."
                style="width: 100%; border: 1.5px solid #065F46; border-radius: 4px; padding: 8px 12px; font-size: 14px; outline: none; box-sizing: border-box; background: #FFFFFF;" />
            </div>
            <div id="adt-goto-results" style="max-height: 380px; overflow-y: auto; padding: 6px 0;"></div>
            <div style="background: #F8FAFC; padding: 8px 16px; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between;">
              <span>↑/↓ Navigate &bull; Enter to Open &bull; Esc to Close</span>
              <span><strong>KhataOS & TallyPrime Parity</strong></span>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        this.bindEvents(modal);
      }

      modal.style.display = 'flex';
      const input = document.getElementById('adt-goto-input');
      input.value = '';
      input.focus();
      this.filterItems('');
    },

    close: function () {
      const modal = document.getElementById('adt-goto-modal');
      if (modal) modal.style.display = 'none';
    },

    bindEvents: function (modal) {
      const input = document.getElementById('adt-goto-input');
      const results = document.getElementById('adt-goto-results');
      const closeBtn = document.getElementById('adt-goto-close-btn');

      if (closeBtn) closeBtn.onclick = () => this.close();

      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });

      input.addEventListener('input', () => this.filterItems(input.value));

      input.addEventListener('keydown', (e) => {
        const items = results.querySelectorAll('.adt-goto-item');
        let selectedIdx = Array.from(items).findIndex(el => el.classList.contains('active'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (selectedIdx < items.length - 1) {
            if (selectedIdx >= 0) items[selectedIdx].classList.remove('active');
            items[selectedIdx + 1].classList.add('active');
            items[selectedIdx + 1].scrollIntoView({ block: 'nearest' });
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (selectedIdx > 0) {
            items[selectedIdx].classList.remove('active');
            items[selectedIdx - 1].classList.add('active');
            items[selectedIdx - 1].scrollIntoView({ block: 'nearest' });
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const activeEl = results.querySelector('.adt-goto-item.active');
          if (activeEl) activeEl.click();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        }
      });
    },

    filterItems: function (query) {
      const results = document.getElementById('adt-goto-results');
      const q = query.trim().toLowerCase();

      const matched = this.NAV_ITEMS.filter(it => {
        return !q || it.title.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
      });

      if (matched.length === 0) {
        results.innerHTML = `<div style="padding: 16px; text-align: center; color: #64748B; font-size: 13px;">No matching destination found.</div>`;
        return;
      }

      results.innerHTML = matched.map((it, idx) => `
        <div class="adt-goto-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          border-left: 3px solid transparent;
        ">
          <span style="color: #0F291E; font-weight: 500;">${it.title}</span>
          <span style="font-size: 10px; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; background: #EAF7EE; color: #065F46; font-weight: 600;">${it.category}</span>
        </div>
      `).join('');

      results.querySelectorAll('.adt-goto-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-idx'));
          const item = matched[idx];
          this.close();
          if (item && item.action) {
            item.action();
          }
        });
      });
    }
  };

  window.TallyGoTo = GoToSearch;
  window.AccountingGoTo = GoToSearch; // Compatibility alias
})();
