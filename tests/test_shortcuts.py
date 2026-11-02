import unittest
import os

class TestTallyShortcutsPackage(unittest.TestCase):
    def setUp(self):
        self.base_dir = os.path.dirname(os.path.dirname(__file__))
        self.app_dir = os.path.join(self.base_dir, "tally_shortcuts")
        self.js_dir = os.path.join(self.app_dir, "public", "js")
        self.css_dir = os.path.join(self.app_dir, "public", "css")

    def test_package_structure(self):
        """Verify essential Frappe app files exist."""
        self.assertTrue(os.path.exists(os.path.join(self.app_dir, "__init__.py")))
        self.assertTrue(os.path.exists(os.path.join(self.app_dir, "hooks.py")))
        self.assertTrue(os.path.exists(os.path.join(self.app_dir, "modules.txt")))
        self.assertTrue(os.path.exists(os.path.join(self.base_dir, "pyproject.toml")))
        self.assertTrue(os.path.exists(os.path.join(self.base_dir, "README.md")))

    def test_hooks_registration(self):
        """Verify hooks.py correctly includes all CSS and JS assets."""
        hooks_file = os.path.join(self.app_dir, "hooks.py")
        with open(hooks_file, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("/assets/tally_shortcuts/css/tally_shortcuts.css", content)
        self.assertIn("/assets/tally_shortcuts/js/calculator.js", content)
        self.assertIn("/assets/tally_shortcuts/js/goto_search.js", content)
        self.assertIn("/assets/tally_shortcuts/js/keyboard_dispatcher.js", content)
        self.assertIn("/assets/tally_shortcuts/js/floating_dock.js", content)

    def test_js_assets_exist(self):
        """Verify public JavaScript assets exist."""
        for js_file in ["calculator.js", "goto_search.js", "keyboard_dispatcher.js", "floating_dock.js"]:
            p = os.path.join(self.js_dir, js_file)
            self.assertTrue(os.path.exists(p), f"Missing {js_file}")

    def test_css_assets_exist(self):
        """Verify public CSS asset exists."""
        p = os.path.join(self.css_dir, "tally_shortcuts.css")
        self.assertTrue(os.path.exists(p), "Missing tally_shortcuts.css")

if __name__ == "__main__":
    unittest.main()
