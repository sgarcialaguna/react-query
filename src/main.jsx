import ReactDOM from "react-dom/client";
import { worker } from "./mocks/browser.js";
import App from "./App.jsx";

worker.start();

ReactDOM.createRoot(document.getElementById("root"), <App />).render();
