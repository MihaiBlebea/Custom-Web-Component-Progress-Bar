(function() {

    class SimpleModal extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

            this.openModal  = this.openModal.bind(this)
            this.closeModal = this.closeModal.bind(this)
        }

        connectedCallback()
        {
            this.modal = document.createElement('div')
            this.modal.style.zIndex          = 2
            this.modal.style.padding         = '20px'
            this.modal.style.backgroundColor = '#FFF'
            this.modal.style.margin          = 'auto'
            this.modal.style.width           = '50%'
            this.modal.style.opacity         = 0
            this.modal.style.transition      = 'all 0.5s ease-out'

            this.overlay = document.createElement('div')
            this.overlay.style.backgroundColor = 'rgba(132, 132, 132, 0.6)'
            this.overlay.style.position        = 'fixed'
            this.overlay.style.left            = 0
            this.overlay.style.right           = 0
            this.overlay.style.top             = 0
            this.overlay.style.bottom          = 0
            this.overlay.style.overflow        = 'auto'
            this.overlay.style.transition      = 'all 0.5s ease-out'
            this.handleShowToggle()

            this.close = document.createElement('span')
            this.close.textContent           = 'x'
            this.close.style.textAlign       = 'center'
            this.close.style.display         = 'inline-block'
            this.close.style.backgroundColor = '#DEE2E6'
            this.close.style.width           = '15px'
            this.close.style.height          = '15px'
            this.close.style.lineHeight      = '15px'
            this.close.style.padding         = '2px'
            this.close.style.marginLeft      = '5px'
            this.close.style.marginRight     = '5px'
            this.close.style.borderRadius    = '50%'
            this.close.style.boxShadow       = '2px 2px 2px black'
            this.close.style.float           = 'right'
            this.close.style.cursor          = 'pointer'
            this.close.addEventListener('click', this.closeModal)

            this.slotContent = document.createElement('slot')

            this.slotTitle = document.createElement('slot')
            this.slotTitle.setAttribute('name', 'title')

            this.modal.appendChild(this.close)
            this.modal.appendChild(this.slotTitle)
            this.modal.appendChild(this.slotContent)
            this.overlay.appendChild(this.modal)
            this.shadowRoot.appendChild(this.overlay)
        }

        disconnectedCallback()
        {
            this.close.removeEventListener('click', this.closeModal)
        }

        static get observedAttributes() {
            return ['show'];
        }

        get show()
        {
            return this.getAttribute('show')
        }

        set show(value)
        {
            return this.setAttribute('show', value)
        }

        openModal()
        {
            this.setAttribute('show', 'true')
        }

        closeModal()
        {
            this.setAttribute('show', 'false')
        }

        handleShowToggle()
        {
            if(this.overlay)
            {
                this.overlay.style.opacity       = this.show == 'true' ? 1 : 0
                this.overlay.style.pointerEvents = this.show == 'true' ? 'all' : 'none'
                this.overlay.style.paddingTop    = this.show == 'true' ? '20vh' : '10vh'
                this.modal.style.opacity         = this.show == 'true' ? 1 : 0
            }
        }

        attributeChangedCallback(name, oldValue, newValue)
        {
            switch(name)
            {
                case 'show':
                    this.handleShowToggle()
                    break
            }
        }
    }

    module.exports = SimpleModal

})()
