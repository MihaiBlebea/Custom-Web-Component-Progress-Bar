
(function() {

    class SimpleBreadcrumb extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })
        }

        connectedCallback()
        {
            console.log(this.spacer)
            this.wraper = document.createElement('div')
            this.wraper.style.backgroundColor = '#D5D5D5'
            this.wraper.style.borderRadius = '10px'
            this.wraper.style.padding = '10px'

            let elements = this.buildLinks(this.urlParams())
            elements.map((element, index)=> {
                let spacer = document.createElement('span')
                spacer.style.marginLeft = '10px'
                spacer.style.marginRight = '10px'
                spacer.textContent = this.spacer ? this.spacer : '/'

                this.wraper.appendChild(element)

                if(index < elements.length - 1)
                {
                    this.wraper.appendChild(spacer)
                }
            })

            this.shadowRoot.appendChild(this.wraper)
        }

        buildLinks(array)
        {
            let urlString = ''
            return array.map((param, index)=> {
                let element = null
                if(index < array.length - 1)
                {
                    element =  document.createElement('a')
                    element.textContent = param
                    urlString += '/' + param
                    element.setAttribute('href', urlString)
                } else {
                    element =  document.createElement('span')
                    element.textContent = param
                }
                return element
            })
        }

        urlParams()
        {
            let result = []
            window.location.href.replace(window.location.hostname, '')
                                .replace(window.location.protocol, '')
                                .split('?')[0]
                                .split('/')
                                .forEach((param)=> {
                                    if(param !== '')
                                    {
                                        result.push(param)
                                    }
                                })
            return result
        }

        get spacer()
        {
            return this.getAttribute('spacer')
        }

        set spacer(value)
        {
            return this.setAttribute('spacer', value)
        }

        disconnectedCallback()
        {
            //
        }

        attributeChangedCallback(name, oldValue, newValue)
        {
            //
        }
    }

    module.exports = SimpleBreadcrumb

})()
