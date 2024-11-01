# Lit Simple Todos

Simple Todos Component developed using LIT + Tailwind

### Screenshot

![image](https://github.com/user-attachments/assets/2db4c333-966c-49c7-a5be-4f673eb573b1)

### src/index.ts

```ts
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
```

### src/style.css

```css
div {
    h1 {
        @apply text-center font-normal mb-8;

        span {
            @apply text-base text-blue-500;
        }
    }

    .input-container {
        @apply space-y-3 mb-6;

        input {
            &:focus-visible {
                outline: 0;
            }

            @apply box-border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500;
        }
    }

    ul {
        @apply p-0 marker:text-blue-600 list-disc space-y-2 text-sm text-gray-600 dark:text-neutral-400;

        li {
            @apply flex flex-row justify-between py-1 border-b  border-red-200 dark:border-neutral-800;

            a {
                @apply no-underline text-blue-500 active:text-blue-500;
            }
        }
    }

    .button-container {
        @apply flex flex-row justify-center gap-3 mt-5;

        button {
            cursor: pointer;
            @apply min-w-[100px] flex justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none;
        }        
    }
}
```

### package.json

```json
{
  "name": "Lit Simple Todos",
  "description": "Simple Todos Component developed using LIT + Tailwind",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "author": "Mr.Manit Treeprapankit",
  "license": "MIT",
  "dependencies": {
    "lit": "^3.2.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.14",
    "typescript": "~5.6.2",
    "vite": "^5.4.10"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    "strictNullChecks": true
  },
  "include": ["src"]
}
```

### vite.config.js

```js
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
    plugins: [
       tailwindcss()
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss()
            ]
        }
    },
    build: {
        outDir: './dist',
        minify: 'esbuild',
        sourcemap: false,
        emptyOutDir: true,   
        lib: {
            entry: './src/index.ts',
            name:'___',
            formats: ['es','iife'],
            fileName: (format) => `[name].[format].js`
        },
        esbuild: {
            minify: true
        }
    }
})
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'selector',
  content:[
    "./index.html",
    "./src/**/*.{html,js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
