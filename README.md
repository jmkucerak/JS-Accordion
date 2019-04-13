# JS-Accordion
A basic accordion in vanilla Javascript.

## Preface
This code works on the assumption that an accordion consists of at least 5 HTML elements.
* Container* - This is a single HTML element that is used for grouping the inner parts of the accordion.  More helpful when multiple accordions are in use on a page.
* Panel - A single entry within the accordion.  Contains a header and body.
  * Panel Header - Displayed when the Panel is collapsed.  Contains a Title and Toggle.
    * Panel Header Title - Usually textual information letting users know what that panel body contains.
    * Panel Header Toggle** - An interactive indicator that will expand/collapse the Panel body when clicked.
  * Panel Body - Holds information useful to the user.

*When only a single accordion is present on a page, the Container is really only for layout control.

**The Toggle can actually be the Title as well.

## Usage
**HTML**
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

**CSS**
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

**Javascript**
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
/**
 * Represents an accordion. 
 * @constructor
 * 
 * @param {HTMLElement} element - Reference to the accordion container html element.
 * @param {Object}      options - Switches used to modify functionality.
 * @param {Object}      options.toggle - Traits of the panel toggle element.
 * @param {string}      options.toggle.class - Class designating panel toggle elements.
 * @param {string}      options.toggle.classShow - Class added/removed from toggled panel body elements.
 * @param {Object}      options.body - Traits of the panel body element.
 * @param {string}      options.body.class - Class designating panel body elements.
 * @param {boolean}     options.multi - Switch for multiple open panels.
 * @param {Object}      options.all - Traits of an open/close element.
 * @param {string}      options.all.classOpen - Class designating openAll elements.
 * @param {string}      options.all.classClose = Class designating closeAll elements.
 */
```
