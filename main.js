import BaredomLogo from "./BaredomLogo.js";

// Initialize reactive variables for main content and sample code
Binder.set(window, {
  mainContent: "...loading",
  fixNav: false,
  showNav: false,
  navLis: undefined,
  sampleCode: false,
});

window.addEventListener("scroll", () => (_fixNav.value = window.scrollY > 150));

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
        onclick: (e) => {
          _showNav.value = !_showNav.value;
          e.stopPropagation();
        },
      },
      ul: {
        content: _navLis.as((items) => ({ li: items })),
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
  onclick: (e) => (_showNav.value = false),
});

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

    _navLis.value = DOM.get("h1, h2").map((heading) => {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        a: {
          text: heading.textContent,
          onclick: () =>
            scrollTo({
              top: heading.offsetTop - (_fixNav.value ? 0 : 120),
              behavior: "smooth",
            }),
        },
      };
    });
  });;
