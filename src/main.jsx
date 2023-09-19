import { createRoot } from "react-dom/client";

import { worker } from "./mocks/browser.js";
import App from "./App.jsx";

worker.start();

const root = createRoot(document.getElementById("root"));
root.render(<App />);
