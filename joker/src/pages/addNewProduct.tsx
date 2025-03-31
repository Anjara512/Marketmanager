import axios from "axios";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useTheme } from "../store/zustand";
import Header from "../main/Header";
import { Image } from "lucide-react";

export default function AddNewProduct() {
  const { theme } = useTheme();
  const token = localStorage.getItem("token");
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [imagetoDb, setImagetoDb] = useState<File>();
  const nav = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [prodcutName, setProductName] = useState<string>("");
  const [tauxUnity, settauxUnity] = useState("kg");
  const liquide = ["huille", "eau"];

  const getProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    if (liquide.indexOf(e.target.value) !== -1) {
      settauxUnity("litre");
    } else {
      settauxUnity("kg");
    }
  };

  const save = async (e: FormData) => {
    const taux = Number(e.get("taux"));
    const prixEnKilo = Number(e.get("prixEnKilo"));
    const description = e.get("description") as string;
    const name = prodcutName;
    const image = imagetoDb;

    const createdAt = new Date();

    startTransition(async () => {
      try {
        const response = await axios.post(
          "http://localhost:7000/user/addProduct",
          { taux, name, prixEnKilo, createdAt, image, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          nav("/connect/product");
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImagetoDb(file);
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div
      className={cn("flex flex-col bg-zinc-950 h-screen text-stone-100", {
        "bg-zinc-50 text-zinc-950": theme !== "dark",
      })}
    >
      <Header />
      <form
        action={save}
        className="flex md:flex-row flex-col  h-screen overflow-y-scroll justify-between border"
      >
        <div className="flex flex-col gap-5 ">
          <label htmlFor="name">nom du produit</label>
          <input
            type="text"
            value={prodcutName}
            onChange={getProductName}
            name=""
            className={cn(
              "w-max px-4 py-2 focus:ring-2 ring-blue-700 focus:outline-none text-white font-mono bg-gray-800 rounded-md cursor-pointer ",
              {
                "bg-zinc-200 border-black border-1 text-black":
                  theme !== "dark",
              }
            )}
            id=""
          />

          <label htmlFor="name">masse du produit</label>
          <input
            type="number"
            name="prixEnKilo"
            className={cn(
              "w-max px-4 py-2 focus:ring-2 ring-blue-700 focus:outline-none text-white font-mono bg-gray-800 rounded-md cursor-pointer ",
              {
                "bg-zinc-200 border-black border-1 text-black":
                  theme !== "dark",
              }
            )}
            id=""
          />
          <label htmlFor="name">prix en kilo</label>

          <input
            type="number"
            name="taux"
            className={cn(
              "w-max px-4 py-2 focus:ring-2 ring-blue-700 focus:outline-none text-white font-mono bg-gray-800 rounded-md cursor-pointer ",
              {
                "bg-zinc-200 border-black border-1 text-black":
                  theme !== "dark",
              }
            )}
            id=""
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-max h-max hover:outline-none hover:ring-4 ring-blue-800 bg-blue-500 px-4 py-2 rounded-full cursor-pointer "
          >
            ajouter
          </button>
          {tauxUnity}
        </div>
        <div className="mr-20">
          <label htmlFor="image">
            <h1>photo du produit </h1>
            {!image ? (
              <Image size={200} />
            ) : (
              <img src={String(image)} className="w-62 h-62" alt="none"></img>
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            accept=".jpeg,.jpg,.png"
            className="hidden"
            name=""
            id="image"
          />

          <div className="flex flex-col gap-4">
            <label htmlFor="">description du produit</label>
            <textarea
              name="description"
              className="resize-none w-62 h-30 rounded-md bg-zinc-600 border-2 outline-none border-lime-500 "
              id=""
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
