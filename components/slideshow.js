(function() {

    class SimpleSlideshow extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

            this.counter = 0
            this.images  = []

            this._renderCanvas         = this._renderCanvas.bind(this)
            this._handlePauseSlider    = this._handlePauseSlider.bind(this)
            this._handleContinueSlider = this._handleContinueSlider.bind(this)
            this._selectSlide          = this._selectSlide.bind(this)
        }

        connectedCallback()
        {
            this.wraper = document.createElement('div')
            this.wraper.style.position = 'relative'

            this.canvas = document.createElement('div')
            this.canvas.style.width              = '100%'
            this.canvas.style.height             = '500px'
            this.canvas.style.backgroundPosition = 'center center'
            this.canvas.style.backgroundSize     = 'cover'
            this.canvas.style.transition         = 'all 0.4s ease-in-out'
            this.canvas.addEventListener('mouseenter', this._handlePauseSlider)
            this.canvas.addEventListener('mouseleave', this._handleContinueSlider)

            this.description = document.createElement('div')
            this.description.style.backgroundColor = this.color
            this.description.style.color           = '#FFF'
            this.description.style.paddingTop      = '5px'
            this.description.style.paddingBottom   = '5px'
            this.description.style.paddingLeft     = '25px'
            this.description.style.paddingRight    = '25px'
            this.description.style.position        = 'absolute'
            this.description.style.bottom          = '20%'
            this.description.style.left            = '5%'
            this.description.style.fontSize        = '26px'
            this.description.style.transition      = 'all 0.5s ease-out'

            this.content = document.createElement('slot')
            this.content.style.display = 'none'
            this.content.addEventListener('slotchange', this._renderCanvas)

            this.controllers = document.createElement('div')
            this.controllers.style.display         = 'flex'
            this.controllers.style.justifyContent  = 'center'
            this.controllers.style.alignItems      = 'center'
            this.controllers.style.width           = '100%'
            this.controllers.style.height          = '30px'
            this.controllers.style.position        = 'absolute'
            this.controllers.style.bottom          = 0

            this.wraper.appendChild(this.content)
            this.wraper.appendChild(this.description)
            this.wraper.appendChild(this.controllers)
            this.shadowRoot.appendChild(this.wraper)
        }

        disconnectedCallback()
        {
            this.content.removeEventListener('slotchange', this._renderCanvas)
            this.canvas.removeEventListener('mouseenter', this._handlePauseSlider)
            this.canvas.removeEventListener('mouseleave', this._handleContinueSlider)
        }

        _renderCanvas()
        {
            this.content.assignedNodes().forEach((node)=> {
                if(node.nodeName === 'IMG')
                {
                    this.images.push({
                        src: node.src,
                        alt: node.alt
                    })

                    let bullet = document.createElement('div')
                    bullet.style.backgroundColor = '#FFF'
                    bullet.style.width           = '10px'
                    bullet.style.height          = '10px'
                    bullet.style.marginRight     = '10px'
                    bullet.style.marginLeft      = '10px'
                    bullet.style.boxShadow       = '2px 2px 2px'
                    bullet.style.borderRadius    = '50%'
                    this.controllers.appendChild(bullet)
                }
            })

            this.bullets = this.controllers.querySelectorAll('div')
            Object.values(this.bullets).map((bullet, index)=> {
                bullet.style.cursor = 'pointer'
                bullet.addEventListener('click', ()=> {
                    this._selectSlide(index)
                })
            })

            this._updateCanvasBackground(this.counter)
            this.interval = setInterval(()=> {
                if(!this.paused)
                {
                    if(this.counter < this.images.length - 1)
                    {
                        this.counter++
                    } else {
                        this.counter = 0
                    }

                    this._updateCanvasBackground(this.counter)
                }
            }, this.seconds * 1000)

            this.wraper.appendChild(this.canvas)
        }

        _updateCanvasBackground(counter)
        {
            if(this.canvas)
            {
                Object.values(this.bullets).map((bullet, index)=> {
                    bullet.style.backgroundColor = '#FFF'
                })

                this.canvas.style.backgroundImage           = 'url(' + this.images[counter].src + ')'
                this.description.textContent                = this.images[counter].alt
                this.bullets[counter].style.backgroundColor = this.color
            }
        }

        _handlePauseSlider()
        {
            this.paused = true
        }

        _handleContinueSlider()
        {
            this.paused = false
        }

        _selectSlide(index)
        {
            this.counter = index
            this._updateCanvasBackground(index)
        }

        get seconds()
        {
            return this.getAttribute('seconds')
        }

        get color()
        {
            return this.getAttribute('color')
        }

        set seconds(value)
        {
            return this.setAttribute('seconds', value)
        }

        set color(value)
        {
            return this.setAttribute('color', value)
        }

        attributeChangedCallback()
        {
            //
        }
    }

    module.exports = SimpleSlideshow

})()
