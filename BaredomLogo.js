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

export default BaredomLogo;