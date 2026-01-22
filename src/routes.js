import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";

import Loader from "./components/Loader";

import Template from "./pages/Template";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Login from "./pages/Login";
import ViewAccount from "./pages/Accounts/View";

function App() {
  return (
    <>
      <LoadingProvider>
        <MenuProvider>
          <Loader />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>

            <Routes>
              <Route path="/administracao" element={<Template />}>
                <Route index element={<Dashboard />} />
                <Route path="contas" element={<Accounts />} />
                <Route path="contas/conta/:id" element={<ViewAccount />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
