import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        text-align: center;
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .container {
        max-width: 600px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      h1 {
        font-size: 4em;
        margin: 0;
        color: #ff4747;
      }
      p {
        font-size: 1.2em;
        color: #333;
        margin-top: 20px;
      }
      a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        margin-top: 20px;
        display: inline-block;
      }
      a:hover {
        text-decoration: underline;
      }

      img {
        width: 100%;
      }
    </style>
      <h1>404</h1>
        <img src="/assets/imgs/logo_2.png" alt="" />
      <p>Oops! The page you are looking for doesn't exist.</p>
      <a href="/frontend/pages/index.html">Go back to the homepage</a>
    </div>
    `;
}


export function init(styles, subloader, params) {
  loadStyles(styles);
}