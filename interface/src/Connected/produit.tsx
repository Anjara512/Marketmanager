import { NavLink, useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { cn } from "../lib/utils";
import Header from "../main/Header";
import { useTheme } from "../store/zustand";
import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";

export interface Products {
  name: string;
  taux: number;
  prixEnKilo: number;
  createdAt: Date;
}

export default function Produit() {
  const [products, setproducts] = useState<Products[]>([]);
  const { theme } = useTheme();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        "http://localhost:7000/user/getProduct",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response) {
        setproducts(response.data);
      }
    };
    getProduct();
  }, [products, token, nav]);
  return (
    <div
      className={cn("flex flex-col h-screen text-white bg-zinc-950", {
        "bg-slate-50 text-black": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row bg-transparent">
        <Nav />
        <div className="flex flex-col gap-4  ">
          <h1 className="w-full flex  ">les produit disponible</h1>

          <button className="w-max h-max hover:outline-none hover:ring-4 ring-blue-800 bg-blue-500 px-4 py-2 rounded-full cursor-pointer ">
            <NavLink to={"/connect/addProduct"}>
              Ajouter de nouveau produit
            </NavLink>
          </button>
          <div className="flex flex-col">
            <ul className="grid grid-cols-5 md:gap-4 gap-2 ">
              {products.map((el, index) => (
                <li
                  className={cn(
                    "flex flex-col border-1 border-blue-500  gap-2 font-medium md:uppercase w-max h-max rounded-md bg-stone-800 md:px-2 md:py-3 p-1 shadow -md ",
                    {
                      "bg-slate-100": theme !== "dark",
                    }
                  )}
                  key={index}
                >
                  <span className="flex flex-row">
                    {el.name}
                    <Eye className="text-blue-500"></Eye>
                  </span>
                  <span>{el.prixEnKilo} ar</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
