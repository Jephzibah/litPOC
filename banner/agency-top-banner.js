// bootstrap-banner.lit.js
import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";
import { unsafeHTML } from "https://cdn.jsdelivr.net/npm/lit@3/directives/unsafe-html.js";

/**
 * <bootstrap-banner>
 * - Shadow DOM scoped Bootstrap CSS (no leakage)
 * - Loads Bootstrap JS once per page (global), then initializes inside shadow
 * - Manual prev/next wiring for Shadow DOM
 * - Lifecycle cleanup (disconnectedCallback)
 * - Respects prefers-reduced-motion (disables auto sliding)
 */

let _bootstrapLoadPromise;
function loadBootstrapBundleOnce() {
  if (window.bootstrap) return Promise.resolve();
  if (_bootstrapLoadPromise) return _bootstrapLoadPromise;

  const existing = document.querySelector('script[data-bootstrap-bundle="5.3.0"]');
  if (existing) {
    _bootstrapLoadPromise = window.bootstrap
      ? Promise.resolve()
      : new Promise((resolve) =>
          existing.addEventListener("load", () => resolve(), { once: true })
        );
    return _bootstrapLoadPromise;
  }

  _bootstrapLoadPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    s.async = true;
    s.defer = true;
    s.dataset.bootstrapBundle = "5.3.0";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Bootstrap JS"));
    document.head.appendChild(s);
  });

  return _bootstrapLoadPromise;
}

const templateHTML = `
  <section id="page-banner" part="banner">
    <div class="container">
      <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel" aria-label="Avidia Health announcements">
        <div class="carousel-inner">

          <!-- New Slide 1 --> 
          <div class="carousel-item active" id="slide-1a" aria-roledescription="slide">
            <div class="row">
              <div class="col-12 border-end">
                <div class="text-container">
                  <img src="img/specSlideDiscount.svg" alt="$5 off at HSA store" />
                  <h2>USE Code <span>2026Save5</span></h2>
                  <p>Discover HSA eligible products made to keep you feeling good through the colder months.</p>
                  <a href="https://hsastore.com/?AFID=489825&GroupName=TPA&CID=437559&utm_source=Avidia+Bank&utm_medium=tpa+public+link+linktree&utm_campaign=TPA+Partner" target="_blank" rel="noopener">Shop Now</a>
                  <p class="offerDisclaimer">*Offer ends 12/31/26 at 5:59 a.m. ET.</p>
                </div>
              </div>
              <div class="specSlideImg">
                <img src="img/specSlideProducts.webp" alt="Max HSA Products" />
              </div>
            </div>
          </div>

          <div class="carousel-item" id="slide-1" aria-roledescription="slide">
            <div class="row">
              <div class="col-12 col-lg-5 border-end">
                <div class="text-container">
                  <img src="img/maxhsa-logo.png" alt="maxhsa logo" />
                  <h2>3 New Ways to Effortlessly Grow HSA Contributions</h2>
                  <a href="https://maxhsa.com/" target="_blank" rel="noopener">Learn More</a>
                </div>
              </div>
              <div class="col-12 col-lg-7">
                <div class="row">
                  <div class="col-12 col-md-4" id="newPerk1">
                    <img src="img/roundups.png" alt="Roundups On everyday purchases" width="200" class="img-fluid" />
                    <p><span>Roundups</span> On everyday purchases</p>
                  </div>
                  <div class="col-12 col-md-4" id="newPerk2">
                    <img src="img/cashback.png" alt="Cashback Rewards at thousands of retailers" width="200" class="img-fluid" />
                    <p><span>Cashback Rewards</span> at thousands of retailers</p>
                  </div>
                  <div class="col-12 col-md-4" id="newPerk3">
                    <img src="img/rewards.png" alt="Referral Rewards for spreading the word" width="200" class="img-fluid" />
                    <p><span>Referral Rewards</span>for spreading the word</p>
                  </div>
                </div>
                <p id="slide1offer">Use code <span>avidiahealth</span> when registering!</p>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item" id="slide-2" aria-roledescription="slide">
            <div class="row align-items-center">
              <div class="col-12 col-lg-4 text-center">
                <img src="img/AI-Fraudster.png"
                     alt="Illustration of a masked fraudster using a laptop with warning symbols"
                     class="img-fluid fraud-graphic">
              </div>
              <div class="col-12 col-lg-7">
                <h2>AI-Related Fraud on the Rise:</h2>
                <p>Avidia will <strong>NEVER</strong> ask you for a one-time passcode (OTP).<br>Do not share an OTP with anyone under any circumstances.</p>
                <p class="questions fw-bold mb-1">Questions?</p>
                <p>
                  Contact
                  <a href="mailto:HSAoperations@avidiabank.com" class="email-link">HSAoperations@avidiabank.com</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item" id="slide-3" aria-roledescription="slide">
            <div class="row">
              <div class="col-12 col-lg-3 border-end">
                <div class="text-container">
                  <h2><span>New HSA</span> Contribution Limits Announced</h2>
                </div>
              </div>
              <div class="col-12 col-lg-9">
                <div class="row">
                  <div class="col-12 col-md-4">
                    <img src="img/ah-2025.png" alt="2025 HSA contribution limits" width="200" class="img-fluid">
                  </div>
                  <div class="col-12 col-md-4">
                    <img src="img/ah-2026.png" alt="2026 HSA contribution limits" width="200" class="img-fluid">
                  </div>
                  <div class="col-12 col-md-4">
                    <img src="img/ah-catchup.png" alt="HSA catch-up contribution limits" width="200" class="img-fluid">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 4 -->
          <div class="carousel-item" id="slide-4" aria-roledescription="slide">
            <div class="row">
              <div class="col-12 col-md-8">
                <h2>Avidia Health Mobile App</h2>
                <div class="row justify-content-start">
                  <div class="col-12 col-lg-5">
                    <ul>
                      <li>Account Alerts</li>
                      <li>Track Expenses</li>
                      <li>Follow Investments</li>
                    </ul>
                  </div>
                  <div class="col-12 col-lg-5">
                    <ul>
                      <li>View Card Info</li>
                      <li>Customer Service</li>
                      <li>Profile Updates</li>
                    </ul>
                  </div>
                </div>
                <div class="row justify-content-lg-start justify-content-center">
                  <div class="col-auto col-lg-3">
                    <a href="https://apps.apple.com/us/app/avidiahealth-hsa/id760856884" target="_blank" rel="noopener">
                      <img src="img/AppleAppStore.png" alt="Download on the App Store" width="230" class="img-fluid store">
                    </a>
                  </div>
                  <div class="col-auto col-lg-3">
                    <a href="https://play.google.com/store/apps/details?id=com.avidia.fismobile&hl=en_US&gl=US&pli=1" target="_blank" rel="noopener">
                      <img src="img/Google-Play.png" alt="Get it on Google Play" width="230" class="img-fluid store">
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <img src="img/banner-slide-3.png" width="200" alt="Avidia Health app on phone" class="img-fluid phone">
              </div>
            </div>
          </div>

        </div>

        <!-- Controls (manual wiring due to Shadow DOM) -->
        <button class="carousel-control-prev" type="button" aria-label="Previous slide">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" aria-label="Next slide">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </section>
`;

