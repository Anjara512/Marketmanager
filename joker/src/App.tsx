import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import Connexion from "./main/Connexion";
import CreateUser from "./main/createUser";
import Produit from "./pages/produit";
import AddNewProduct from "./pages/addNewProduct";
import Archives from "./pages/Archives";
import Table from "./pages/Table";
import Details from "./pages/Details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/connexion" element={<Connexion />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
        <Route path="/connect/product" element={<Produit />}></Route>
        <Route path="/connect/addProduct" element={<AddNewProduct />}></Route>
        <Route path="/connect/Archives" element={<Archives />}></Route>
        <Route path="/connect/Archives/:id" element={<Details />}></Route>
        <Route path="/connect/Table" element={<Table />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
