import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import styles from './style.css?inline';

@customElement('my-element')
export class MyElement extends LitElement {
    @property()
    version = '1.0.0';

    id = 1;

    @state()
    private _items = [
        { id: this.id++, text: 'Start Lit tutorial', completed: true },
        { id: this.id++, text: 'Make to-do list', completed: false },
        { id: this.id++, text: 'Learn Python', completed: false }
    ]

    handleClear = (evt) => {
        this._items = [];
    }

    handleReset = (evt) => {
        this._items = [
            { id: this.id++, text: 'Start Lit tutorial', completed: true },
            { id: this.id++, text: 'Make to-do list', completed: false },            
            { id: this.id++, text: 'Learn Python', completed: false }
        ]        
    }

    handleRemoveItem = (evt) => {
        evt.preventDefault();

        let el = evt.target;
        let id = el.closest('li')?.getAttribute('data-id');

        if (id) {
            this._items = this._items.filter(item => {
                return item.id != id;
            })
        }
    }

    handleKeyDown = (evt) => {
        if (evt.key == 'Enter') {
            let value = this.input.value.trim();

            if (value) {
                this._items =  [...this._items, {id: this.id++, text: value, completed: false}];
                this.input.value = '';
                this.input.focus();
            }
        }
    }

    @query('#newitem')
    input!: HTMLInputElement;

    render() {
        return html`
            <div class="root dark">                
                <h1>Simple Todos <span>${this.version}</span></h1>
                <div class="input-container">
                    <input id="newitem" aria-label="New item" placeholder="Todo Item..." @keydown=${this.handleKeyDown} />                    
                </div>
                <ul>
                      ${this._items.map((item) =>
                        html`<li data-id="${item.id}">${item.text} <a href="#" @click=${this.handleRemoveItem}>X</a></li>`
                      )}
                </ul>
                <div class="button-container">    
                    <button @click=${this.handleClear}>Clear</button>
                    <button @click=${this.handleReset}>Reset</button>
                </div>
            </div>
        `;
    }

    updated(changedProperties: Map<string, any>) {
        this.input.focus();
    }

    static get styles() {
        return unsafeCSS(styles);
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
