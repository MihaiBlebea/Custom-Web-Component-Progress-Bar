(function() {

    class SimpleTooltip extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })
        }

        connectedCallback()
        {
            this.wraper = document.createElement('span')
            this.wraper.style.position = 'relative'

            this.label = document.createElement('slot')

            this.tooltip = document.createElement('div')
            this.tooltip.style.position        = 'absolute'
            this.tooltip.style.left            = 0
            this.tooltip.style.backgroundColor = '#000'
            this.tooltip.style.color           = '#FFF'
            this.tooltip.style.padding         = '10px'
            this.tooltip.style.borderRadius    = '10px'
            this.tooltip.style.width           = '120px'
            this.tooltip.style.textAlign       = 'center'
            this.tooltip.style.marginTop       = '10px'
            this.tooltip.textContent           = this.text

            this.arrow = document.createElement('span')
            this.arrow.style.position    = 'absolute'
            this.arrow.style.bottom      = '100%'
            this.arrow.style.left        = '50%'
            this.arrow.style.marginLeft  = '-5px'
            this.arrow.style.borderWidth = '5px'
            this.arrow.style.borderStyle = 'solid'
            this.arrow.style.borderColor = 'transparent transparent #555 transparent'
            this.tooltip.appendChild(this.arrow)

            this.icon = document.createElement('span')
            this.icon.textContent           = '?'
            this.icon.style.textAlign       = 'center'
            this.icon.style.display         = 'inline-block'
            this.icon.style.backgroundColor = '#DEE2E6'
            this.icon.style.width           = '15px'
            this.icon.style.height          = '15px'
            this.icon.style.lineHeight      = '15px'
            this.icon.style.padding         = '2px'
            this.icon.style.marginLeft      = '5px'
            this.icon.style.marginRight     = '5px'
            this.icon.style.borderRadius    = '50%'
            this.icon.style.boxShadow       = '2px 2px 2px black'

            this.icon.addEventListener('mouseenter', ()=> {
                this.icon.style.cursor = 'pointer'
                this.wraper.appendChild(this.tooltip)
            })

            this.icon.addEventListener('mouseleave', ()=> {
                this.wraper.removeChild(this.tooltip)
            })

            this.wraper.appendChild(this.label)
            this.wraper.appendChild(this.icon)
            this.shadowRoot.appendChild(this.wraper)
        }

        disconnectedCallback()
        {
            this.icon.removeEventListener('mouseenter')
            this.icon.removeEventListener('mouseleave')
        }

        get text()
        {
            return this.getAttribute('text')
        }

        set text(value)
        {
            return this.setAttribute('text', value)
        }

        attributeChangedCallback()
        {
            //
        }
    }

    module.exports = SimpleTooltip

})()
