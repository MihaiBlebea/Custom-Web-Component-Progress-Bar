(function() {

    class SimpleScroll extends HTMLElement
    {
        constructor()
        {
            super()
            this.attachShadow({ mode: 'open' })

            this._scrollToTop = this._scrollToTop.bind(this)
        }

        connectedCallback()
        {
            this.content = document.createElement('slot')

            this.content.addEventListener('click', this._scrollToTop)
            this.shadowRoot.appendChild(this.content)
        }

        disconnectedCallback()
        {
            this.content.removeEventListener('click', this._scrollToTop)
        }

        _scrollToTop()
        {
            document.querySelector('html').style.scrollBehavior = 'smooth'
            if(document.body.scrollTop > window.innerWidth)
            {
                window.scroll(0,0)
            }
        }
    }

    // customElements.define('simple-scroll', SimpleScroll)
    module.exports = SimpleScroll

})()
