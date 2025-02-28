import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>404 - Not Found</h2>
      <p>The page you requested does not exist.</p>
    `;
}


export function init(styles, params) {
  loadStyles(styles);
}