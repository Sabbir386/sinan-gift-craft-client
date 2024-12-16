import { StrictMode } from "react";
import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import { router } from "./routes/Routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/features/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import Modal from "react-modal";


// Set the app element for react-modal
Modal.setAppElement("#root");
// import { router } from "./routes/Routes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
