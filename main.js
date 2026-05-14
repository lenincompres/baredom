// Initialize reactive variables for main content and sample code
Binder.set(window, {
  mainContent: "...loading",
  mainNav: undefined,
  fixNav: false,
  showNav: false,
  sampleCode: false,
});

// Custom element for the BareDOM logo with dynamic styling and behavior
class BaredomLogo extends HTMLElement {
  constructor(fontSize = "1em") {
    super();
    const gColors = ["fg", "code-bg"];
    Binder.set(this, {
      bigColor: 1,
      light: true,
    });
    this.set({
      css: {
        fontSize: fontSize,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "4em",
        height: "3.8em",
        margin: "0 auto",
        fontFamily: "'ui-monospace', SFMono-Regular, Menlo, monospace",
        borderRadius: "0.3em",
        verticalAlign: "middle",
        big: {
          lineHeight: "1em",
          fontSize: "2em",
          pointerEvents: "none",
          fontWeight: "light",
        },
        span: {
          margin: "0 -0.3em",
          lineHeight: "2em",
          fontWeight: "bolder",
          pointerEvents: "none",
        },
      },
      transition: "0.5s",
      backgroundColor: this._light.as((v) => `var(--${gColors[v ? 0 : 1]})`),
      color: this._light.as((v) => `var(--${gColors[v ? 1 : 0]})`),
      big: {
        transition: "0.5s",
        color: this._bigColor.as((v) => `var(--accent${v})`),
        text: "{",
      },
      span: "DOM",
      big_: {
        transition: "0.5s",
        color: this._bigColor.as((v) => `var(--accent${v})`),
        text: "}",
      },
    });
    setInterval(() => this.reset(), 2000);
    this.reset();
  }

  reset() {
    this.light = Math.random() > 0.5;
    this.bigColor = Math.ceil(Math.random() * 3);
  }
}
customElements.define("baredom-logo", BaredomLogo);

// Set up the basic structure of the page
DOM.set({
  header: {
    figure: new BaredomLogo("1.5em"),
    nav: {
      class: {
        fixed: _fixNav,
        show: _showNav,
      },
      a_hamburger: {
        text: "☰",
        ariaLabel: "Toggle Navigation",
        onclick: () => (_showNav.value = !_showNav.value),
      },
      ul: {
        content: _mainNav.as((items) => ({ li: items })),
      },
    },
  },
  main: {
    content: _mainContent,
  },
  aside: {
    display: _sampleCode.as((v) => (v ? "flex" : "none")),
    onclick: () => (sampleCode = false),
    a_close: {
      ariaLabel: "Close Sample",
      onclick: () => (sampleCode = false),
    },
    iframe: {
      srcdoc: _sampleCode.as(
        (code) =>
          `<html><head><script src="./DOM.js"><\/script><\/head><body><script>let someElement=DOM.let('section',{},true);${code}<\/script><\/body><\/html>`,
      ),
      onclick: (e) => e.stopPropagation(),
    },
  },
  footer: {
    p: {
      span: [
        "Made by ",
        {
          tag: "a",
          href: "http://lenino.net",
          text: "Lenin Comprés",
          target: "_blank",
        },
        " using BareDOM.",
      ],
    },
  },
});

window.addEventListener("scroll", () => (_fixNav.value = window.scrollY > 150));

_mainContent
  .fetch("./README.md", {
    transform: (md) => marked.parse(md),
  })
  .onChange(() => {
    DOM.get("pre").forEach(
      (pre) =>
        !!pre.get(".language-js") &&
        pre.set({
          a_run: {
            ariaLabel: "Run Sample",
            onclick: () => (sampleCode = pre.textContent),
          },
        }),
    );

    _mainNav.value = DOM.get("h1, h2").map((heading) => {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        a: {
          text: heading.textContent,
          onclick: () => {
            _showNav.value = false;
            scrollTo({
              top: heading.offsetTop - (_fixNav.value ? 0 : 120),
              behavior: "smooth",
            });
          },
        },
      };
    });
  });
