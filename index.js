const SimpleProgress = require('./components/progress.js')
const SimpleCard     = require('./components/card.js')
const SimpleTooltip  = require('./components/tooltip.js')
cosnt SimpleModal    = require('./components/modal.js')


customElements.define('simple-progress-bar', SimpleProgress)
customElements.define('simple-card', SimpleCard)
customElements.define('simple-tooltip', SimpleTooltip)
customElements.define('simple-modal', SimpleModal)

module.exports = customElements
