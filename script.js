const FALLBACK_ENTRIES = [
  {
    id: "lab-01",
    code: "LAB-01",
    date: "26.03.2026",
    tone: "Contraste estructural",
    title: "Cómo diseñar para la oscuridad sin perder legibilidad",
    intro: "La penumbra funciona cuando la jerarquía espacial reemplaza al exceso de color.",
    kicker: "LECTURA // SISTEMA TONAL",
    tags: ["ui", "contraste", "tipografia", "jerarquia"],
    points: [
      "Negro profundo como fondo operativo, no como efecto dramático.",
      "Textos en verde grisáceo para lectura continua en sesiones largas.",
      "Acentos brillantes reservados para acciones y no para decoración."
    ],
    body: [
      "Un sistema low-key no se resuelve subiendo el brillo del texto hasta blanco puro. Se resuelve ordenando capas: fondo, contenedores, títulos y acciones con saltos tonales claros.",
      "Cuando el color disponible es mínimo, la composición debe hacer más trabajo: márgenes precisos, ritmo vertical regular y bloques con borde técnico para separar funciones.",
      "La legibilidad final depende de consistencia. Si cada módulo usa una intensidad distinta sin criterio, la interfaz pierde foco y la atmósfera se rompe."
    ]
  },
  {
    id: "lab-02",
    code: "LAB-02",
    date: "24.03.2026",
    tone: "Verde industrial",
    title: "La paleta verde industrial: fría, densa y utilitaria",
    intro: "La identidad visual nace de pocos tonos bien controlados, no de una paleta extensa.",
    kicker: "LECTURA // PALETA BASE",
    tags: ["paleta", "branding", "atmosfera", "color"],
    points: [
      "Base casi negra para profundidad constante.",
      "Medios desaturados para áreas de lectura y paneles.",
      "Un solo acento luminoso para navegación y CTA."
    ],
    body: [
      "El verde industrial transmite continuidad técnica sin caer en el cliché neón. La clave es recortar saturación y dejar que los valores de luminosidad marquen la narrativa.",
      "La base trabaja entre #000000 y #080a08; sobre esa sombra, los medios como #1e251f y #39463b sostienen interfaces densas pero legibles.",
      "Los acentos, #82cf89 y #a0f4a8, aparecen en dosis pequeñas: enlaces, foco y estados activos. Ese límite preserva tensión visual."
    ]
  },
  {
    id: "lab-03",
    code: "LAB-03",
    date: "22.03.2026",
    tone: "Centro estable",
    title: "Composición centrada con tensión horizontal",
    intro: "Un centro firme ordena la lectura; las líneas horizontales introducen cadencia operativa.",
    kicker: "LECTURA // COMPOSICIÓN",
    tags: ["layout", "grid", "direccion", "ritmo"],
    points: [
      "Masa visual principal cerca del centro para estabilidad.",
      "Scanlines y divisores horizontales para dirección constante.",
      "Animación breve para sugerir señal en vivo sin distraer."
    ],
    body: [
      "La composición centrada reduce ambigüedad: el usuario identifica rápido la zona de lectura principal. Esta decisión es útil cuando la interfaz es oscura y cargada de textura.",
      "Las líneas horizontales agregan una narrativa de monitor y sistema, reforzando la identidad low-key. No son adorno: organizan bloques y ritmo de escaneo.",
      "El movimiento se mantiene mínimo. Un deslizamiento leve de scanlines y apariciones escalonadas alcanza para dar vida sin romper concentración."
    ]
  },
  {
    id: "lab-04",
    code: "LAB-04",
    date: "20.03.2026",
    tone: "Textura controlada",
    title: "Textura: grano fino y scanlines discretas",
    intro: "La textura sostiene atmósfera cuando se mantiene por debajo del umbral de distracción.",
    kicker: "LECTURA // SUPERFICIE",
    tags: ["textura", "ruido", "scanlines", "detalles"],
    points: [
      "Ruido suave para evitar planos muertos.",
      "Scanlines lentas para profundidad temporal.",
      "Contraste alto para conservar claridad funcional."
    ],
    body: [
      "Una superficie totalmente lisa suele verse artificial en propuestas low-key. El grano fino introduce una fricción visual que vuelve el sistema más físico.",
      "Las scanlines aportan sensación de señal analógica. Si son demasiado intensas, molestan; si son tenues y lentas, construyen atmósfera sin competir con el contenido.",
      "El balance final combina textura, contraste y jerarquía tipográfica. Ninguno de esos elementos debería dominar por separado."
    ]
  }
];

