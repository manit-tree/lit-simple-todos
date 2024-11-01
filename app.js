document.addEventListener('DOMContentLoaded', () => {
    let app = document.querySelector('#app');

    app.addEventListener('click', evt => {
        let el = evt.target;

        if (el.matches('button')) {
            let my_el = app.querySelector('my-element');

            my_el.setAttribute('version', '2.0.0');
            
            my_el.shadowRoot.querySelector('strong').style.setProperty('color', 'blue');

        }
    })
})