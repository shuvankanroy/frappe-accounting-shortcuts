app_name = "tally_shortcuts"
app_title = "Tally Shortcuts"
app_publisher = "Shuvankan Roy"
app_description = "TallyPrime & KhataOS Keyboard Shortcuts, Universal Go To (Alt+G), Floating Calculator, and Action Dock for ERPNext & Frappe Framework"
app_email = "shuvankanroy@users.noreply.github.com"
app_license = "MIT"

# Includes in <head> of Desk
# ---------------------------
app_include_css = [
    "/assets/tally_shortcuts/css/tally_shortcuts.css"
]

app_include_js = [
    "/assets/tally_shortcuts/js/calculator.js",
    "/assets/tally_shortcuts/js/goto_search.js",
    "/assets/tally_shortcuts/js/keyboard_dispatcher.js",
    "/assets/tally_shortcuts/js/floating_dock.js"
]

# Required Apps
# -------------
required_apps = ["frappe"]
