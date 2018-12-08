
(function() {

    class SimpleCard extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

            this.borderRadius = '5px'

            this.openOverlay  = this.openOverlay.bind(this)
            this.closeOverlay = this.closeOverlay.bind(this)
        }

        connectedCallback()
        {
            this.card = document.createElement('div')
            this.card.style.position     = 'relative'
            this.card.style.borderRadius = this.borderRadius
            this.card.style.boxShadow    = '2px 2px 5px'
            this.card.addEventListener('mouseenter', this.openOverlay)
            this.card.addEventListener('mouseleave', this.closeOverlay)

            this.img = document.createElement('img')
            this.img.src = this.image
            this.img.style.borderRadius = this.borderRadius
            this.img.style.width        = '100%'
            this.img.style.cursor       = 'pointer'


            this.overlay = document.createElement('div')
            this.overlay.style.position        = 'absolute'
            this.overlay.style.borderRadius    = this.borderRadius
            this.overlay.style.top             = '100%'
            this.overlay.style.left            = 0
            this.overlay.style.right           = 0
            this.overlay.style.backgroundColor = this.color || '#008CBA'
            this.overlay.style.overflow        = 'hidden'
            this.overlay.style.width           = '100%'
            this.overlay.style.height          = 0
            this.overlay.style.transition      = '.5s ease'

            this.body = document.createElement('div')
            this.body.style.padding = '20px'

            this.content = document.createElement('slot')
            this.content.style.padding         = '20px'
            this.content.textContent = 'This is a f**king card'

            this.card.appendChild(this.img)
            this.card.appendChild(this.overlay)
            this.overlay.appendChild(this.body)
            this.body.appendChild(this.content)
            this.shadowRoot.appendChild(this.card)
        }

        get image()
        {
            return this.getAttribute('image')
        }

        get color()
        {
            return this.getAttribute('color')
        }

        set image(value)
        {
            return this.setAttribute('image', value)
        }

        set color(value)
        {
            return this.setAttribute('color', value)
        }

        openOverlay()
        {
            this.overlay.style.top = 0
            this.overlay.style.height = '100%'
        }

        closeOverlay()
        {
            this.overlay.style.top = '100%'
            this.overlay.style.height = 0
        }

        disconnectedCallback()
        {
            this.card.removeEventListener('mouseenter', this.openOverlay)
            this.card.removeEventListener('mouseleave', this.closeOverlay)
        }

        attributeChangedCallback(name, oldValue, newValue)
        {
            //
        }
    }

    module.exports = SimpleCard

})()
