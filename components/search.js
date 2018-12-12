
(function() {

    class SimpleSearch extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

            this.border = 'solid 0.5px #d5d5d5'

            this._fetchData          = this._fetchData.bind(this)
            this._removeChildrenNode = this._removeChildrenNode.bind(this)
            this._handleSlotChange   = this._handleSlotChange.bind(this)
        }

        connectedCallback()
        {
            this.wraper = document.createElement('div')
            this.wraper.style.width    = '100%'
            this.wraper.style.position = 'relative'

            this.content = document.createElement('slot')
            this.content.addEventListener('slotchange', this._handleSlotChange)

            this.dropdown = document.createElement('div')
            this.dropdown.style.position        = 'absolute'
            this.dropdown.style.opacity         = 0
            this.dropdown.style.width           = '100%'
            this.dropdown.style.zIndex          = 2
            this.dropdown.style.backgroundColor = '#FFF'
            this.dropdown.style.transition      = 'all 0.5s ease-in-out'

            this.wraper.appendChild(this.content)
            this.wraper.appendChild(this.dropdown)
            this.shadowRoot.appendChild(this.wraper)
        }

        disconnectedCallback()
        {
            this.content.removeEventListener('slotchange', this._handleSlotChange)
            this._removeChildrenNode(this.dropdown)
        }

        get url()
        {
            return this.getAttribute('url')
        }

        get name()
        {
            return this.getAttribute('name')
        }

        get click()
        {
            return this.getAttribute('click')
        }

        get color()
        {
            return this.getAttribute('color')
        }

        set url(value)
        {
            return this.setAttribute('url', value)
        }

        set name(value)
        {
            return this.setAttribute('name', value)
        }

        set click(value)
        {
            return this.setAttribute('click', value)
        }

        set color(value)
        {
            return this.setAttribute('color', value)
        }

        _handleSlotChange()
        {
            this.content.assignedNodes().forEach((node)=> {
                if(node.nodeName === 'INPUT')
                {
                    node.addEventListener('keyup', this._fetchData)
                }
            })
        }

        _removeChildrenNode(node)
        {
            while(node.firstChild)
            {
                node.removeChild(node.firstChild)
            }
        }

        _createDropdownElement()
        {
            let element = document.createElement('div')
            element.style.borderBottom  = this.border
            element.style.borderLeft    = this.border
            element.style.borderRight   = this.border
            element.style.paddingTop    = '5px'
            element.style.paddingBottom = '5px'
            element.style.paddingLeft   = '10px'
            element.style.paddingRight  = '10px'
            return element
        }

        _fetchData(event)
        {
            let value  = event.path[0].value
            let border = 'solid 0.5px #d5d5d5'

            fetch(this.url).then((result)=> {
                result.json().then((data)=> {

                    this._removeChildrenNode(this.dropdown)
                    this.dropdown.style.opacity = 0

                    let foundMatches = []
                    data.forEach((item)=> {
                        if(item[this.name].toLowerCase().startsWith(value.toLowerCase()))
                        {
                            foundMatches.push(item)
                        }
                    })

                    console.log(foundMatches.length)
                    if(foundMatches.length === 0 && value !== '')
                    {
                        let element = this._createDropdownElement()
                        element.textContent = 'No item found'
                        element.style.color = 'grey'
                        this.dropdown.appendChild(element)
                        this.dropdown.style.opacity = 1

                    } else if(foundMatches.length > 0 && value !== '') {
                        foundMatches.map((item)=> {
                            let element = this._createDropdownElement()

                            element.addEventListener('click', ()=> {
                                window.location = item[this.click]
                            })
                            element.textContent  = item[this.name]
                            element.style.cursor = 'pointer'
                            element.addEventListener('mouseenter', ()=> {
                                element.style.backgroundColor = this.color
                                element.style.color           = '#FFF'
                            })
                            element.addEventListener('mouseleave', ()=> {
                                element.style.backgroundColor = 'initial'
                                element.style.color           = 'initial'
                            })

                            this.dropdown.appendChild(element)
                            this.dropdown.style.opacity = 1
                        })
                    } else {
                        return
                    }
                })
            }).catch((error)=> {
                console.log(error)
            })
        }

        attributeChangedCallback(name, oldValue, newValue)
        {
            //
        }
    }

    module.exports = SimpleSearch

})()
