app_name = "accounting_shortcuts"
app_title = "Accounting Shortcuts"
app_publisher = "Shuvankan Roy"
app_description = "Professional Keyboard-First Accounting Navigation, Universal Go To (Alt+G), Floating Calculator, and Action Dock for ERPNext & Frappe Framework"
app_email = "shuvankanroy@users.noreply.github.com"
app_license = "MIT"

# Includes in <head> of Desk
# ---------------------------
app_include_css = [
    "/assets/accounting_shortcuts/css/accounting_shortcuts.css"
]

app_include_js = [
    "/assets/accounting_shortcuts/js/calculator.js",
    "/assets/accounting_shortcuts/js/goto_search.js",
    "/assets/accounting_shortcuts/js/keyboard_dispatcher.js",
    "/assets/accounting_shortcuts/js/floating_dock.js"
]

# Required Apps
# -------------
required_apps = ["frappe"]
