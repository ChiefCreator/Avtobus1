export function createDOM(tag, { className, id, innerHTML, textContent, attributes }) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (id) el.id = id;
  if (textContent) el.textContent = textContent;
  if (innerHTML) el.innerHTML = innerHTML;
  if (attributes) {
    Object.entries(attributes)?.forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  return el;
}

export function generateId(length = 10) {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