const entriesPath = "content/entries.json";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

let revealCounter = 0;

function observeReveal(el) {
  if (!el || !el.classList.contains("reveal")) return;
  el.style.transitionDelay = `${Math.min(revealCounter * 70, 280)}ms`;
  revealCounter += 1;
  observer.observe(el);
}

[...document.querySelectorAll(".reveal")].forEach(observeReveal);

const form = document.querySelector(".subscribe form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;
    const original = button.textContent;
    button.textContent = "Canal confirmado";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
}

function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-\s_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseDateNumber(value) {
  const text = asString(value);
  if (!text) return Number.NaN;

  const dotMatch = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (dotMatch) {
    const day = Number(dotMatch[1]);
    const month = Number(dotMatch[2]) - 1;
    const year = Number(dotMatch[3]);
    return Date.UTC(year, month, day);
  }

  const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    return Date.UTC(year, month, day);
  }

  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? Number.NaN : parsed;
}

function splitLines(value) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  if (typeof value !== "string") return [];

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitParagraphs(value) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  if (typeof value !== "string") return [];

  return value
    .trim()
    .split(/\r?\n\s*\r?\n/g)
    .map((paragraph) => paragraph.replace(/\r?\n/g, " ").trim())
    .filter(Boolean);
}

function normalizeEntry(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = slugify(asString(raw.id) || asString(raw.code));
  if (!id) return null;

  const code = asString(raw.code) || id.toUpperCase();
  const date = asString(raw.date);
  const body = splitParagraphs(raw.body);

  return {
    id,
    code,
    date,
    tone: asString(raw.tone) || "Low-key",
    title: asString(raw.title) || code,
    intro: asString(raw.intro) || body[0] || "",
    kicker: asString(raw.kicker) || "LECTURA // ARCHIVO",
    tags: splitLines(raw.tags),
    points: splitLines(raw.points),
    body,
    dateNumber: parseDateNumber(date)
  };
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    const aValid = !Number.isNaN(a.dateNumber);
    const bValid = !Number.isNaN(b.dateNumber);

    if (aValid && bValid && a.dateNumber !== b.dateNumber) {
      return b.dateNumber - a.dateNumber;
    }

    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;

    return a.code.localeCompare(b.code);
  });
}

async function loadEntries() {
  try {
    const response = await fetch(entriesPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`No se pudo leer ${entriesPath} (${response.status})`);
    }

    const payload = await response.json();
    const source = Array.isArray(payload)
      ? payload
      : Array.isArray(payload.entries)
        ? payload.entries
        : [];

    const normalized = sortEntries(source.map(normalizeEntry).filter(Boolean));
    if (normalized.length > 0) return normalized;
  } catch (error) {
    console.warn("YACI: usando entradas de respaldo.", error);
  }

  return sortEntries(FALLBACK_ENTRIES.map(normalizeEntry).filter(Boolean));
}

let entriesPromise;

function getEntries() {
  if (!entriesPromise) entriesPromise = loadEntries();
  return entriesPromise;
}

function createTextElement(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}

function buildEntryCard(entry) {
  const card = document.createElement("article");
  card.id = `post-${entry.id}`;
  card.className = "entry-card reveal";

  const meta = createTextElement("p", `${entry.date} // ${entry.code}`);
  meta.className = "post-meta";
  card.appendChild(meta);

  card.appendChild(createTextElement("h2", entry.title));
  card.appendChild(createTextElement("p", entry.intro));

  if (entry.points.length > 0) {
    const list = document.createElement("ul");
    entry.points.slice(0, 3).forEach((point) => {
      list.appendChild(createTextElement("li", point));
    });
    card.appendChild(list);
  }

  const link = document.createElement("a");
  link.href = `entrada.html?id=${entry.id}`;
  link.textContent = "Abrir entrada completa";
  card.appendChild(link);

  return card;
}

