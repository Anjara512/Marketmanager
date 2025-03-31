import { NavLink } from "react-router-dom";
import Nav from "../components/nav";
import { cn } from "../lib/utils";
import Header from "../main/Header";
import { useTheme } from "../store/zustand";
import { useEffect, useState, useTransition } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { getProducts } from "../lib/server";

export interface Products {
  name: string;
  taux: number;
  prixEnKilo: number;
  ImageProduct: string;
  createdAt: Date;
}

export default function Produit() {
  const [products, setproducts] = useState<Products[]>([]);
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();

  useEffect(() => {
    const getProduct = async () => {
      const data = await getProducts();
      startTransition(() => {
        setproducts(data);
      });
    };
    getProduct();
  }, []);

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
          <div className="w-full flex flex-row justify-between">
            <h1 className="flex  ">les produit disponible</h1>
            <button className="w-max h-max hover:outline-none hover:ring-4 ring-blue-800 bg-blue-500 md:px-4 text-sm md:text-md  md:py-2 rounded-full cursor-pointer ">
              <NavLink to={"/connect/addProduct"}>
                Ajouter de nouveau produit
              </NavLink>
            </button>
          </div>
          <div className="flex flex-col">
            {!isPending ? (
              <ul className="grid md:grid-cols-5 grid-cols-3 md:gap-4 gap-2  ">
                {products.map((el, index) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: index * 0.3,
                      duration: 0.3,
                      bounce: 0.5,
                    }}
                    className={cn(
                      "flex cursor-pointer flex-col   border-1 border-blue-500  md:gap-2 gap-1 font-medium md:uppercase w-max h-max rounded-md bg-stone-800 md:px-2 md:py-3 p-1 shadow -md ",
                      {
                        "bg-slate-100": theme !== "dark",
                      }
                    )}
                    key={index}
                  >
                    <div className="flex flex-col gap-2">
                      {el.ImageProduct && (
                        <img
                          src={`http://localhost:7000${el.ImageProduct}`}
                          className="md:w-20 w-10 h-10 md:h-20 rounded-md "
                          alt="image du produit"
                        />
                      )}

                      {el.name}
                    </div>
                    <span className="flex flex-row">
                      <Eye className="text-blue-500"></Eye>
                    </span>
                    <span>{el.prixEnKilo} ar</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              "is loading"
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
