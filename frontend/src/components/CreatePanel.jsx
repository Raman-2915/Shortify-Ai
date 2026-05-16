import { useState,useEffect } from "react";
import toast from "react-hot-toast";

import API from "../services/api";
const CreatePanel = ({
  fetchUrls,
  setShowCreate,
  suggestedImage,
}) => {

  const [form, setForm] =
    useState({

      fullUrl: "",

      custom: "",

      selectedImage: "",

    });

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading,
    setLoading] =
      useState(false);


  useEffect(() => {

  if (suggestedImage) {

    setForm((prev) => ({
      ...prev,
      selectedImage:
        suggestedImage,
    }));

    setSuggestions((prev) => {

      if (
        prev.includes(
          suggestedImage
        )
      ) {
        return prev;
      }

      return [
        suggestedImage,
        ...prev,
      ];
    });
  }

}, [suggestedImage]);    
  // HANDLE INPUTS
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  };

  // HANDLE URL INPUT
  const handleUrlChange = (e) => {

  const value = e.target.value;

  setForm({
    ...form,
    fullUrl: value,
  });

  try {

    const domain =
      new URL(value).hostname;

    const imgs = [

      // FAVICON
      `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,

      // LOGO
      `https://logo.clearbit.com/${domain}`,

      // RANDOM BANNER
      `https://picsum.photos/seed/${domain}/400/200`,

    ];

    setSuggestions(imgs);

  } catch {

    setSuggestions([]);
  }
};

  // CREATE URL
  const createUrl = async () => {

    try {

      if (!form.fullUrl) {

        return toast.error(
          "Please enter URL"
        );
      }

      setLoading(true);

      await API.post(
        "/url/create",
        {

          fullUrl:
            form.fullUrl,

          custom:
            form.custom,

          image:
            form.selectedImage,

        }
      );

      toast.success(
        "Short URL created"
      );

      fetchUrls();

      setShowCreate(false);

    } catch (err) {

      console.log(err);

      toast.error(

        err?.response?.data?.message ||

        "Failed to create URL"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
  w-full
  h-full
  bg-slate-950

  md:border-r
  border-slate-700

  p-4
  md:p-5

  overflow-y-auto
">

      <div className="
  flex
  items-center
  justify-between
  mb-6
">

  <h2 className="
    text-2xl
    font-bold
  ">
    Create URL
  </h2>

  <button
    onClick={() =>
      setShowCreate(false)
    }
    className="
      text-3xl
      text-slate-400
      hover:text-white
      transition
    "
  >
    ✕
  </button>

</div>

      {/* URL INPUT */}
      <input
        type="text"
        name="fullUrl"
        value={form.fullUrl}
        placeholder="Enter long URL"
        onChange={handleUrlChange}
        className="
          w-full
          bg-slate-800
          p-3
          rounded-xl
          mb-4
          outline-none
        "
      />

      {/* CUSTOM SHORTNAME */}
      <input
        type="text"
        name="custom"
        value={form.custom}
        placeholder="Custom short name"
        onChange={handleChange}
        className="
          w-full
          bg-slate-800
          p-3
          rounded-xl
          mb-4
          outline-none
        "
      />

      {/* AI IMAGE */}
      {suggestions.length > 0 && (

  <div className="mt-4">

    <p className="
      text-sm
      text-slate-400
      mb-3
    ">
      AI Suggested Images
    </p>

    <div className="
      grid
      grid-cols-3
      gap-3
    ">

      {suggestions.map((img) => (

        <img
          key={img}

          src={img}
          onError={(e) => {
            e.target.src =
             "https://picsum.photos/400/200";
          }}

          onClick={() =>

            setForm({

              ...form,

              selectedImage: img,

            })

          }

          className={`
            h-24
            w-full
            object-cover
            rounded-xl
            cursor-pointer
            border-2
            transition
            hover:scale-105

            ${
              form.selectedImage === img

              ? "border-blue-500"

              : "border-slate-700"
            }
          `}
        />

      ))}

    </div>

  </div>

)}

      {/* BUTTON */}
      <button

        onClick={createUrl}

        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          transition
          p-3
          rounded-xl
          mt-5
        "
      >

        {loading
          ? "Generating..."
          : "Generate"}

      </button>

    </div>
  );
};

export default CreatePanel;