/**
 * Accounting Shortcuts PWA & Desktop Standalone Engine
 * Unlocks dedicated window mode, keyboard lock, and 1-click install.
 */

(function () {
  'use strict';

  let deferredPrompt = null;

  const PWAEngine = {
    isStandalone: false,

    init: function () {
      this.detectStandalone();
      this.injectManifestAndMeta();
      this.registerServiceWorker();
      this.listenInstallPrompt();
      this.injectInstallBadge();
      if (this.isStandalone) {
        this.enableKeyboardLock();
        this.applyStandaloneStyles();
      }
    },

    detectStandalone: function () {
      this.isStandalone = Boolean(
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')
      );
      if (this.isStandalone) {
        console.log('[AccountingShortcuts PWA] Running in Standalone Desktop Window Mode!');
      }
    },

    injectManifestAndMeta: function () {
      if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/assets/accounting_shortcuts/pwa/manifest.json';
        document.head.appendChild(link);
      }

      const metaTags = [
        { name: 'theme-color', content: '#065F46' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'mobile-web-app-capable', content: 'yes' }
      ];

      metaTags.forEach(tag => {
        if (!document.querySelector(`meta[name="${tag.name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = tag.name;
          meta.content = tag.content;
          document.head.appendChild(meta);
        }
      });
    },

    registerServiceWorker: function () {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/assets/accounting_shortcuts/pwa/sw.js')
            .catch(() => {});
        });
      }
    },

    listenInstallPrompt: function () {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        this.showInstallPromptButton();
      });

      window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (window.frappe && frappe.show_alert) {
          frappe.show_alert({
            message: __('🖥️ Installed as Desktop App!'),
            indicator: 'green'
          }, 4);
        }
      });
    },

    showInstallPromptButton: function () {
      const existing = document.getElementById('adt-pwa-install-btn');
      if (existing) {
        existing.style.display = 'inline-flex';
        return;
      }
      this.injectInstallBadge();
    },

    injectInstallBadge: function () {
      if (this.isStandalone) return;

      setInterval(() => {
        const navbar = document.querySelector('.navbar .container, .navbar-header, .standard-actions');
        if (navbar && !document.getElementById('adt-pwa-install-btn')) {
          const btn = document.createElement('div');
          btn.id = 'adt-pwa-install-btn';
          btn.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #064E3B;
            color: #FFFFFF;
            border: 1px solid #10B981;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 14px;
            cursor: pointer;
            margin-right: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            transition: all 0.2s ease;
          `;
          btn.innerHTML = `<span>🖥️ Install Desktop App</span>`;
          btn.title = 'Install as a dedicated chromeless Desktop Window';

          btn.addEventListener('mouseenter', () => { btn.style.background = '#047857'; });
          btn.addEventListener('mouseleave', () => { btn.style.background = '#064E3B'; });
          btn.addEventListener('click', () => { this.promptInstall(); });

          navbar.prepend(btn);
        }
      }, 2000);
    },

    promptInstall: function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
      } else {
        const d = new frappe.ui.Dialog({
          title: __('🖥️ Install Desktop App'),
          fields: [{ fieldtype: 'HTML', fieldname: 'install_info' }]
        });

        d.fields_dict.install_info.$wrapper.html(`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 6px;">
            <div style="display: flex; gap: 14px; align-items: center; background: #EAF7EE; border: 1px solid #A7F3D0; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
              <img src="/assets/accounting_shortcuts/pwa/icon.svg" style="width: 54px; height: 54px;" />
              <div>
                <h4 style="margin: 0 0 4px 0; color: #065F46; font-weight: 800; font-size: 15px;">Desktop Window Edition</h4>
                <div style="font-size: 12px; color: #374151;">Full-featured, zero-distraction desktop bookkeeping window.</div>
              </div>
            </div>

            <h5 style="font-weight: 700; color: #1E293B; font-size: 13px; margin-bottom: 8px;">How to Install in 2 Clicks:</h5>
            <ol style="font-size: 13px; line-height: 1.8; color: #334155; padding-left: 20px;">
              <li>Look at your browser's address bar (right side) and click the <strong>Install icon</strong> (<span style="font-size: 14px;">📥</span> or <span style="font-size: 14px;">🖥️</span>).</li>
              <li>Or click the <strong>Chrome Menu (⋮) &rarr; "Save and share" &rarr; "Install app..."</strong></li>
              <li>Click <strong>Install</strong>. Pro Accounting will launch immediately as an isolated native desktop window!</li>
            </ol>
          </div>
        `);
        d.show();
      }
    },

    enableKeyboardLock: function () {
      if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
        navigator.keyboard.lock(['KeyN', 'KeyW', 'KeyT', 'KeyP', 'Escape']).catch(() => {});
      }
    },

    applyStandaloneStyles: function () {
      const style = document.createElement('style');
      style.id = 'adt-pwa-standalone-styles';
      style.innerHTML = `
        body { user-select: text; -webkit-app-region: drag; }
        .navbar, .layout-main-section, .modal, #adt-calculator-panel, #adt-goto-modal { -webkit-app-region: no-drag; }
        #adt-pwa-install-btn { display: none !important; }
      `;
      document.head.appendChild(style);
    }
  };

  window.AccountingShortcutsPWA = PWAEngine;
  PWAEngine.init();
})();
