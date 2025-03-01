import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>From user dashboard</h2>
    `;
}


export function init(styles, params) {
  console.log(params)
  loadStyles(styles);
}