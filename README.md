# Tally Shortcuts for Frappe & ERPNext ⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Frappe Framework](https://img.shields.io/badge/Frappe-v15%20%7C%20v16-065F46.svg)](https://frappeframework.com)
[![ERPNext Compatibility](https://img.shields.io/badge/ERPNext-v15%20%7C%20v16-10B981.svg)](https://erpnext.com)

**Tally Shortcuts** is a lightweight, zero-dependency Frappe app that brings **100% TallyPrime & [KhataOS](https://khataos.org/docs/guide/coming-from-tally/) keyboard-first navigation** into ERPNext and Frappe Desk.

Empower accountants with zero-mouse voucher entry, a universal **Go To (`Alt+G`)** search palette, an on-screen **floating action dock**, an expandable **interactive shortcut cheatsheet**, and an integrated **floating formula calculator (`Ctrl+N` / `Alt+C`)**.

---

## 🚀 Key Features

* **Universal Accept (<kbd>Ctrl</kbd>+<kbd>A</kbd>)**: Accept, save, and submit vouchers/dialogs instantly with automatic input flushing.
* **Instant Voucher Switching (<kbd>F4</kbd>–<kbd>F9</kbd>)**: Switch between Contra, Payment, Receipt, Journal, Sales, and Purchase vouchers without clicking.
* **Universal Go To Launcher (<kbd>Alt</kbd>+<kbd>G</kbd>)**: Instant fuzzy finder for any report, register, voucher, or master.
* **Integrated Accountant Calculator (<kbd>Ctrl</kbd>+<kbd>N</kbd> / <kbd>Alt</kbd>+<kbd>C</kbd>)**: Floating arithmetic scratchpad with 1-key result injection back into the active field.
* **Interactive Floating Action Dock**: Always-visible bottom-right dock with clickable pills for one-tap mouse execution or keyboard reference.
* **Expandable 3-Column Shortcut Drawer (<kbd>F1</kbd>)**: Slide-up palette categorizing Voucher Keys, Tools & Masters, and Gateway Single-Letters with click-to-run functionality.
* **Gateway Single-Letter Keys**: Single-letter jump from Desk when no input is focused (`C` Create, `K` Day Book, `B` Balance Sheet, `P` Profit & Loss, `S` Stock Summary, `H` Chart of Accounts, `N` Banking).

---

## ⌨️ Complete Shortcut Reference Map

### 1. Voucher Entry Keys

| Shortcut | Description | ERPNext Action |
|:---:|---|---|
| <kbd>F4</kbd> | Contra Voucher | Payment Entry (`Internal Transfer`) |
| <kbd>F5</kbd> | Payment Voucher | Payment Entry (`Pay`) |
| <kbd>F6</kbd> | Receipt Voucher | Payment Entry (`Receive`) |
| <kbd>F7</kbd> | Journal Voucher | Journal Entry |
| <kbd>F8</kbd> | Sales Invoice | Sales Invoice |
| <kbd>F9</kbd> | Purchase Invoice | Purchase Invoice |
| <kbd>Alt</kbd>+<kbd>F5</kbd> | Debit Note | Purchase Return (`is_return: 1`) |
| <kbd>Alt</kbd>+<kbd>F6</kbd> | Credit Note | Sales Return (`is_return: 1`) |
| <kbd>Alt</kbd>+<kbd>F7</kbd> | Stock Journal / Godown Transfer | Stock Entry (`Material Transfer`) |
| <kbd>Alt</kbd>+<kbd>F8</kbd> | Delivery Note / Challan | Delivery Note |
| <kbd>Alt</kbd>+<kbd>F9</kbd> | Goods Receipt Note | Purchase Receipt |
| <kbd>Ctrl</kbd>+<kbd>F8</kbd> | Sales Order | Sales Order |
| <kbd>Ctrl</kbd>+<kbd>F9</kbd> | Purchase Order | Purchase Order |
| <kbd>Ctrl</kbd>+<kbd>F7</kbd> | Physical Stock Reconciliation | Stock Reconciliation |
| <kbd>F10</kbd> | All Voucher Types | Open Universal Go To Selector |

### 2. Tools, Masters & Actions

| Shortcut | Description | Behavior |
|:---:|---|---|
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Universal Accept | Saves active form, dialog, or voucher |
| <kbd>Alt</kbd>+<kbd>G</kbd> / <kbd>Ctrl</kbd>+<kbd>G</kbd> | Go To Palette | Universal fuzzy search modal |
| <kbd>Ctrl</kbd>+<kbd>N</kbd> / <kbd>Alt</kbd>+<kbd>C</kbd> | Accountant Calculator | Floating formula calculator in amount fields |
| <kbd>Alt</kbd>+<kbd>C</kbd> | Create Master Inline | Opens quick creation drawer in party/item fields |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | Alter Master / Post | Opens master under cursor or submits voucher |
| <kbd>Alt</kbd>+<kbd>F</kbd> | Find Ledger Statement | Quick popup to open statement for any account |
| <kbd>Ctrl</kbd>+<kbd>R</kbd> / <kbd>Alt</kbd>+<kbd>R</kbd> | Repeat Narration | Pulls narration from the last voucher for party |
| <kbd>Alt</kbd>+<kbd>2</kbd> | Duplicate Voucher | Copies current voucher with today's date |
| <kbd>Alt</kbd>+<kbd>D</kbd> | Delete Draft | Prompts and deletes current draft voucher |
| <kbd>Alt</kbd>+<kbd>X</kbd> | Cancel Voucher | Prompts and cancels submitted voucher |
| <kbd>F1</kbd> | Shortcut Drawer | Toggles 3-column floating shortcut palette |
| <kbd>Esc</kbd> / <kbd>Ctrl</kbd>+<kbd>Q</kbd> | Go Back / Close | Closes drawers/modals or goes back one view |

### 3. Gateway Single-Letter Navigation (When no input is focused)

| Key | Destination | Target Route |
|:---:|---|---|
| <kbd>C</kbd> | Create Master | Quick Master Drawer |
| <kbd>A</kbd> | Alter Accounts | `/desk/accounting` |
| <kbd>H</kbd> | Chart of Accounts | Tree View (`Account`) |
| <kbd>V</kbd> | Voucher Entry | Payment Entry (`F4`–`F9` switch) |
| <kbd>K</kbd> | Day Book | General Ledger (filtered to today) |
| <kbd>N</kbd> | Banking Hub | Banking & BRS Dashboard |
| <kbd>B</kbd> | Balance Sheet | Balance Sheet Report |
| <kbd>P</kbd> | Profit & Loss | Profit & Loss Statement |
| <kbd>S</kbd> | Stock Summary | Stock Summary Report |
| <kbd>R</kbd> | Ratio Analysis | Financial Ratios Report |
| <kbd>D</kbd> | Report Directory | Accounting Reports Hub |
| <kbd>O</kbd> | Dashboard | Financial Dashboard |
| <kbd>T</kbd> | To-Dos & Due Dates | Accountant Task List |
| <kbd>F2</kbd> | Change Date | Changes voucher date |
| <kbd>Alt</kbd>+<kbd>F2</kbd> | Change Period | Changes report period range |
| <kbd>F3</kbd> | Switch Company | Multi-company selector modal |
| <kbd>+</kbd> / <kbd>-</kbd> | Step Period | Moves report period by month/quarter |

---

## 📦 Installation

To install **Tally Shortcuts** on your Frappe / ERPNext site:

```bash
# 1. Fetch app into bench
bench get-app https://github.com/shuvankanroy/frappe-tally-shortcuts.git

# 2. Install app on your target site
bench --site [your-site-name] install-app tally_shortcuts

# 3. Build & clear cache
bench build --app tally_shortcuts
bench --site [your-site-name] clear-cache
```

---

## 🛠️ Uninstallation

If you ever wish to remove the app:

```bash
bench --site [your-site-name] uninstall-app tally_shortcuts
bench remove-app tally_shortcuts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Built with ❤️ for accountants moving from TallyPrime & BUSY to Frappe & ERPNext.
