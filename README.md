# Vanilla Component Framework (VCF)

Et ultralet _vanilla JS_ framework til simple, statiske websites.  
Hele DOM'en ligger i HTML'en fra start — JavaScript styrer kun vis/skjul af views og binder adfærd til komponenter.

---

## Kort fortalt

**VCF** er bygget efter princippet:

> "Alt indhold ligger allerede i HTML'en. JavaScript ændrer kun synlighed og adfærd."

- Ingen mounting/unmounting af DOM-elementer
- SEO-venligt (alt indhold findes i HTML)
- Hurtigt og simpelt
- Komponenter = små JS-moduler, der binder events til eksisterende HTML

---

## 📁 Struktur

```
project/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── framework.js        # Kernefunktioner: views og komponenthåndtering
    ├── main.js             # Starter frameworket
    └── components/
        ├── nav.js          # Navigation med aktivt view
        └── counter.js      # Simpelt komponent med events
```

---

## ⚙️ Sådan virker det

### 1. Views (routing)

Hvert “view” er et `<section>`-element med attributten `data-view`.

```html
<section data-view="home">Forside</section>
<section data-view="about" hidden>Om os</section>
```

Frameworket viser/skjuler views ved at toggle `hidden`-attributten.

Navigation sker via `data-action="goto:viewName"`:

```html
<button data-action="goto:about">Gå til Om os</button>
```

`framework.js` håndterer hash-routing (`#home`, `#about`) og udsender et globalt event `viewchange`.

---

### 2. Komponenter

Komponenter defineres med:

```js
VCF.define('nav', el => { ... })
```

Frameworket finder automatisk alle elementer med `data-component="nav"` og kalder funktionen.

Eksempel:

```html
<header data-component="nav"></header>
```

---

### 3. Statiske komponenter

Alt HTML markup skal ligge i dokumentet fra start.
JavaScript må **kun** tilføje adfærd — aldrig skabe DOM-elementer.

Eksempel på komponent i HTML:

```html
<div data-component="counter">
  <span>Antal: <strong data-bind="count">0</strong></span>
  <button data-action="inc">+1</button>
  <button data-action="reset">Nulstil</button>
</div>
```

Og dens tilhørende logik:

```js
VCF.define("counter", (el) => {
  const countEl = el.querySelector('[data-bind="count"]');
  const inc = el.querySelector('[data-action="inc"]');
  const reset = el.querySelector('[data-action="reset"]');

  let count = 0;
  const render = () => (countEl.textContent = count);

  inc.addEventListener("click", () => {
    count++;
    render();
  });
  reset.addEventListener("click", () => {
    count = 0;
    render();
  });
});
```

---

### 4. Frameworkets kerne (`framework.js`)

De vigtigste funktioner:

- `VCF.initAll()` → Initialiserer views og komponenter
- `VCF.define(name, setupFn)` → Registrerer en komponent
- `VCF.showView(name)` → Skifter aktivt view manuelt
- Udsender `viewchange` event, når view skifter

---

<!--
## 🧩 Designprincipper

| Princip            | Forklaring                                               |
| ------------------ | -------------------------------------------------------- |
| **Statisk DOM**    | Alt indhold eksisterer i HTML fra start.                 |
| **Adfærdsbinding** | JS binder events og tilstand, men skaber ikke markup.    |
| **Modularitet**    | Hver komponent har sin egen fil under `js/components/`.  |
| **Simplicitet**    | Ingen build-step, ingen frameworks, kun ren HTML/CSS/JS. |
| **SEO-venlighed**  | Siden er fuldt læsbar uden at køre JS.                   |

---

## 🧠 Udvidelsesidéer

- Overgange mellem views (fade, slide etc.)
- Global state (`VCF.state = { ... }`)
- Event-bus til kommunikation mellem komponenter
- `data-if` eller `data-show` for betinget visning
- Indlæsning af komponent-HTML fra eksterne filer (progressiv rendering)

---

## ✅ Kom i gang

1. Download ZIP eller klon repo:
   ```bash
   git clone https://github.com/[DIT-BRUGERNAVN]/vanilla-component-framework.git
   ```
2. Åbn `index.html` i din browser.
3. Rediger markup og komponenter efter behov.

--- -->

## 🏁 Opsummering

**VCF** giver dig:

- Et genbrugeligt mini-framework til små projekter
- Fuldt statisk DOM
- Enkel komponentstruktur
- Hash-baseret routing
- Ingen afhængigheder – kun _vanilla HTML, CSS, JS_
