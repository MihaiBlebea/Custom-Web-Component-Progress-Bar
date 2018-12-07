(function() {

    class SimpleProgress extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })
        }

        connectedCallback()
        {
            this.body = document.createElement('div')
            this.body.style.backgroundColor = '#D5D5D5'
            this.body.style.marginTop       = '10px'
            this.body.style.borderRadius    = '20px'
            this.body.style.borderStyle     = 'solid'
            this.body.style.borderWidth     = '2px'

            this.bar = document.createElement('div')
            this.bar.textContent = this.progress + '%'
            this.bar.style.paddingLeft     = '10px'
            this.bar.style.borderRadius    = this.body.style.borderRadius
            this.bar.style.width           = this.progress + '%'
            this.bar.style.transition      = 'all 0.4s ease-in-out'

            this.label = document.createElement('label')

            let slot = document.createElement('slot')

            this.shadowRoot.appendChild(this.label)
            this.label.appendChild(slot)
            this.body.appendChild(this.bar)
            this.shadowRoot.appendChild(this.body)

            this.updateTheme()
        }

        static get observedAttributes()
        {
            return ['progress', 'theme', 'align']
        }

        get progress()
        {
            return this.getAttribute('progress')
        }

        get theme()
        {
            return this.getAttribute('theme')
        }

        get align()
        {
            return this.getAttribute('align')
        }

        set progress(value)
        {
            return this.setAttribute('progress', value)
        }

        set theme(value)
        {
            return this.getAttribute('theme', value)
        }

        set align(value)
        {
            return this.getAttribute('align', value)
        }

        updateProgressWidth()
        {
            if(this.bar)
            {
                this.bar.style.width = this.progress + '%'
            }
        }

        updateTheme()
        {
            if(this.bar && this.body)
            {
                switch(this.theme)
                {
                    case 'red':
                        this.bar.style.backgroundColor = '#FA6E57'
                        this.body.style.borderColor    = '#FA6E57'
                        this.body.style.color          = '#FFF'
                        break
                    case 'blue':
                        this.bar.style.backgroundColor = '#464BFA'
                        this.body.style.borderColor    = '#464BFA'
                        this.body.style.color          = '#FFF'
                        break
                    case 'yellow':
                        this.bar.style.backgroundColor = '#FAB846'
                        this.body.style.borderColor    = '#FAB846'
                        this.body.style.color          = '#000'
                        break
                    case 'green':
                        this.bar.style.backgroundColor = '#53BF4A'
                        this.body.style.borderColor    = '#53BF4A'
                        this.body.style.color          = '#000'
                        break
                }
            }
        }

        updateAlign()
        {
            console.log(this.align)
            if(this.bar && this.body)
            {
                if(this.align === 'left')
                {
                    this.bar.style.paddingLeft = '10px'
                } else {
                    this.bar.style.paddingRight = '10px'
                    this.bar.style.alignText    = 'right'
                }
            }
        }

        attributeChangedCallback(name, oldValue, newValue)
        {
            if(oldValue === newValue)
            {
                return
            }

            switch(name)
            {
                case 'progress':
                    this.updateProgressWidth()
                    break
                case 'theme':
                    this.updateTheme()
                    break
                case 'align':
                    this.updateAlign()
                    break
                default:
                    break
            }
        }
    }

    module.exports = SimpleProgress

})()
