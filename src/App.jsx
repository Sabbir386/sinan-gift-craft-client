import { Route, RouterProvider, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import CreateOffer from "./pages/CreateOffer";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import { router } from "./routes/Routes";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
