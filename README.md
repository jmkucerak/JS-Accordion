# JS-Accordion
A basic accordion in vanilla Javascript.

## Preface
This code works on the assumption that an accordion consists of at least 5 HTML elements.
* Container** - This is a single HTML element that is used for grouping the inner parts of the accordion.  More helpful when multiple accordions are in use on a page.
* Panel - A single entry within the accordion.  Contains a header and body.
  * Panel Header - Displayed when the Panel is collapsed.  Contains a Title and Toggle.
    * Panel Header Title - Usually textual information letting users know what that panel body contains.
    * Panel Header Toggle** - An interactive indicator that will expand/collapse the Panel body when clicked.
  * Panel Body - Holds information useful to the user.

*When only a single accordion is present on a page, the Container is really only for layout control.

**The Toggle can actually be the Title as well.

## Usage
The HTML
```html
<html>
<head>
  <link rel="stylesheet" type="text/css" href="js-toggle.css" />
  <script src="js-toggle.js"></script>
</head>
<body>
  <div class="accordion">
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Title</span>
        <span class="panel-toggle">Toggle</span>
      </div>
      <div class="panel-body">
        This is the body
      </div>
    </div>
  </div>
</body>
</html>
```

The CSS
```css
.panel-header {
  border: 1px solid black;
}
.panel-toggle {
  float: right;
}
.panel-body {
  transition: max-height 1s;  
  background: #e5feff;
  overflow: hidden;
  max-height: 0;
  border: none;
  transition: max-height 0.1s ease-out;
}
.show {
  border: 1px dashed black;
  max-height: 300px;
  transition: max-height 0.5s ease-in;
}
```

The Javascript
```javascript
const options = {
  toggle: { class: 'panel-toggle' },
  body: { class: 'panel-body', classShow: 'show' }
}

const acc = new accordion(document.getElementsByClassName('accordion')[0], options)
acc.init()
```

## Options
The options for the Accordion are required to be an Object.  All options are currently required, but a default functionality will be added.

```javascript
{
  toggle: {
    class: // Class used on all panel toggle elements within an Accordion container.
  },
  body: {
    class: , // Class used on all the panel body elements within an accordion container.
    classShow: // Class added/removed from panel to expand/collapse.
  }
}
```
