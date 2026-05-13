import {

  Copy,

  Pencil,

  Trash2,

  ExternalLink,


} from "lucide-react";

import toast from "react-hot-toast";

import API from "../services/api";

import { motion } from "framer-motion";

import { useState } from "react";


const UrlCard = ({

  url,

  fetchUrls,

  setEditingUrl,

}) => {

  const [showQR, setShowQR] =
    useState(false);

  const shortLink =
    `http://localhost:5000/${url.shortId}`;

  // COPY LINK
  const copyLink = () => {

    navigator.clipboard.writeText(
      shortLink
    );

    toast.success(
      "Copied to clipboard"
    );
  };

  // DELETE URL
  const deleteUrl = async () => {

   

    try {

      await API.delete(
        `/url/${url._id}`
      );

      fetchUrls();

      toast.success(
        "URL Deleted"
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Delete Failed"
      );
    }
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      whileHover={{
        y: -5,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        relative
        bg-slate-900/90
        backdrop-blur-xl
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-blue-500/20
        transition-all
        duration-300
        group
      "
    >

      {/* IMAGE */}
      <a
        href={url.fullUrl}
        target="_blank"
      >

        <img
          src={
            url.image ||

            "https://picsum.photos/400/200"
          }

          alt="thumbnail"

          className="
            w-full
            h-48
            object-cover
            group-hover:scale-105
            transition-all
            duration-500
          "
        />

      </a>

      {/* OVERLAY */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/60
        to-transparent
        pointer-events-none
      " />

      {/* ACTION BUTTONS */}
      <div className="
        absolute
        top-3
        right-3
        flex
        gap-2
        opacity-0
        group-hover:opacity-100
        transition
      ">

        {/* EDIT */}
        <button
          onClick={() =>
            setEditingUrl(url)
          }

          className="
            bg-yellow-500/90
            hover:scale-110
            transition
            p-2
            rounded-xl
          "
        >
          <Pencil size={16} />
        </button>

        {/* DELETE */}
        <button
          onClick={deleteUrl}

          className="
            bg-red-500/90
            hover:scale-110
            transition
            p-2
            rounded-xl
          "
        >
          <Trash2 size={16} />
        </button>

        {/* COPY */}
        <button
          onClick={copyLink}

          className="
            bg-blue-500/90
            hover:scale-110
            transition
            p-2
            rounded-xl
          "
        >
          <Copy size={16} />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h2 className="
          text-white
          font-bold
          text-xl
          mb-2
          truncate
        ">

          {url.title || url.shortId}

        </h2>

        {/* SHORT LINK */}
        <div className="
          flex
          items-center
          justify-between
        ">

          <a
            href={shortLink}
            target="_blank"

            className="
              text-blue-400
              font-semibold
              hover:underline
              truncate
            "
          >

            short.ly/{url.shortId}

          </a>

          <a
            href={url.fullUrl}
            target="_blank"

            className="
              text-slate-400
              hover:text-white
            "
          >

            <ExternalLink size={18} />

          </a>

        </div>

        {/* ORIGINAL URL */}
        <p className="
          text-slate-400
          text-sm
          mt-3
          truncate
        ">

          {url.fullUrl}

        </p>

        {/* FOOTER */}
        <div className="
          flex
          justify-between
          items-center
          mt-5
        ">

        </div>


      </div>

    </motion.div>
  );
};

export default UrlCard;