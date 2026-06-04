# BareDOM
The DOM, unbound.

```js
document.body.set({
  h1: 'Hello world'
});
```

BareDOM is a minimalist JavaScript approach to building interfaces directly on the DOM—without frameworks, virtual DOMs, or template languages.

It extends native DOM elements with a small set of methods to **declare structure, behavior, and bindings in plain JavaScript**.

No JSX. No template languages. No framework components. No code switching. No separate HTML or CSS—unless you want them.

### The Bare Philosophy
BareDOM was born from a simple realization: the browser is already a powerful UI engine. We don’t need to replace it; we need to unlock it. 

After 6 years of "silent" production use, BareDOM is being shared as a response to the modern complexity crisis. It is designed for:
* **The Interface Purist:** Who wants to spend time on UX, not build configurations.
* **The Agentic Future:** Providing clean, semantic, and native structures that AI agents can actually understand and navigate.
* **Longevity:** Zero dependencies means your code will run as long as the browser exists.

## Mental Model

Structure is declared. Behavior is bound. Reuse emerges.

BareDOM is built on four ideas:

- **Binder** → one reactive value
- **Elements** → extend into reusable, stateful patterns
- **element.set()** → declares structure, behavior, bindings—even attributes and styles.
- **DOM.set()** → initializes the document (head + body)

BareDOM does not introduce a second rendering system. It extends the DOM directly.

### Other Element extensions

- `DOM.let()` → create and return elements  
- `Binder.set()` → create reactive values, setters, and getters
- `element.get()` → read from the DOM  
- and additional utility methods

BareDOM is a thin layer over the browser platform—not a framework abstraction.

## Why BareDOM?

BareDOM is for developers who wants direct control over the DOM with minimal abstraction.

### The Browser Is Already a Runtime

Modern frontend development often depends on heavy build pipelines, framework runtimes, and hydration systems. BareDOM takes a different approach: it works directly with the primitives the browser already provides—rendering, events, styling, and modules—making them more expressive without building another layer on top of them.

- **Direct:** No Virtual DOM or diffing.
- **Pure:** No template languages or JSX.
- **Instant:** No compilation or build steps.

```js
const data = [{name: 'Monica'}, {name: 'Ross'}, {name: 'Rachel'}, {name: 'Chandler'}, {name: 'Phoebe'}, {name: 'Joey'}];

const friendsList = DOM.let('section', {
  h2: 'Friends',
  ul: {
    li: data.map(d => d.name)
  }
});

document.body.set({
  section: friendsList,
});
```

This runs directly in the browser — from a CDN or a static HTML file — without compilation, JSX, bundling, virtual DOMs, or server-side rendering.

> The DOM is the render tree.</br>
> JavaScript is the template language.</br>
> JSON is the content layer.</br>
> The browser is the platform.

This makes BareDOM naturally compatible with structured content systems, semantic metadata, and machine-readable web architectures.

### Universal Compatibility

Unlike components in React or Vue, which are trapped within their respective ecosystems, **BareDOM components are native Web Components.**

Because BareDOM works by extending the standard `HTMLElement` class, any component you build is a standards-compliant Custom Element. This means:
* **Framework Agnostic:** Use your BareDOM components inside React, Angular, or Svelte projects.
* **Future-Proof:** Your code relies on the browser's native API, ensuring it will work for years without "breaking changes" from a framework maintainer.
* **Zero Glue Code:** You don't need "wrappers" or "adapters" to make a BareDOM element work in a standard HTML page.

## Getting Started

### Browser

```html
<script src="https://cdn.jsdelivr.net/gh/lenincompres/baredom@latest/DOM.min.js"></script>
```

### Local Download

