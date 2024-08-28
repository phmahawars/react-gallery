import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Home from "./page/home/Home.jsx";
import LightBox from "./page/lightBox/LightBox.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import GalleryStoreConfigure from "./store/Index.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./page/login/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    sessionStorage.getItem("token_gallery") ? (
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/view/:indexId" element={<LightBox />} />
      </Route>
    ) : (
      <Route path="/" element={<Login />}></Route>
    )
  )
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={GalleryStoreConfigure}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