function buildHomePost(entry) {
  const post = document.createElement("article");
  post.className = "post reveal";

  const meta = createTextElement("p", `${entry.date} // ${entry.code}`);
  meta.className = "post-meta";
  post.appendChild(meta);

  post.appendChild(createTextElement("h2", entry.title));
  post.appendChild(createTextElement("p", entry.intro));

  const link = document.createElement("a");
  link.href = `entrada.html?id=${entry.id}`;
  link.textContent = "Leer entrada";
  post.appendChild(link);

  return post;
}

async function renderHomePosts() {
  const postsRoot = document.querySelector("#posts");
  if (!postsRoot) return;

  const entries = await getEntries();
  if (!entries.length) return;

  postsRoot.replaceChildren();
  entries.slice(0, 3).forEach((entry) => {
    const card = buildHomePost(entry);
    postsRoot.appendChild(card);
    observeReveal(card);
  });
}

async function renderEntriesGrid() {
  const grid = document.querySelector(".entries-grid");
  if (!grid) return;

  const entries = await getEntries();

  grid.replaceChildren();

  if (!entries.length) {
    const empty = createTextElement("p", "No hay entradas publicadas todavía.");
    empty.className = "post-meta";
    grid.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const card = buildEntryCard(entry);
    grid.appendChild(card);
    observeReveal(card);
  });
}

function renderEntryBody(bodyEl, entry) {
  bodyEl.replaceChildren();

  entry.body.forEach((paragraph) => {
    bodyEl.appendChild(createTextElement("p", paragraph));
  });

  if (entry.points.length > 0) {
    const pointsWrap = document.createElement("section");
    pointsWrap.className = "article-points";

    pointsWrap.appendChild(createTextElement("h3", "Puntos Clave"));

    const list = document.createElement("ul");
    entry.points.forEach((point) => {
      list.appendChild(createTextElement("li", point));
    });

    pointsWrap.appendChild(list);
    bodyEl.appendChild(pointsWrap);
  }
}

async function renderEntryPage() {
  const entryRoot = document.querySelector("[data-entry-page]");
  if (!entryRoot) return;

  const entries = await getEntries();
  if (!entries.length) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = slugify(params.get("id"));

  const indexById = new Map();
  entries.forEach((entry, index) => {
    indexById.set(entry.id, { entry, index });
  });

  const fallback = entries[0];
  const currentData = indexById.get(requestedId) || { entry: fallback, index: 0 };
  const current = currentData.entry;
  const currentIndex = currentData.index;

  const titleEl = document.querySelector("#entry-title");
  const introEl = document.querySelector("#entry-intro");
  const kickerEl = document.querySelector("#entry-kicker");
  const metaEl = document.querySelector("#entry-meta");
  const bodyEl = document.querySelector("#entry-body");
  const codeEl = document.querySelector("#entry-code");
  const dateEl = document.querySelector("#entry-date");
  const toneEl = document.querySelector("#entry-tone");
  const tagsEl = document.querySelector("#entry-tags");
  const prevEl = document.querySelector("#entry-prev");
  const nextEl = document.querySelector("#entry-next");

  if (titleEl) titleEl.textContent = current.title;
  if (introEl) introEl.textContent = current.intro;
  if (kickerEl) kickerEl.textContent = current.kicker;
  if (metaEl) metaEl.textContent = `${current.date} // ${current.code}`;
  if (codeEl) codeEl.textContent = current.code;
  if (dateEl) dateEl.textContent = current.date;
  if (toneEl) toneEl.textContent = current.tone;

  if (bodyEl) renderEntryBody(bodyEl, current);

  if (tagsEl) {
    tagsEl.replaceChildren();
    current.tags.forEach((tag) => {
      tagsEl.appendChild(createTextElement("span", tag));
    });
  }

  const previous = entries[(currentIndex - 1 + entries.length) % entries.length];
  const next = entries[(currentIndex + 1) % entries.length];

  if (prevEl && previous) {
    prevEl.href = `entrada.html?id=${previous.id}`;
    prevEl.textContent = `Anterior: ${previous.code}`;
  }

  if (nextEl && next) {
    nextEl.href = `entrada.html?id=${next.id}`;
    nextEl.textContent = `Siguiente: ${next.code}`;
  }

  document.title = `YACI // ${current.code}`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", current.intro);
}

void renderHomePosts();
void renderEntriesGrid();
void renderEntryPage();