Download from [github.com/lenincompres/baredom](https://github.com/lenincompres/baredom)

- `DOM.min.js`
- `DOM.js`
- GitHub Releases

Then:

```html
<script src="DOM.js"></script>
```

BareDOM can run directly in the browser with a single script include.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/gh/lenincompres/baredom@latest/DOM.js"></script>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

### Quick Start

A reactive value:

```js
const _count = new Binder(0);

document.body.set({
  h1: {
    text: _count.as(c => `Count: ${c}`),
  },
  button: {
    text: 'Increment',
    onclick: () => _count.value++
  }
});
```

> Not vanilla. Bare.

## Building the UI

`DOM.set()` initializes and renders the document. It:
- renders elements
- configures `<head>` and `<body>`
- applies the BareDOM CSS reset

```js
DOM.set({
  title: 'My App',
  main: {
    h1: 'Hello World',
    p: 'Lorem ipsum…'
  }
});
```

`DOM.set()` is intended as a document-level initializer.

You may also invoke the `set` method directly on an element to model it:

```js
const mainContent = DOM.let('main', {
  h2: 'Hello world',
  p: 'Lorem  ipsum…',
});

document.body.set({
  header: {
    h1: 'Sample Code',
  },
  main: mainContent,
  footer: 'This is BareDOM.',
});
```
The new **h3** and **p** elements will be appended to the element.

In this case, no CSS reset is applied.

<details>
  <summary>More ways to use DOM.set</summary>
  
  You may provide `DOM.set()` with an element where the model structure should be created.

```js
DOM.set(
  {
    h1: 'Hello world',
    p: 'This <b>is</b> a paragraph.',
  },
  someElement
);
```

You may also provide a `string` to indicate the tag for a new element where the DOM structure will be created.
The following example creates a `main` element inside the `someElement`. It returns this `main` element.

```js
DOM.set({
  h1: 'Hello world',
  p: 'This is <b>a</b> paragraph.';
}, 'main', someElement);
```

`DOM.set()` is agnostic about the order of the arguments that follow the first (model structure):

- An **element** is where the model should be created instead of `document.body`.
- A **string** is a tag for a new element to be created.

The following code creates and returns a main element, and adds it to the document body.

```js
let mainElement = DOM.set(
  {
    h1: 'Hello world',
    p: 'This is <b>a</b> paragraph.',
  },
  'main'
);
```

The following code creates an image element without adding it to the document body.

```js
let mainImage = DOM.set(
  {
    alt: 'Hello world',
    src: 'myImage.png',
  },
  'img',
  false,
);
```

For `DOM.set()`, a boolean argument with a *false* value indicates that this element should not be appended to the document body. A value of *true* would mean that the element (and/or model) will replace all the current content in the DOM (or in the element invoking the **set** method).

Models may contain properties for tags and ids, and a children or element array of similar or different elements.

```js
const model = {
  tag: 'div',
  id: 'container',
  children: [
    {
      tag: 'h1',
      innerHTML: 'Hello, World!'
    },
    {
      tag: 'p',
      innerHTML: 'This is a paragraph.'
    }
  ]
};

document.body.set(model);
```

</details>

### Properties: Attributes, Events and listeners

The **set** method recognizes **properties** in the model structure, such as attributes or event handlers. You may use a unique name that will become the element's id, and indicate the tag as a key property. Or, use a selector style name, which may even include classes separated by periods.

```js
document.body.set({
  input: {
    id: 'myInput',
    placeholder: 'Type value here',
    onchange: (event) => alert(myInput.value),
    click: (event) => alert('It recognizes event types to add listeners; as well as event methods.'),
  },
  goBtn: {
    tag: 'button',
    class: 'green-button',
    innerText: 'Go',
    addEventListener: {
      type: 'click',
      listener: (event) => (myInput.value = 'Go Button clicked'),
    },
  },
  'button#cancelBtn.red-button': {
    text: 'Cancel',
    onclick: (event) => alert('The cancel button was clicked'),
  }
});

goBtn.style.border = 'solid 2px lime';
```

NOTE:

- Providing an element with an `id` will create a global variable (with that name) to hold that element.
- Use `text` or `innerText`, `html` or `innerHTML`, or simply `content` for the element's inner content.
- Use `markdown` or `md` for HTML markdown inline notations (bold, italics, and links).

The **set** method allows you to modify attributes, styles, event handlers, and content of existing elements with just one call.

```js
someElement.set({
  padding: '0.5em 2em',
  backgroundColor: 'tan',
  text: 'Some text',
});
```

### Classes

You can set up the class attribute of the element passing a string to replace its content.

```js
someElement.set({
  class: 'my-classname other-classname',
});
```

Or, use an array, to add classes to the classList without replacing existing ones.

```js
someElement.set({
  class: ['my-classname', 'other-classname'],
});
```

You may also use an object to add or remove a class.

```js
someElement.set({
  class: {
    classname: false, // this removes the class 'classname'
    'other-classname': true, // this adds the class
    'yet-another': isAnother, // this adds or removes depending of the truthy o falsy value of isAnother
  },
});
```

### Creating an Element

`DOM.let()` creates elements without attaching them to the DOM.

```js
const myParagraph = DOM.let('p', {
  padding: '0.5em 2em',
  backgroundColor: 'lavender',
  text: 'Some text',
});

document.body.set({
  header: {
    h1: 'loading an element',
    p: 'The element was create before the DOM is set.',
  },
  main: {
    p: myParagraph,
  },
});
``` 

### Setting the Head

Just as with any element, you may invoke the **set** method on the head element. Many of its properties can be set directly. It will even link fonts and make them available as font-family styles.

```js
document.head.set({
  title: 'Title of the webpage',
  charset: 'UTF-8',
  icon: 'icon.ico',
  keywords: 'website,multiple,keywords',
  description: 'Website created with BareDOM',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  meta: {
    name: 'color-scheme',
    content: 'dark',
  },
  link: {
    rel: 'style',
    href: 'style.css',
  },
  style: {
    type: 'css',
    content: 'body{ margin:0; background-color:gray; }',
  },
  script: {
    type: 'module',
    src: 'main.js',
  },
  font: {
    fontFamily: 'myFont',
    src: 'fonts/myFont.ttf',
  },
});

document.body.set({
  h1: 'Hello world'
});
```

The **set** method also understands default values for properties like `link`, `style`, `font`, or `script` elements; and accepts arrays of elements for them.

```js
document.head.set({
  link: 'style.css',
  style: 'h1{ color:rosybrown; background-color: brown; }',
  script: ['main.js', 'lib/dependecies.js'],
  font: [
    'fonts/myFont.ttf',
    {
      fontFamily: 'aFont',
      src: 'fonts/anotherName.ott',
    },
  ],
});

document.body.set({
  h1: 'Hello world'
});
```

Note how **set** recognizes common head information (icon, charset, keywords, description, etc).
In fact, the `DOM.set()` method recognizes these as well, and adds them on the `document.head` instead of the `body`.

```js
const myHeader = DOM.let('header', {
  h1: 'Page built with DOM.set',
});

const myMain = DOM.let('main', {
  article: {
    h2: 'Basic DOM element',
    p: '<b>This</b> is a paragraph.',
  },
});

const myFooter = DOM.let('footer', {
  p: 'Made with BareDOM',
});

const CSS = {
  body: {
    padding: '2em',
    h: {
      color: 'navy',
      margin: '0.5em 0',
    },
    p: {
      margin: '1em 0',
    }
  },
};

DOM.set({
  title: 'Title of the webpage',
  charset: 'UTF-8',
  icon: 'icon.ico',
  keywords: 'website,multiple,keywords',
  description: 'Website created with BareDOM',
  css: CSS,
  header: myHeader,
  main: myMain,
  footer: myFooter,
});
```

### Setting an Array of Elements

Use arrays to create multiple consecutive elements of the same kind.

```js
someElement.set({
  ul: {
    li: ['First item', 'Second item', 'A third one, for good measure'],
  },
});
```

Declaring the array inside a `content` property allows you to set other properties for all the elements in the array.

```js
someElement.set({
  ul: {
    li: {
      id: 'listedThings',
      style: 'font-weight:bold',
      height: '20px ',
      content: ['first item', 'second item', 'a third for good meassure'],
    },
  },
});

// The following makes the second element yellow
listedThings[1].set({
  backgroundColor: 'yellow',
});
```

When an `id` is provided, a global variable holding the array of elements is created.
If you give several elements the same `id`, `set()` will group them in one global array.

Arrays can create consecutive elements of different types; just indicate their `tag` as a property.

```js
document.body.set({
  main: {
    elements: [
      {
        tag: 'p',
        text: 'This is a paragraph.',
      },
      {
        tag: 'img',
        src: '{DOM}_icon.png',
        alt: 'This one is an image',
      },
      {
        tag: 'p',
        text: 'This is another paragraph',
      },
    ],
  },
});
```

You can name these elements anything—in this case, they were named `elements`—; another recommended name is `children`. Each will be assigned a specified tag. But, you must avoid using known property names like: `content`, `margin`, `text`, etc. Using a plural word for the property helps avoid this mistake.

Similarly, if you give DOM.set an array, it assumes it is an array of elements, and will create them as *div*s, or any tag property they possess.

```js
document.body.set([
  {
    tag: 'p',
    text: 'This is a paragraph.',
  },
  {
    tag: 'img',
    src: '{DOM}_icon.png',
    alt: 'This one is an image',
  },
  {
    tag: 'p',
    text: 'This is another paragraph',
  },
]);
```
### Element Class and Component Architecture

BareDOM allows you to build modular, reusable components by expanding the HTMLElement class. Here's an example:

```js
class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.set({
      h2: 'A title',
      p: 'A paragraph.',
      button: {
        text: 'Click Me!',
        onclick: () => this.clickAction(),
      }
    });
  }

  clickAction() {
    alert('Button clicked!');
  }
}

customElements.define('custom-element', CustomElement);

document.body.set(new CustomElement());
```

This allows you to use **<custom-button></custom-button>** in your HTML. BareDOM enables simple, modular structures by extending native elements.

Enhance your custom Elements with BareDOM by [binding their properties](#extending-the-htmlelement-class).

## Styling & Design

### Style Attribute

Assign a string to the `style` property to update the inline style of the element—replacing any previous value.

```js
const myMain = DOM.let('main', {
  style: 'margin: 20px; font-family: Tahoma; background-color: skyblue;',
  content: 'The style is in the style attribute of the main element.',
});

DOM.set({
  header: {
    h1: 'Example of styling',
  },
  main: myMain,
  footer: 'the footer',
});
```

### Style Properties

Asign a structural object to the `style` to update individual style properties—use names in camelCase.

```js
const myMain = DOM.let('main', {
  style: {
    margin: '20px',
    fontFamily: 'Tahoma',
    backgroundColor: 'skyblue',
  },
  content: {
    h1: 'Styled Main Element',
    p: 'This manages the style values individually.',
  },
});

document.body.set({
  header: {
    h1: 'Example of styling',
  },
  main: myMain,
  footer: 'the footer',
});
```

This is equivalent to using the [style property of DOM elements](https://www.w3schools.com/jsref/prop_html_style.asp).

Styles may be assigned without an encompassing `style` property. The previous code could be written as follows.

```js
const myMain = DOM.let('main', {
  margin: '20px',
  fontFamily: 'Tahoma',
  backgroundColor: 'skyblue',
  h1: 'Styled Main Element',
  p: 'This manages the style values individually.',
});

document.body.set({
  header: {
    h1: 'Example of styling',
  },
  main: myMain,
  footer: 'the footer',
});
```

The `style`, `attribute`, and `content` properties are useful for organizing the model structure, and to clarify what kind of property you are trying to set. If BareDOM is not setting a value in the right property you intended to (style, attributes, events, etc.), you should put this key/value pair inside one of these wrapping or organizing properties.
Yet, **DOM.set** interprets structural properties to match attributes, styles, event handlers and element tags.

### Style Element

If `style` has a `content` property, an element with a style tag and CSS content is created. Click here to [learn about CSS](https://www.w3schools.com/css/css_intro.asp).

```js
const myMain = DOM.let('main', {
  style: {
    lang: 'scss',
    text: 'main { margin: 20px; font-family: Tahoma; color: gray; }',
  },
  content: 'This style is applied to all MAIN elements in the page.',
});

document.body.set({
  header: {
    h1: 'Example of styling',
  },
  main: myMain,
  footer: 'the footer',
});
```

This method is discouraged, since it will affect all elements in the DOM not just the one invoking **set**.


<details>
  <summary>CSS Property and Method</summary>

### CSS Property

Use `css:` in your model structure to create styling rules that apply **only** to the current element and its children.

```js
const myMain = DOM.let('main', {
  css: {
    margin: '20px',
    fontFamily: 'Tahoma',
    backgroundColor: 'gray',
    nav: {
      a: {
        backgroundColor: 'silver',
        hover: {
          backgroundColor: 'gold',
        },
      },
    },
  },
  nav: {
    a: [
      {
        href: 'home.html',
        content: 'HOME',
      },
      {
        href: 'gallery.html',
        content: 'GALLERY',
      },
    ],
  },
});

DOM.set({
  header: {
    h1: 'Example of styling',
  },
  main: myMain,
  footer: 'the footer',
});
```

The CSS is added to the document.head's style element under the `id` of the element where it is created.
If the element doesn't have an `id`, a unique one is provided for it.

Nested selectors affect all children in the hierarchy of the DOM.

- `tag\_`: Use a trailing underscore (\_) to affect only immediate children of the element.
- `_class, tag_class`: Leading underscores and any other in the selector are turned into (.) to indicate classes.
- `\_\_class`: Two leading underscores mean the class is applied to the parent selector.

```js
mainArea.css({
  a: {
    // #mainArea a
    backgroundColor: 'gray',
    __primary: {
      // #mainArea a.primary
      backgroundColor: 'gold',
    },
  },
  a_: {
    // #mainArea>a
    backgroundColor: 'silver',
    __primary: {
      // #mainArea>a.primary
      backgroundColor: 'red',
    },
  },
  a_primary: {
    // #mainArea a.primary
    backgroundColor: 'gold',
  },
  _primary: {
    // #mainArea .primary
    backgroundColor: 'green',
  },
  a_primary_: {
    // #mainArea>a.primary
    backgroundColor: 'red',
  },
  __disabled: {
    // #mainArea.disabled
    pointerEvents: 'none',
    filter: 'blur(2px)',
  }
});
```

</details>

## Reactive Data

<!-- JHT: recommend Binding section move up before CSS  -->

Any element's property (attribute, content, style, content or event handler) can be **bound** to a `Binder` object.
When the `value` property of this object changes, it automatically updates all element properties' bound to it.

```js
const _myBinder = new Binder('Default value');

const myMain = DOM.let('main', {
  input: {
    value: _myBinder,
  },
  p: {
    text: _myBinder,
  },
  button: {
    text: 'Go',
    onclick: (event) => (_myBinder.value = 'Go was clicked.'),
  },
});

DOM.set({
  header: {
    h1: 'Example of binding',
  },
  main: myMain,
  footer: 'the footer',
});
```

The convention of declaring binders as a constant and naming them in all-caps, or preceded by an underscore character, can be helpful.

It is recommended to bind properties rather than element declarations. Structure should remain stable, while values change through bindings.

If the entire content of an element depends on a binding, use the `content` property instead of binding the element itself.

```js
const _myBinder = new Binder(false);

someElement.set({
  h3: {
    content: _myBinder.as(v => ({
      text: v ? 'Cool beans.' : 'No way, José.',
      color: v ? 'green' : 'gray',
    })),
    onmouseover: e => _myBinder.value = true,
    onmouseout: e => _myBinder.value = false,
  }
});
```

Bindings can return full property objects, not just primitive values. This allows you to update multiple aspects of an element—such as text and styling—while keeping its structure unchanged.

### Binding Functions

Using the `.as()` method of the binders, you may provide a function that returns the correct value to assign to the element's property based on the value of the binder, or provide an object model to map the values to.

```js
const _fieldEnabled = new Binder(false);

const myMain = DOM.let('main', {
  div: {
    style: {
      padding: '1em',
      background: _fieldEnabled.as({
        false: 'gray',
        true: 'green',
      }),
      // the key 'default' can be used for multiple values of the binder
      color: _fieldEnabled.as('silver', 'lightgreen'),
      // with primitive arguments (or an array) the method returns one based on the integer value of the binder (false = 0, true = 1)
    },
    input: {
      enabled: _fieldEnabled,
      value: _fieldEnabled.as((value) => `The field is: ${value}.`),
    },
    button: {
      class: {
        enabled: _fieldEnabled,
        // classes passed as object keys can be bound as well.
      },
      text: 'toggle',
      onclick: () => (_fieldEnabled.value = !_fieldEnabled.value),
    },
  },
});

DOM.set({
  header: {
    h1: 'Example of binding',
  },
  main: myMain,
  footer: 'the footer',
});
```

### Binder.fetch()

`Binder.fetch()` creates a Binder whose value is updated from a fetched resource.

It is useful for asynchronously loading text, markdown, JSON, or other remote content directly into a binding flow.

`Binder.fetch()` does not replace `fetch()`.

It provides a reactive Binder wrapper around asynchronous values.

#### Loading text content

```js
document.body.set({
  main: {
    content: Binder.fetch('./README.md', {
      initial: '...loading',
    }),
  }
});
```

#### Transforming fetched values

```js
document.head.set({
  script: {
    src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    onload: () => document.body.set({
      content: Binder.fetch('./README.md', {
        initial: '...loading',
        transform: md => marked.parse(md),
      }),
    })
  }
})
```

In this example, the Markdown parser is loaded through `document.head.set()`, while the README is reactively fetched and rendered using `Binder.fetch()` once the `script` element loads.

#### Parsing JSON

By default, `Binder.fetch()` parses responses using `response.text()`.

You may provide a custom `parse()` function for other response types.

```
const _user = Binder.fetch('/api/user', {
  initial: 'Loading user...',
  parse: res => res.json(),
  transform: user => user.name,
});
```

#### Options

- `initial` → initial Binder value before the request completes  
- `parse(response)` → parses the fetch response (defaults to `response.text()`)  
- `transform(value)` → transforms the parsed value before assignment  
- `error(error)` → handles request errors 
- plus native fetch options   

#### Updating existing binders

```js
const _content = new Binder('...loading');

_content.fetch('./README.md').onChange(() => alert("Done fetching!"));

document.body.set({
  content: _content
});
```

Existing binders may also fetch and update their value directly using `_binder.fetch()`.

<details>
 <summary>Binding outside the set method</summary>

You may call the `bind` method of a binder and provide the element and property to be bound to it.

```
_myBinder.bind(someElement, 'text', (value) => `The field is: ${value}.`);
```

The `bind` method is agnostic about the order of the arguments provided.
An `element` is the target, a `string` the property to bind, and a `function` will return the appropriate value to update the element.

The `DOM.binder()` method may also be called with initial binding settings. The first argument will be the value of the binder.

```
let _myBinder = DOM.binder(true, someElement, 'text', (value) => `The field is: ${value}.`);
```

#### Binding binders

You may update the value of other binders by binding them.

```
_myBinder.bind(_anotherBinder, (value) => (value ? 'red' : 'blue'));
```

#### Listening to binders

You may add listener methods to be called when a binder is updated.

```
_myBinder.onChange((value) => alert('The value was updated to: ' + value));
```

#### Binding array of values

If instead of a function or an object model, the binding is given an array, it assumes these outcomes to be indexed by the value of the binder.

```
DOM.set({
  background: _fieldEnabled.as('gray', 'green'),
});

_myBinder.bind(someElement, 'text', ['field is disabled', 'field is enabled']);

_myBinder.bind(_anotherBinder, ['blue', 'red']);
```

Note that if the value is a boolean, `false` would be position 0, and `true` is position 1.
</details>

## Custom Elements

To create custom HTML elements using the BareDOM approach, we can extend Javascript's HTMLElement class.

```js
// declares the class
class MyElement extends HTMLElement {
  #value = new Binder();

  constructor(startVal) {
    super();
    this.value = startVal;

    this.set({
      width: 'fit-content',
      padding: '2em',
      margin: '0 auto',
      display: 'block',
      textAlign: 'center',
      backgroundColor: this._value.as('red', 'green'),
      p: {
        text: this.valueBinder,
      },
      button: {
        text: 'toggle',
        onclick: (e) => this.toggle(),
      },
    });
  }

  set value(val) {
    this.#value.value = val;
  }

  get value() {
    return this.#value.value;
  }

  get _value(){
    return this.#value;
  }

  toggle() {
    this.value = !this.value;
  }
}
customElements.define('my-element', MyElement);

// instantiate the element

let myElement = new MyElement(true);

DOM.set({
  h1: 'Extended HTML element',
  myElement: myElement,
});
```

### Sharing & Distribution
The beauty of the BareDOM approach is that the end-user doesn't need to know *how* the component was built. They simply treat it like a native HTML tag.

To share a component, simply export your class. The consumer only needs to include the BareDOM runtime and your script:

```html
<script src="[https://cdn.jsdelivr.net/gh/lenincompres/daredom@latest/DOM.min.js](https://cdn.jsdelivr.net/gh/lenincompres/daredom@latest/DOM.min.js)"></script>

<script src="my-baredom-ui-kit.js"></script>

<my-custom-element active="true"></my-custom-element>
```

### Binder.set(): create binders and their setters and getters with one method

The method `Binder.set` creates binders, plus the setters and getters for them in your element objects. The names for the binders will be preceded by an underscore (_) once created, while the properties that get and set their values are accessible with the plain names (or keys) given to the method.

This allows you to treat binders like regular properties, while keeping their reactive behavior.

Attach binders to an object or class:

```js
// declares the class
class MyElement extends HTMLElement {
  constructor() {
    super();

    Binder.set(this, {
      active: false,
      otherProp: 'initial other value',
    });

    this.set({
      display: 'block',
      padding: '1em',
      backgroundColor: this._active.as('red', 'lime'),
      p: 'This button toggles the active state of the element',
      button: {
        text: this._active.as('activate', 'deactivate'),
        onclick: (e) => this.active = !this.active,
      },
    });
  }
}
customElements.define('my-element', MyElement);

document.body.set(new MyElement());
```

NOTE:
`Binder.set` can also create binders with their setters and getters globally or in any object:

```
Binder.set(window, {
  myProp: 0
});

myProp++;

cosnt state = {};

Binder.set(state, {
  myProp: false
});

state.myProp = false;
```

### Scaling & Architecture

By combining `Binder.set()` with `HTMLElement` extension, BareDOM facilitates a rigorous **Object-Oriented Architecture.** * **Internal State:** Binders act as private reactive engines within your class, invisible to the outside world.
* **Public API:** You can expose standard Getters and Setters that interact with these Binders, allowing other developers to control your component using standard JavaScript: `myElement.active = false`.
* **Self-Contained Logic:** Styles (`css()`), structure (`set()`), and state (`Binder`) are all encapsulated in a single class file, making your code truly modular and easy to maintain in large-scale applications.

### Designed for an Agentic Web

In an era of Headless CMS and AI Agents, the "Virtual DOM" is a barrier. BareDOM keeps the UI "shallow" and native. 

Because BareDOM uses standard **Custom Elements**, your interfaces are:
1. **Machine Readable:** AI agents can interact with your elements using standard DOM APIs.
2. **SEO & JSON-LD Friendly:** It’s easy to map data structures directly to the interface without framework-specific "magic."
3. **Transparent:** What you see in the Inspector is exactly what you wrote in your logic.

## Advanced Methods

### DOM.get() and element.get()

This method returns an element's property value based on a `string` provided. It matches it to an attribute, style property, element tag (in the scope), or query selector. If no `string` is provided, it returns the value property or the innerHTML.

```
DOM.get('backgroundColor'); // returns the body's background color

document.body.get('backgroundColor'); // same as before

someElement.get('class'); // returns the class attribute of the element

someElement.get('classes'); // returns the classes in the attribute of the element as an array

someElement.get(); // returns the value (in the case of inputs) or the innerHTML

someElement.get('text'); // returns the innerText

someElement.get('article'); // returns the array of article tag elements within someElement's scope

someElement.get('.nice'); // similar to querySelectorAll, but returns an array of elements
```

### DOM.let() and element.let()

This method allows you to set the value of an element's property. And it allows you to set this value based on the current value of the property.

```
document.body.let('backgroundColor', 'red');

someElement.let('text', 'New text');

someElement.let('color', cVal => cVal === 'red' ? 'blue' : 'green');  // It will apply this rule based on the current color,
```

When using the *DOM.let* and a tag name to create new elements, you add a boolean value as a third parameter. You may preppend (*true*) or not-append (*false*) the new element.

```
let someElement = DOM.let('section', {
    background: 'silver',
    h1: 'Heading of a new section',
  },
  false,
);

someElement.let('p', {
    margin: '2em',
    text: 'This is a new paragraph.',
  },
  true,
);
```

### Creative Coding (p5.js)

Yes, DOM.set works for P5.js elements. If you are not familiar with P5.js, please [remedy that](https://p5js.org/).

```js
p5.set({
  h1: 'Hello world',
  p: 'This is a paragraph.',
});
```

When called from p5 or a p5 element, all elements given an id are created as p5 elements, and can execute p5 methods.

```js
someP5Element.set({
  h1: 'Hello world',
  button: {
    id: 'goBtn',
    text: 'Go',
    mouseClicked: (e) => alert('Go was clicked.'),
  },
});

/* goBtn is a p5 Element. */

goBtn.addClass('nice-button');
```

## License

MIT License

### Have fun!

BareDOM is not a framework.

It is the DOM, made usable.

---

> **A Note from the Author**
> 
> I began developing this approach years ago because I missed the simplicity of the early web—where the focus was on the interaction between the user and the browser. I didn't want a "framework" to stand between me and the DOM. BareDOM is the result of that journey. It’s not about hating modern tools; it’s about loving the native ones we already have. 
> 
> — **Lenin Comprés**
