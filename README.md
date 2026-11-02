# Accounting Shortcuts for Frappe & ERPNext ⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Frappe Framework](https://img.shields.io/badge/Frappe-v15%20%7C%20v16-065F46.svg)](https://frappeframework.com)
[![ERPNext Compatibility](https://img.shields.io/badge/ERPNext-v15%20%7C%20v16-10B981.svg)](https://erpnext.com)

**Accounting Shortcuts** is a lightweight, zero-dependency Frappe app that brings **fast, zero-mouse keyboard accounting navigation** into ERPNext and Frappe Desk.

Empower accountants with high-speed voucher entry, a universal **Go To (<kbd>Alt</kbd>+<kbd>G</kbd>)** search palette, a sleek **compact floating dock**, an interactive **pop-out shortcut cheatsheet (<kbd>F1</kbd>)**, and an integrated **floating formula calculator (<kbd>Ctrl</kbd>+<kbd>N</kbd> / <kbd>Alt</kbd>+<kbd>C</kbd>)**.

---

## 🚀 Key Features

* **Universal Accept (<kbd>Ctrl</kbd>+<kbd>A</kbd>)**: Accept, save, and submit vouchers/dialogs instantly with automatic input focus flushing.
* **Instant Voucher Switching (<kbd>F4</kbd>–<kbd>F9</kbd>)**: Switch between Contra, Payment, Receipt, Journal, Sales, and Purchase vouchers without clicking.
* **Universal Go To Launcher (<kbd>Alt</kbd>+<kbd>G</kbd>)**: Instant fuzzy finder for any report, register, voucher, or master.
* **Integrated Accountant Calculator (<kbd>Ctrl</kbd>+<kbd>N</kbd> / <kbd>Alt</kbd>+<kbd>C</kbd>)**: Floating arithmetic scratchpad with 1-key result injection back into active currency/rate fields.
* **Sleek Compact Floating Capsule**: Minimal, non-intrusive floating pill at the bottom-right corner.
* **Pop-Out Shortcuts Guide (<kbd>F1</kbd>)**: Spacious dialog categorizing all Single-Key and Multi-Key functions with click-to-run functionality.
* **Gateway Single-Letter Keys**: Single-letter jump from Desk when no input is focused (`C` Create, `K` Day Book, `B` Balance Sheet, `P` Profit & Loss, `S` Stock Summary, `H` Chart of Accounts, `N` Banking).

---

## ⌨️ Complete Shortcut Reference Map

### 1. Single-Key Functions (Direct 1-Key Press)

#### Gateway / Desk Navigation *(When no text input is active)*
| Key | Destination / Action | Target / Handler |
|:---:|---|---|
| <kbd>C</kbd> | **Create Master** (Ledger, Group, Stock Item, Unit, Godown) | Quick Master Drawer |
| <kbd>A</kbd> | **Alter Accounts / Masters** | `/desk/accounting` |
| <kbd>H</kbd> | **Chart of Accounts** | Hierarchical Tree View (`Account`) |
| <kbd>V</kbd> | **Voucher Entry** | Payment Entry by default (`F4`–`F9` to switch) |
| <kbd>K</kbd> | **Day Book** | General Ledger filtered to today |
| <kbd>N</kbd> | **Banking Hub & BRS** | Bank Reconciliation & Statements Dashboard |
| <kbd>B</kbd> | **Balance Sheet** | Balance Sheet Report |
| <kbd>P</kbd> | **Profit & Loss A/c** | Profit and Loss Statement |
| <kbd>S</kbd> | **Stock Summary** | Inventory Stock Balance Summary |
| <kbd>R</kbd> | **Ratio Analysis** | Financial Ratios & Liquidity Analysis |
| <kbd>D</kbd> | **Report Directory** | Accounting Reports Hub |
| <kbd>O</kbd> | **Executive Dashboard** | Financial Dashboard |
| <kbd>T</kbd> | **Accountant Desk** | To-Dos & Due Dates Task Manager |
| <kbd>Q</kbd> | **Quit / Back** | Same as <kbd>Esc</kbd> (returns to previous view) |

#### Standard Function Keys
| Key | Function | Description |
|:---:|---|---|
| <kbd>F1</kbd> | **Pop-Out Shortcuts Guide** | Opens the comprehensive pop-out cheat sheet |
| <kbd>F2</kbd> | **Change Date** | Prompts to change voucher posting date |
| <kbd>F3</kbd> | **Switch Company** | Multi-company switcher dialog |
| <kbd>F4</kbd> | **Contra Voucher** | Cash deposit, cash withdrawal, or bank-to-bank transfer |
| <kbd>F5</kbd> | **Payment Voucher** | Vendor payments or operational expense vouchers |
| <kbd>F6</kbd> | **Receipt Voucher** | Customer collections or money inward |
| <kbd>F7</kbd> | **Journal Voucher** | Double-entry Dr/Cr adjustment voucher |
| <kbd>F8</kbd> | **Sales Invoice / Voucher** | Tax invoice with automatic taxes |
| <kbd>F9</kbd> | **Purchase Invoice / Voucher**| Vendor invoice / inward supply voucher |
| <kbd>F10</kbd>| **All Voucher Types** | Opens the universal voucher type picker |
| <kbd>F11</kbd>| **Company Setup** | Opens active company features and configurations |
| <kbd>F12</kbd>| **Screen Configuration** | Loads configuration profile for current screen |

#### Navigation & Stepping Keys
| Key | Function | Description |
|:---:|---|---|
| <kbd>Esc</kbd> | **Back / Close** | Closes active pop-outs, dialogs, or navigates back one level |
| <kbd>Enter</kbd> | **Next Field / Drill-Down** | Moves to next input; in reports, drills down into row voucher |
| <kbd>+</kbd> | **Step Period Forward** | In reports, shifts the date range forward by 1 month |
| <kbd>-</kbd> | **Step Period Backward** | In reports, shifts the date range backward by 1 month |

---

### 2. Multi-Key Functions (Key Combinations)

#### <kbd>Ctrl</kbd> + Key Combinations
| Shortcut | Action | Behavior |
|:---:|---|---|
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | **Universal Accept & Save** | Flushes active input focus and saves/submits voucher or dialog |
| <kbd>Ctrl</kbd>+<kbd>N</kbd> | **Accountant Calculator** | Opens floating formula scratchpad (evaluates expressions like `15400*1.18+250`) |
| <kbd>Ctrl</kbd>+<kbd>G</kbd> | **Switch To / Go To** | Same as <kbd>Alt</kbd>+<kbd>G</kbd> (opens universal search palette) |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | **Alter Master / Submit** | When on a Link field: alters master; on voucher: submits to General Ledger |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | **Delete Table Row** | Deletes line item under cursor in items table |
| <kbd>Ctrl</kbd>+<kbd>H</kbd> | **Change Voucher Mode** | Toggles between Item Invoice and Accounting/Service Invoice |
| <kbd>Ctrl</kbd>+<kbd>R</kbd> | **Repeat Narration** | Pulls narration from the last voucher of the same type/party |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> | **Print Tax Invoice** | Opens print format / system print dialog |
| <kbd>Ctrl</kbd>+<kbd>E</kbd> | **Export CSV** | Instant CSV export of active report |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | **Save Draft** | Saves changes without closing |
| <kbd>Ctrl</kbd>+<kbd>Q</kbd> | **Quit / Go Back** | Equivalent to <kbd>Esc</kbd> |
| <kbd>Ctrl</kbd>+<kbd>F8</kbd> | **Sales Order** | Creates a new Sales Order |
| <kbd>Ctrl</kbd>+<kbd>F9</kbd> | **Purchase Order** | Creates a new Purchase Order |
| <kbd>Ctrl</kbd>+<kbd>F7</kbd> | **Physical Stock** | Opens Stock Reconciliation |
| <kbd>Ctrl</kbd>+<kbd>F4</kbd> | **Payroll Entry** | Opens Payroll Voucher |

#### <kbd>Alt</kbd> + Key Combinations
| Shortcut | Action | Behavior |
|:---:|---|---|
| <kbd>Alt</kbd>+<kbd>G</kbd> | **Universal Go To Search** | Instant fuzzy finder for any report, register, voucher, or master |
| <kbd>Alt</kbd>+<kbd>F</kbd> | **Find Ledger** | Search for any account by name and open its statement |
| <kbd>Alt</kbd>+<kbd>C</kbd> | **Master / Calc Drawer** | In amount field: opens Calculator; in party/item: opens Quick Master Drawer |
| <kbd>Alt</kbd>+<kbd>2</kbd> | **Duplicate Voucher** | Clones current voucher as a new voucher with today's date |
| <kbd>Alt</kbd>+<kbd>D</kbd> | **Delete / Day Book** | In draft voucher: deletes voucher; on Desk: opens Day Book |
| <kbd>Alt</kbd>+<kbd>X</kbd> | **Cancel Voucher** | Cancels submitted voucher while preserving statutory sequence number |
| <kbd>Alt</kbd>+<kbd>A</kbd> | **Tax Analysis** | Line-by-line statutory tax breakdown (HSN, Taxable, CGST, SGST, IGST) |
| <kbd>Alt</kbd>+<kbd>R</kbd> | **Repeat Narration** | Narration repeater from previous voucher |
| <kbd>Alt</kbd>+<kbd>K</kbd> | **Company Menu** | Multi-company switcher dialog |
| <kbd>Alt</kbd>+<kbd>O</kbd> | **Import Menu** | Direct jump to Data Import (XML / Excel / CSV) |
| <kbd>Alt</kbd>+<kbd>E</kbd> | **Export Menu** | Export document to PDF / Excel / JSON |
| <kbd>Alt</kbd>+<kbd>P</kbd> | **Print Menu** | Prints Tax Invoice |

#### <kbd>Alt</kbd> + Function Keys
| Shortcut | Action | Behavior |
|:---:|---|---|
| <kbd>Alt</kbd>+<kbd>F2</kbd> | **Change Period** | Sets `From Date` and `To Date` period range |
| <kbd>Alt</kbd>+<kbd>F3</kbd> | **Select Company** | Switch active company |
| <kbd>Alt</kbd>+<kbd>F5</kbd> | **Debit Note / Detail** | In vouchers: Debit Note (Purchase Return); in reports: Detailed view |
| <kbd>Alt</kbd>+<kbd>F6</kbd> | **Credit Note** | Sales Return (`is_return: 1`) |
| <kbd>Alt</kbd>+<kbd>F7</kbd> | **Godown Transfer** | Stock Entry (`Material Transfer`) |
| <kbd>Alt</kbd>+<kbd>F8</kbd> | **Delivery Note** | Dispatch challan before billing |
| <kbd>Alt</kbd>+<kbd>F9</kbd> | **Receipt Note** | Goods receipt inward before billing |
| <kbd>Alt</kbd>+<kbd>F1</kbd> | **Detailed / Condensed** | Toggles grouping levels in Stock Summary and financial statements |

---

## 📦 Installation

To install **Accounting Shortcuts** on your Frappe / ERPNext site:

```bash
# 1. Fetch app into bench
bench get-app https://github.com/shuvankanroy/frappe-accounting-shortcuts.git

# 2. Install app on your target site
bench --site [your-site-name] install-app accounting_shortcuts

# 3. Build & clear cache
bench build --app accounting_shortcuts
bench --site [your-site-name] clear-cache
```

---

## 🛠️ Uninstallation

```bash
bench --site [your-site-name] uninstall-app accounting_shortcuts
bench remove-app accounting_shortcuts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Built with ❤️ for accounting professionals.
