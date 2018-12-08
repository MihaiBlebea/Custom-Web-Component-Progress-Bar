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
            this.bar.style.backgroundImage = 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)'
            this.bar.style.backgroundSize  = '1rem 1rem'

            this.label = document.createElement('label')
            this.label.style.display = 'block'
            
            let slot = document.createElement('slot')

            this.shadowRoot.appendChild(this.label)
            this.label.appendChild(slot)
            this.body.appendChild(this.bar)
            this.shadowRoot.appendChild(this.body)

            this._updateColor()
        }

        static get observedAttributes()
        {
            return ['progress', 'color', 'align']
        }

        get progress()
        {
            return this.getAttribute('progress')
        }

        get color()
        {
            return this.getAttribute('color')
        }

        get align()
        {
            return this.getAttribute('align')
        }

        set progress(value)
        {
            return this.setAttribute('progress', value)
        }

        set color(value)
        {
            return this.getAttribute('color', value)
        }

        set align(value)
        {
            return this.getAttribute('align', value)
        }

        _hexToRgb(hex)
        {
            let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
            hex = hex.replace(shorthandRegex, (m, r, g, b)=> {
                return r + r + g + g + b + b;
            })

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? {
                red: parseInt(result[1], 16),
                green: parseInt(result[2], 16),
                blue: parseInt(result[3], 16)
            } : null
        }

        _findBrightness(red, green, blue)
        {
            return (red * 299 + green * 587 + blue * 114) / 1000
        }

        _isBright(value)
        {
            return value > 123
        }

        _updateProgressWidth()
        {
            if(this.bar)
            {
                this.bar.style.width = this.progress + '%'
            }
        }

        _updateColor()
        {
            if(this.bar && this.body)
            {
                let rgbColor = this._hexToRgb(this.color)
                if(rgbColor)
                {
                    let bright = this._isBright(this._findBrightness(rgbColor['red'], rgbColor['green'], rgbColor['blue']))
                    this.body.style.color = bright ? '#000' : '#FFF'
                } else {
                    this.body.style.color = '#FFF'
                }
                this.bar.style.backgroundColor = this.color
                this.body.style.borderColor    = this.color
            }
        }

        _updateAlign()
        {
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
                    this._updateProgressWidth()
                    break
                case 'color':
                    this._updateColor()
                    break
                case 'align':
                    this._updateAlign()
                    break
                default:
                    break
            }
        }
    }

    module.exports = SimpleProgress

})()