const stylesCSS = `
  :host { display:block; }
  /* Banner shell */
  #page-banner {
    z-index: 10;
    position: relative;
    box-shadow: 0 10px 29px -6px rgb(32 27 79 / 59%);
    font-family: "Geometria", sans-serif;
    font-size: 16px;
  }
  #page-banner .container { max-width: unset; width: 100%; padding: 0; }

  /* Carousel frame */
  #carouselExampleControls { width: 100%; }
  #carouselExampleControls .row {
    display: flex; justify-content: center; align-items: center;
    width: 90%; max-width: 1400px; margin: 0 auto;
  }
  #carouselExampleControls .carousel-inner {
    position: relative; width: 100%; overflow: hidden; display: flex; align-items: stretch;
  }
  @media(max-width:991px) {
    #carouselExampleControls #slide-1 .col-lg-8 { margin-top: 1rem; }
  }
  #carouselExampleControls #slide-4 { align-items: end; }
  #carouselExampleControls #slide-4 .row.justify-content-lg-start.justify-content-center { padding-bottom: 1rem; }
  #carouselExampleControls .carousel-item {
    display: flex; justify-content: center; align-items: center;
  }
  #carouselExampleControls .carousel-control-next,
  #carouselExampleControls .carousel-control-prev {
    position: absolute; top: 0; bottom: 0; z-index: 1;
    display: flex; align-items: center; justify-content: center;
    width: 80px; padding: 0; color: #fff; background: transparent;
    border: 0; opacity: .5; transition: opacity .15s ease;
  }
  #carouselExampleControls .carousel-control-next-icon,
  #carouselExampleControls .carousel-control-prev-icon {
    background-size: cover; background-repeat: no-repeat; background-position: center;
    width: 7rem; height: 7rem;
  }

  /* Shared slide defaults + activation fade */
  #slide-1a { background-color: #201B4F; }
  #slide-1a .text-container {
    background-color: rgba(32, 27, 79, .8);
    display: table;
    width: auto;
  }
  @media screen and (min-width: 992px) {
    #slide-1a .border-end {
      background: url(../img/specSlideProducts.webp) right center/contain no-repeat;
    }
    #slide-1a .specSlideImg { display: none; }
  }
  @media screen and (max-width: 991px) {
    #slide-1a .text-container { margin: 0 auto 25px; }
  }
  #slide-1a .specSlideImg img { display: block; margin: auto; }
  #slide-1a img { width: 100%; max-width: 560px; margin-bottom: 2rem; }
  #slide-1a a {
    background: #FAA21D;
    width: 242px;
    height: 56px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #201B4F;
    text-align: center;
    font-family: Avenir;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: 28px; 
    text-transform: uppercase;
    text-decoration: none;
  }
  #slide-1a .offerDisclaimer {
    color: #FFF;
    font-family: Avenir;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    margin-top: 9px;
  }
  #slide-1a h2 {
    color: #FFF;
    margin-right: auto;
    display: table;
    width: auto;
    font-family: Avenir;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 13px;
  }
  #slide-1a h2 span{
    color: #faa21d;
    font-weight: 900;
    text-transform: uppercase;
  }
  #slide-1a p {
    color: #FFF;
    font-family: Avenir;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; 
    width: 100%;
    max-width: 472px;
  }

  #slide-1, #slide-2, #slide-3, #slide-4 {
    opacity: 0;
    font-family: "Geometria", sans-serif;
    font-size: 16px;
    transition: opacity .35s ease;
  }
  #slide-1.active, #slide-2.active, #slide-3.active, #slide-4.active { opacity: 1; }

  h2 {
    color: #201B4F;
    text-align: center;
    font-family: Geometria;
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  /* Slide 1 */
  #slide-1 { background-color: #201b4f; color: #fff; padding-block: 24px; }
  #slide-1 .text-container img { width: 186px; height: auto; margin-bottom: 30px; }
  #slide-1 .text-container a {
    border-radius: 9px;
    background: #FAA21D;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 177px;
    height: 37px;
    color: #FFF;
    text-align: center;
    font-family: Avenir;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 28px;
    text-transform: uppercase;
    margin-top: 20px;
  }
  #newPerk1, #newPerk2, #newPerk3 { text-align: center; }
  #slide-1 #newPerk1 p, #slide-1 #newPerk2 p, #slide-1 #newPerk3 p {
    color: #fff; text-align: center; font-family: Avenir; font-size: 26px;
    font-style: normal; font-weight: 500; line-height: 28px;
    margin: 33px auto 22px; display: block;
  }
  #slide-1 #newPerk1 p { max-width: 156px; }
  #slide-1 #newPerk2 p { max-width: 238px; }
  #slide-1 #newPerk3 p { max-width: 221px; }
  #newPerk1 span, #newPerk2 span, #newPerk3 span { color: #FAA21D; display: block; }
  #newPerk1 img { width: 146.662px; height: auto; }
  #newPerk2 img { width: 144.693px; height: auto; }
  #newPerk3 img { width: 140.756px; height: auto; }
  #slide1offer {
    color: #6F69AB;
    text-align: center;
    font-family: Avenir;
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    line-height: 28px; 
  }
  #slide1offer span { color: #faa21d; font-weight: 900; }

  /* Slide 2 */
  #slide-2 {
    background: linear-gradient(to right, #090823 0%, #13103b 50%, #201B4F 100%);
    color: #fff; padding-block: 40px;
  }
  #slide-2 .row { max-width: 1100px; margin: 0 auto; }
  #slide-2 h2 { color: #FAA21D; font-size: 40px; font-weight: 900; margin-bottom: 12px; }
  #slide-2 p { font-size: 20px; line-height: 1.3; margin: 0 0 12px; }
  #slide-2 .questions { font-size: 20px; font-weight: 700; }
  #slide-2 .email-link { color: #fff; text-decoration: underline; }

  /* Slide 3 */
  #slide-3 { background-color: #201b4f; color: #fff; }
  #slide-3 h2 { font-size: 50px; font-weight: 900; color: #fff; margin: 0; }
  #slide-3 h2 span { color: #faa21d; }
  #slide-3 .border-end { border-right: 1px solid #fff; }
  #slide-3 img { display: block; margin-inline: auto; }

  /* Slide 4 */
  #slide-4 {
    background: linear-gradient(#27204d, #6d6a93);
    color: #fff; padding-block: 40px 0;
  }
  #slide-4 .row { max-width: 1100px; margin: 0 auto; }
  #slide-4 h2 { font-size: 50px; line-height: 55px; font-weight: 900; color: #fff; margin-bottom: 16px; }
  #slide-4 ul { list-style: none; padding: 0; margin: 0; }
  #slide-4 li {
    background-image: url(https://mymagnoliarx.com/wp-content/uploads/2024/04/check-mark-yellow-bg.svg);
    background-repeat: no-repeat; background-position: 0 .2em; background-size: 20px;
    padding-left: 2.5em; margin-bottom: 10px; font-size: 20px; font-weight: 700;
  }
  #slide-4 .store { width: 100%; max-width: 230px; margin-block: 1rem; }
  #slide-4 .phone { display: block; margin: 0 0 0 auto; }

  @media (max-width: 991px) {
    #page-banner h2 { font-size: 130% !important; line-height: 1.2 !important; margin-bottom: 1rem !important; }
    #page-banner p  { font-size: 100% !important; line-height: 1.2 !important; margin-bottom: 1rem !important; }
    #carouselExampleControls .row { max-width: 80%; }
    #slide-3 { text-align: center; }
    #slide-4 h2 { text-align: center; }
    #slide-4 .row { max-width: 100%; padding: 0 1rem; }
    #slide-4 .store { max-width: 140px; }
    #slide-4 li { background-size: 16px; font-size: 16px; font-weight: 700; padding-left: 1.75em; }
    #slide-4 .phone { margin-bottom: -2rem !important; margin-top: 2rem !important; }
  }

  @media (max-width: 767px) {
    #page-banner h2, #page-banner p, #page-banner li, #page-banner span {
      font-size: 100% !important; line-height: 1.2 !important; margin-bottom: 1rem !important;
    }
    #page-banner img { width: 100%; height: auto; max-width: 150px; margin-bottom: 1rem; }
    #carouselExampleControls { text-align: center; }
    #carouselExampleControls .carousel-inner { height: auto; max-height: none; }
    #carouselExampleControls .carousel-item { display: block; }
    #carouselExampleControls .carousel-control-next,
    #carouselExampleControls .carousel-control-prev { width: 20px; }
    #slide-3 img { max-width: 100px; }
    #slide-4 .row { height: 100%; }
    #slide-4 li { text-align: left; font-size: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel-item { transition: none !important; }
  }
`;

