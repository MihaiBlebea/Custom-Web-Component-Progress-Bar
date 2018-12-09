
(function() {

    class SimpleSearch extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

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

        _fetchData(event)
        {
            let value  = event.path[0].value
            let border = 'solid 0.5px #d5d5d5'

            fetch(this.url).then((result)=> {
                result.json().then((data)=> {

                    this._removeChildrenNode(this.dropdown)
                    this.dropdown.style.opacity = 0

                    data.map((item)=> {
                        if(item[this.name].toLowerCase().startsWith(value.toLowerCase()) && value !== '')
                        {
                            let element = document.createElement('div')
                            element.style.borderBottom  = border
                            element.style.borderLeft    = border
                            element.style.borderRight   = border
                            element.style.paddingTop    = '5px'
                            element.style.paddingBottom = '5px'
                            element.style.paddingLeft   = '10px'
                            element.style.paddingRight  = '10px'

                            let url = document.createElement('a')
                            url.style.textDecoration = 'none'
                            url.style.color          = 'initial'
                            url.textContent          = item[this.name]
                            url.setAttribute('href', item[this.click])

                            element.appendChild(url)
                            this.dropdown.appendChild(element)

                            this.dropdown.style.opacity = 1
                        }
                    })
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

    // customElements.define('simple-search', SimpleSearch)
    module.exports = SimpleSearch

})()
