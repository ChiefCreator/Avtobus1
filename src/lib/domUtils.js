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
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
