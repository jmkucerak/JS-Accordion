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
 */
function accordion(element, options) {
    // Validate element value
    if (!(element instanceof HTMLElement)) {
        throw new Error('Value of the `element` parameter must be a single valid HTMLElement')
    }

    // Element is valid so store it.
    this.element = element

    // If the options parameter has a value, validate.
    if (Object.prototype.toString.call(options) === "[object Object]") {
        // Combine the given options with the default.
        // @todo Define default values.
        this.options = Object.assign(
            {
                toggle: null,
                body: null
            },
            options
        )
    } else if (undefined !== options) {
        throw new Error('The argument supplied for the options parameter was the incorrect type; Object expected.')
    }

    // Instantiate holder to hold reference to last opened panel
    let activePanel = null
    let toggles, bodies

    // Attempt Accordion behavior initialization.
    this.init = () => {
        // Apply default behavior.
        if (undefined === options) {
        } else {
            // Make sure there are actual Options values.
            // @todo Make this more robust.
            if (this.options.toggle === null || this.options.body === null) {
                throw new Error('Please supply a the proper options argument to the constructor.')
            }

            // Store all toggle elements initial state.
            toggles = this.element.getElementsByClassName(this.options.toggle.class)

            // Validate sure there are toggle elements.
            if (0 === toggles.length) {
                throw new Error('Unable to find any HTMLElements assigned the classToggle Options value: ' + this.options.toggle.class)
            }

            // Store all body elements.
            bodies = this.element.getElementsByClassName(this.options.body.class)

            // Validate number of body elements.
            if (0 === bodies.length) {
                throw new Error('Unable to find any HTMLElements assigned the classBody Options value: ' + this.options.body.class)
            }

            // Validate number of body and toggle elements are equal.
            if (bodies.length !== toggles.length) {
                throw new Error('The number of toggle elements does not match the number of body elements.  This will lead to unexpected behavior; initilization has been terminated.\n' +
                    'Toggle element count: ' + toggles.length + ' | Body element count: ' + bodies.length)
            }

            // Attach event listener to each toggle button.
            for (let i = 0; i < toggles.length; i++) {
                toggles[i].addEventListener('click', (e) => {
                    // Get the current index of the clicked toggle button.
                    // In case the element has moved in the DOM.
                    let index = Array.from(toggles).indexOf(e.target)

                    // Pass current toggle index.
                    this.toggle(index)
                })
            }
        }

        // Control adding/removal of options.body.classShow
        // to active/current panels.
        this.toggle = function (index) {
            // Test if we have an open panel already.
            if (activePanel) {
                // If the panel is already active, then close it and null
                // the activePanel variable as everything will be closed.
                if (bodies[index] === activePanel) {
                    activePanel = null
                } else { // Close activePanel; reassign to current panel.
                    activePanel.classList.toggle(this.options.body.classShow)
                    activePanel = bodies[index]
                }
            } else { // Assign current Panel to activePanel.
                activePanel = bodies[index]
            }

            // Toggle show class for the panel associated with the clicked toggle.
            bodies[index].classList.toggle(this.options.body.classShow)
        }
    }
}
