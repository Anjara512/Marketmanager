import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import Header from "../main/Header";
import { useTheme } from "../store/zustand";
import { cn } from "../lib/utils";
import axios from "axios";

interface archive {
  createdAt: Date;
  id: number;
  price: number;
  produit: string;
  taux: number;
  userId: number;
}
const Details = () => {
  const token = localStorage.getItem("token");
  const { theme } = useTheme();
  const userId = useParams();
  const [archiveDay, setarchiveDay] = useState<archive[]>();
  const tabid = userId.id;
  const moi = tabid?.split(",")[0];
  const mois = moi?.split(":")[1];
  const jour = tabid?.split(",")[1];

  const nav = useNavigate();

  useEffect(() => {
    const getArchiver = async () => {
      const response = await axios.get("http://localhost:7000/getArchiver", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        setarchiveDay(response.data);
        console.log(response.data);
      }
    };
    getArchiver();
  }, [nav, token]);
  return (
    <div
      className={cn("flex flex-col h-screen w-full  text-white  bg-zinc-950", {
        "bg-slate-200 text-black": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row bg-transparent">
        <Nav />
        <div className="flex flex-col gap-4  ">
          <h1 className="w-full flex  ">Nos vente du {jour}</h1>

          <div className="flex flex-col">
            <ul>
              {archiveDay?.map((el, index) => (
                <li
                  key={index}
                  className={cn("flex flex-col gap-2   rounded-md", {
                    "bg-zinc-200": theme !== "dark",
                  })}
                >
                  {Number(new Date(el.createdAt).getDate()) === Number(jour) &&
                  Number(new Date(el.createdAt).getMonth()) ===
                    Number(mois) - 1 ? (
                    <div className="flex flex-row gap-4 ">
                      <div className="flex flex-col gap-1 bg-zinc-800 p-2 rounded-md mt-2 ">
                        <u className="uppercase no-underline font-medium text-lime-500">
                          produit
                        </u>
                        <b>{el.produit}</b>
                      </div>
                      <div className="flex flex-col gap-2 bg-zinc-800 p-2 rounded-md mt-2 ">
                        <u className="uppercase no-underline font-medium text-lime-500">
                          quantité
                        </u>
                        <b>{el.taux}</b>
                      </div>
                      <div className="flex flex-col gap-2 bg-zinc-800 p-2 rounded-md mt-2 ">
                        <u className="uppercase no-underline font-medium text-lime-500">
                          heure de vente
                        </u>
                        <b>{new Date(el.createdAt).toLocaleTimeString()}</b>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
