const SimpleProgress   = require('./components/progress.js')
const SimpleCard       = require('./components/card.js')
const SimpleTooltip    = require('./components/tooltip.js')
const SimpleModal      = require('./components/modal.js')
const SimpleBreadcrumb = require('./components/breadcrumb.js')
const SimpleSlideshow  = require('./components/slideshow.js')
const SimpleSearch     = require('./components/search.js')
const SimpleScroll     = require('./components/scroll.js')


customElements.define('simple-progress-bar', SimpleProgress)
customElements.define('simple-card', SimpleCard)
customElements.define('simple-tooltip', SimpleTooltip)
customElements.define('simple-modal', SimpleModal)
customElements.define('simple-breadcrumb', SimpleBreadcrumb)
customElements.define('simple-slideshow', SimpleSlideshow)
customElements.define('simple-search', SimpleSearch)
customElements.define('simple-scroll', SimpleScroll)


module.exports = customElements