export class BootstrapBanner extends LitElement {
  static properties = {
    /** allow overriding interval via attribute if you want later */
    interval: { type: Number, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.interval = 5000;

    this._carouselInstance = null;
    this._onPrev = null;
    this._onNext = null;
    this._bootstrapLink = null;
    this._styleTag = null;
  }

  /**
   * We inject <link> bootstrap + <style> into the shadow root after it's created
   * (this avoids Lit trying to sanitize/relocate link tags).
   */
  createRenderRoot() {
    const root = super.createRenderRoot();

    // Bootstrap CSS scoped to shadow
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

    // Your custom CSS (kept as-is)
    const customStyle = document.createElement("style");
    customStyle.textContent = stylesCSS;

    root.appendChild(bootstrapCSS);
    root.appendChild(customStyle);

    this._bootstrapLink = bootstrapCSS;
    this._styleTag = customStyle;

    return root;
  }

  render() {
    // Render the big template as-is (exercise-friendly).
    // If you want “real Lit”, next step is to convert to html`` with loops/data.
    return html`${unsafeHTML(templateHTML)}`;
  }

  firstUpdated() {
    // Shadow DOM exists + template rendered.
    loadBootstrapBundleOnce()
      .then(() => this._initCarousel())
      .catch((e) => console.error(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // remove listeners
    const prevBtn = this.renderRoot?.querySelector(".carousel-control-prev");
    const nextBtn = this.renderRoot?.querySelector(".carousel-control-next");
    if (prevBtn && this._onPrev) prevBtn.removeEventListener("click", this._onPrev);
    if (nextBtn && this._onNext) nextBtn.removeEventListener("click", this._onNext);
    this._onPrev = null;
    this._onNext = null;

    // dispose bootstrap carousel
    try {
      this._carouselInstance?.dispose?.();
    } catch (_) {}
    this._carouselInstance = null;
  }

  _initCarousel() {
    const carouselEl = this.renderRoot.querySelector("#carouselExampleControls");
    if (!carouselEl || !window.bootstrap) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const options = {
      interval: reduceMotion ? false : this.interval,
      ride: reduceMotion ? false : "carousel",
      pause: "hover",
      wrap: true,
    };

    this._carouselInstance = new window.bootstrap.Carousel(carouselEl, options);

    const prevBtn = this.renderRoot.querySelector(".carousel-control-prev");
    const nextBtn = this.renderRoot.querySelector(".carousel-control-next");

    this._onPrev = () => this._carouselInstance?.prev?.();
    this._onNext = () => this._carouselInstance?.next?.();

    prevBtn && prevBtn.addEventListener("click", this._onPrev);
    nextBtn && nextBtn.addEventListener("click", this._onNext);
  }
}

if (!customElements.get("bootstrap-banner")) {
  customElements.define("bootstrap-banner", BootstrapBanner);
}
