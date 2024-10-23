//import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { ContextsProvidersTree } from "./hooks/useData.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <ContextsProvidersTree>
      <App />
    </ContextsProvidersTree>
  </BrowserRouter>,
)
