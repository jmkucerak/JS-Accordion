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
                body: null,
                multi: false,
                all: null
            },
            options
        )
    } else if (undefined !== options) { // Error when Options are not valid.
        throw new Error('The argument supplied for the options parameter was the incorrect type; Object expected.')
    }

    // Instantiate holder to hold reference to last opened panel
    let activePanels = []
    // References to toggle and body elements.
    let toggles, bodies, allOpen, allClose

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

            // Setup allOpen and allClose if the Options are set.
            if (null !== this.options.all) {
                // Process if options.all.classOpen is defined
                if (undefined !== this.options.all.classOpen) {
                    // Store each allOpen element.
                    allOpen = document.getElementsByClassName(this.options.all.classOpen)
                    // Warn if no elements found
                    if (0 === allOpen.length) {
                        console.warn('There were no elements found with the class: ' + this.options.all.classOpen)
                    } else {
                        // Attach event listener to each element.
                        for (let i = 0; i < allOpen.length; i++) {
                            allOpen[i].addEventListener('click', (e) => {
                                this.toggleAll(true)
                            })
                        }
                    }
                }

                // Process if options.all.classClose is defined
                if (undefined !== this.options.all.classClose) {
                    // Store each allClose element.
                    allClose = document.getElementsByClassName(this.options.all.classClose)
                    // Warn if no elements found
                    if (0 === allClose.length) {
                        console.warn('There were no elements found with the class: ' + this.options.all.classClose)
                    } else {
                        // Attach event listener to each element.
                        for (let i = 0; i < allClose.length; i++) {
                            allClose[i].addEventListener('click', (e) => {
                                this.toggleAll(false)
                            })
                        }
                    }
                }
            }
        }

        /**
         * Controls adding/removing options.body.classShow
         * to active/current Panels.
         * 
         * @param {number} index - Indicates which Panel is being interacted with.
         */
        this.toggle = function (index) {
            // Test if we have an open panel already.
            if (0 !== activePanels.length) {
                // Are multiple open panels allowed?
                if (!this.options.multi) {
                    // If the panel is already active, then close it and pop
                    // the activePanels array as everything will be closed.
                    if (bodies[index] === activePanels[0]) {
                        activePanels.pop()
                    } else { // Close first activePanels element; reassign to current panel.
                        activePanels[0].classList.toggle(this.options.body.classShow)
                        activePanels[0] = bodies[index]
                    }
                } else { // Multiple open Panels are allowed.
                    // Store index of current Panel within activePanels
                    let panelIndex = activePanels.indexOf(bodies[index])
                    // Test if current Panel is active.
                    if (-1 !== panelIndex) {
                        // Remove panel from activePanels
                        activePanels.splice(panelIndex, 1)
                    } else {
                        // Add panel if inactive.
                        activePanels.push(bodies[index])
                    }
                }
            } else { // Assign current Panel to activePanel.
                activePanels.push(bodies[index])
            }

            // Toggle show class for the panel associated with the clicked toggle.
            bodies[index].classList.toggle(this.options.body.classShow)
        }

        /**
         * Control adding/removing options.body.classShow
         * to all panels.
         * 
         * @param {boolean} open - Switch indicating if panels should open or close
         */
        this.toggleAll = function (open) {
            // Open Panels if any are closed.
            if (open && activePanels.length !== bodies.length) {
                // Iterate over all Panels
                for (let i = 0; i < bodies.length; i++) {
                    // Open Panel if it is not active already.
                    if (-1 === activePanels.indexOf(bodies[i])) {
                        bodies[i].classList.toggle(this.options.body.classShow)
                        activePanels.push(bodies[i])
                    }
                }
            }

            // Close Panels if any are open.
            if (!open && 0 !== activePanels.length) {
                // Iterate over all active Panels
                for (let i = activePanels.length - 1; i >= 0; i--) {
                    // Close each active Panel.
                    activePanels[i].classList.toggle(this.options.body.classShow)
                    activePanels.pop()
                }
            }
        }
    }
}
