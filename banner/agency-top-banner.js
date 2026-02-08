import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";

class AgencyTopBanner extends LitElement {
  static properties = {
    bannerId: { type: String, attribute: "banner-id" },
    message: { type: String },
    ctaText: { type: String, attribute: "cta-text" },
    ctaUrl: { type: String, attribute: "cta-url" },
    _hidden: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .bar {
      min-height: var(--agency-banner-height, 56px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 14px;
      gap: 12px;

      background: var(--agency-banner-bg, #0b1f3a);
      color: var(--agency-banner-text, #ffffff);
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      line-height: 1.2;
    }

    .inner {
      width: min(1200px, 100%);
      display: grid;
      grid-template-columns: 1fr auto auto;
      align-items: center;
      gap: 12px;
    }

    .msg {
      font-size: 14px;
    }

    a.cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 12px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;

      background: var(--agency-banner-cta-bg, #ffffff);
      color: var(--agency-banner-cta-text, #0b1f3a);
      white-space: nowrap;
    }

    button.close {
      appearance: none;
      border: 0;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 10px;
      line-height: 1;
      font-size: 18px;
      opacity: 0.9;
    }

    button.close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.12);
    }

    @media (max-width: 700px) {
      .inner {
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
        align-items: start;
      }

      .msg {
        grid-column: 1 / -1;
      }

      button.close {
        grid-row: 1;
        grid-column: 2;
        justify-self: end;
      }
    }
  `;

  constructor() {
    super();
    this.bannerId = "v1";
    this.message = "";
    this.ctaText = "Learn more";
    this.ctaUrl = "#";
    this._hidden = false;
  }

  get _storageKey() {
    // Stable + versionable: change banner-id to force re-show
    return `agencyBanner:dismissed:${this.bannerId || "v1"}`;
  }

  // connectedCallback() {
  //   super.connectedCallback();

  //   // If dismissed, hide immediately (and collapse reserved slot via <html> class if you included it)
  //   try {
  //     if (localStorage.getItem(this._storageKey) === "1") {
  //       this._hidden = true;
  //     }
  //   } catch (e) {}
  // }

  _dismiss() {
    this._hidden = true;

    // Collapse the reserved slot immediately for THIS page too (no waiting)
    try {
      document.documentElement.classList.add("agency-banner-dismissed");
      localStorage.setItem(this._storageKey, "1");
    } catch (e) {}

    this.dispatchEvent(
      new CustomEvent("agency-banner-dismissed", {
        bubbles: true,
        composed: true,
        detail: { bannerId: this.bannerId },
      })
    );
  }

  render() {
    if (this._hidden) return html``;

    return html`
      <div class="bar" role="region" aria-label="Announcement">
        <div class="inner">
          <div class="msg">${this.message}</div>
          <a class="cta" href=${this.ctaUrl}>${this.ctaText}</a>
          <button class="close" @click=${this._dismiss} aria-label="Dismiss banner">
            ×
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("agency-top-banner", AgencyTopBanner);
