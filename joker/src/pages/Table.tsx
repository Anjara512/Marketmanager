import React, { useActionState, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import Header from "../main/Header";
import Nav from "../components/nav";
import { Products } from "./produit";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useTheme } from "../store/zustand";
import { API } from "../lib/cappApi";

const Table = () => {
  const [products, setproducts] = useState<Products[]>([]);
  const [productFilter, setproductFilter] = useState<Products[]>([]);
  const [choice, setchoice] = useState<Products>();
  const [searcher, setsearcher] = useState(" ");
  const [name, setname] = useState(" ");
  const [price, setprice] = useState<number>();
  const [taux, settaux] = useState<number>();

  const nav = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const response = await API.get("/user/getProduct");
      if (response) {
        setproducts(response.data);
      }
    };
    getProduct();
  }, [products, nav]);

  const getChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearcher(e.target.value);
    if (searcher.trim()) {
      setproductFilter(
        products.filter((el) => {
          return el.name.startsWith(searcher.trim());
        })
      );
    }
  };

  const saleProduct = async () => {
    const createdAt = new Date();
    if (name && taux) {
      try {
        const response = await API.post("/user/postArchive", {
          name,
          taux,
          price,
          createdAt,
        });

        if (response) {
          setname("");
          settaux(0);
          setprice(0);
          return {
            success: true,
            message: response.data,
          };
        }
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    }
  };

  const [response, formaction, isPending] = useActionState(saleProduct, null);

  const addContent = (el: Products) => {
    setchoice(el);
    setname(el.name);
    setsearcher(" ");
    setprice(el.prixEnKilo);
  };
  useEffect(() => {
    if (taux && choice) {
      setprice(Number(taux) * choice?.prixEnKilo);
      console.log(taux, price);
    }
  }, [taux]);

  const { theme } = useTheme();

  return (
    <div className={cn("flex flex-col bg-zinc-800")}>
      <Header />
      <div className="flex flex-row">
        <Nav />
        <main className="flex flex-col gap-5 ml-10 w-full ">
          <div className="flex flex-col">
            <p className="text-white">
              {response?.success ? response.success : null}
            </p>
            <div>
              <Search className="absolute text-2xl  md:text-8xl text-zinc-50 mt-2" />
              <input
                type="search"
                value={searcher}
                onChange={getChoice}
                placeholder="Rechercher un produit"
                name=""
                className={cn(
                  "px-4 pl-10 text-white py-6 rounded-md w-3/4 bg-gray-950 font-medium text-sm focus:ring-4 ring-blue-500 focus:outline-none"
                )}
                id=""
              />
            </div>
            <ul
              className={cn(
                "flex flex-col gap-3 text-zinc-50 bg-stone-800 w-1/2"
              )}
            >
              {searcher.trim()
                ? productFilter.map((el, index) => (
                    <li
                      onClick={() => addContent(el)}
                      key={index}
                      className="flex flex-row justify-between w-1/2 cursor-pointer"
                    >
                      <span>{el.name}</span>
                      <span>{el.prixEnKilo}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <form
            action={formaction}
            className={cn(
              "md:w-62 ww-max p-5 text-slate-50  mt-4 flex flex-col gap-5 rounded-md  border border-zinc-500",
              {
                "bg-stone-50 text-zinc-800": theme !== "dark",
              }
            )}
          >
            <label htmlFor="">le produit a vendre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              name=""
              className={cn(
                "w-max px-4 py-2 focus:ring-4 ring-blue-700 focus:outline-none text-white font-mono bg-gray-950 rounded-md cursor-pointer ",
                {
                  "bg-zinc-200 text-black": theme !== "dark",
                }
              )}
              id=""
            />
            quantité
            <input
              type="number"
              value={taux}
              onChange={(e) => {
                settaux(() => Number(e.target.value));
              }}
              name=""
              className={cn(
                "w-max px-4 py-2 focus:ring-4 ring-blue-700 focus:outline-none text-white font-mono bg-gray-950 rounded-md cursor-pointer ",
                {
                  "bg-stone-200 text-black": theme !== "dark",
                }
              )}
            />
            <div className="flex flex-row gap-2">
              <label htmlFor="">Net a payer</label>
              <p className="text-white ">{Number(price)}ar</p>
            </div>
            <button
              className={cn(
                "w-max px-4 py-2 focus:ring-4 ring-blue-700 focus:outline-none text-white font-mono bg-gray-800 rounded-md cursor-pointer ",
                {
                  "bg-slate-200 text-black": theme !== "dark",
                }
              )}
              disabled={isPending}
            >
              vendre
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Table;
