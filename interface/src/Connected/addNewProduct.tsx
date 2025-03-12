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
    const name = prodcutName;
    const createdAt = new Date();

    startTransition(async () => {
      try {
        const response = await axios.post(
          "http://localhost:7000/user/addProduct",
          { taux, name, prixEnKilo, createdAt },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response) {
          nav("/connect/product");
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const createThumbaiilsImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedType = ["jpeg", "png", "gif", "jpg"];
    if (e.target.files) {
      const files = e.target.files[0];
      let filen: string | string[] = files.name;
      filen = filen.split(".");
      if (allowedType.indexOf(filen[filen.length - 1]) !== -1) {
        createThumbaiilsImage(files);
      }
    }
  };
  return (
    <div
      className={cn("flex flex-col bg-zinc-950 h-screen text-stone-100", {
        "bg-zinc-50": theme !== "dark",
      })}
    >
      <Header />
      <form action={save} className="flex flex-row justify-between border">
        <div className="flex flex-col gap-5 ">
          <label htmlFor="name">nom du produit</label>
          <input
            type="text"
            value={prodcutName}
            onChange={getProductName}
            name=""
            className="w-40 h-10 border border-zinc-950 "
            id=""
          />

          <label htmlFor="name">masse du produit</label>
          <input
            type="number"
            name="prixEnKilo"
            className="w-40 h-10 border border-zinc-950 "
            id=""
          />
          <label htmlFor="name">prix en kilo</label>

          <input
            type="number"
            name="taux"
            className="w-40 h-10 border border-zinc-950 "
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
            className="hidden"
            name=""
            id="image"
          />

          <div className="flex flex-col gap-4">
            <label htmlFor="">description du produit</label>
            <textarea
              name=""
              className="resize-none w-62 h-30 rounded-md bg-zinc-600 border-2 outline-none border-lime-500 "
              id=""
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
