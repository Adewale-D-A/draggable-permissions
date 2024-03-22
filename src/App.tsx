import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./404";
import RolesAndPermissions from "./pages/roels-and-permissions";
import AddRoles from "./pages/roels-and-permissions/add-roles";
import EditRoles from "./pages/roels-and-permissions/edit-roles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<RolesAndPermissions />} />
          <Route
            path="/roles-and-permissions/add-roles"
            element={<AddRoles />}
          />
          <Route
            path="/roles-and-permissions/edit-roles/:id"
            element={<EditRoles />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
