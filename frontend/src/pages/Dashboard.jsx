import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import UrlCard from "../components/UrlCard";
import CreatePanel from "../components/CreatePanel";
import EditModal from "../components/EditModal";
import { motion } from "framer-motion";

const Dashboard = () => {

  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestedImage, setSuggestedImage] =useState("");
  const [showMobileChat,
  setShowMobileChat] =
  useState(false);

  const [urls, setUrls] = useState([]);
  const [editingUrl, setEditingUrl] = useState(null);

  const username = localStorage.getItem("username");

  // FETCH URLS
  const fetchUrls = async () => {

    if (!username) return;

    try {

      const res = await API.get("/url/my");

      setUrls(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="h-screen text-[14px] overflow-hidden bg-slate-950 text-white ">

      <Navbar setShowCreate={setShowCreate} />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">

        {/* LEFT */}
        <div className="flex w-[80%]">

          {/* CREATE PANEL */}
          {/* DESKTOP CREATE PANEL */}
{showCreate && (

  <>

    {/* MOBILE FULLSCREEN */}
    <div className="
      fixed
      inset-0
      z-50
      bg-slate-950
      md:hidden
    ">

      <CreatePanel
        fetchUrls={fetchUrls}
        setShowCreate={setShowCreate}
        suggestedImage={suggestedImage}
      />

    </div>

    {/* DESKTOP SIDEBAR */}
    <div className="
      hidden
      md:block
      w-[25%]
    ">

      <CreatePanel
        fetchUrls={fetchUrls}
        setShowCreate={setShowCreate}
        suggestedImage={suggestedImage}
      />

    </div>

  </>

)}

  

          {/* GRID */}
          <div
            className={`${
              showCreate ? "w-[75%]" : "w-full"
            } overflow-y-auto p-4`}
          >
                    <input
            type="text"
            placeholder="Search URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 p-4 rounded-2xl mb-6 outline-none border border-slate-700"
          />
          {/* ADD CARD */}
          <motion.div

  whileHover={{
    scale: 1.02,
  }}

  whileTap={{
    scale: 0.98,
  }}

  onClick={() => {

    if (!username) {

      window.location.href =
        "/login";

    } else {

      setShowCreate(true);
    }
  }}

  className="
    border-2
    border-dashed
    border-slate-700
    rounded-3xl
    h-44
    flex
    flex-col
    items-center
    justify-center
    cursor-pointer
    hover:bg-slate-900/50
    transition-all
    duration-300
    mb-6
    bg-slate-900/20
    backdrop-blur-xl
  "
>

  <span className="
    text-6xl
    text-blue-500
    font-light
  ">
    +
  </span>

  <p className="
    text-slate-400
    mt-3
  ">
    Create Smart URL
  </p>

</motion.div>
     {urls.length === 0 && (

  <motion.div

    initial={{
      opacity: 0,
      scale: 0.9,
    }}

    animate={{
      opacity: 1,
      scale: 1,
    }}

    className="
      h-[350px]
      flex
      items-center
      justify-center
    "
  >

    <div className="text-center">

      <div className="
        text-7xl
        mb-4
      ">
      </div>

      <h2 className="
        text-3xl
        font-bold
        text-slate-300
      ">

        No URLs Yet

      </h2>

      <p className="
        text-slate-500
        mt-3
      ">

        Create your first AI-powered short URL

      </p>

    </div>

  </motion.div>

)}

{/* STATS */}

<div className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-4
  mb-6
">

  {/* TOTAL */}
  <div className="
    bg-slate-900/70
    backdrop-blur-xl
    border
    border-slate-800
    rounded-3xl
    p-5
  ">

    <p className="text-slate-400 text-sm">
      Total URLs
    </p>

    <h2 className="
      text-3xl
      font-bold
      mt-2
    ">
      {urls.length}
    </h2>

  </div>

  {/* CUSTOM */}
  <div className="
    bg-slate-900/70
    backdrop-blur-xl
    border
    border-slate-800
    rounded-3xl
    p-5
  ">

    <p className="text-slate-400 text-sm">
      Custom Shortnames
    </p>

    <h2 className="
      text-3xl
      font-bold
      mt-2
    ">

      {
        urls.filter(
          (u) => u.shortId.length > 6
        ).length
      }

    </h2>

  </div>

  {/* AI IMAGES */}
  <div className="
    bg-slate-900/70
    backdrop-blur-xl
    border
    border-slate-800
    rounded-3xl
    p-5
  ">

    <p className="text-slate-400 text-sm">
      AI Images
    </p>

    <h2 className="
      text-3xl
      font-bold
      mt-2
    ">

      {
        urls.filter(
          (u) => u.image
        ).length
      }

    </h2>

  </div>

</div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {urls
                .filter((url) =>
                  url.shortId
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((url) => (
                <UrlCard
                  key={url._id}
                  url={url}
                  fetchUrls={fetchUrls}
                  setEditingUrl={setEditingUrl}
                />
              ))}

            </div>

          </div>

        </div>

        {/* CHATBOT */}
        <div className="hidden
  xl:block
  w-[22%]
  min-w-[320px]
  border-l
  border-slate-800
  bg-slate-950/60
  backdrop-blur-xl">
          <Chatbot
            urls={urls}
            setSuggestedImage={
              setSuggestedImage
            }
          />
        </div>

        {/* MOBILE CHATBOT */}
<div className="lg:hidden fixed bottom-4 right-4 z-50">

  <button
  onClick={() =>
    setShowMobileChat(true)
  }
  className="
    fixed
    bottom-5
    right-5
    z-50

    h-16
    w-16

    rounded-full

    bg-gradient-to-r
    from-blue-500
    to-cyan-500

    shadow-2xl
    shadow-blue-500/40

    flex
    items-center
    justify-center

    text-2xl

    animate-pulse

    hover:scale-110
    transition-all
    duration-300
  "
>
  🤖
</button>

</div>

{
  showMobileChat && (

    <div className="
      fixed
      inset-0
      bg-slate-950
      z-50
    ">

      <div className="
        flex
        justify-between
        items-center
        p-4
        border-b
        border-slate-700
      ">

        <h2 className="text-xl font-bold">
          AI Assistant
        </h2>

        <button
          onClick={() =>
            setShowMobileChat(false)
          }
          className="
            text-red-500
            text-xl
          "
        >
          ✕
        </button>

      </div>

      <div className="h-[calc(100%-70px)]">
        <Chatbot urls={urls}
         setSuggestedImage={
              setSuggestedImage
            }
        />
      </div>

    </div>
  )
}

      </div>
      {editingUrl && (
         <EditModal
           editingUrl={editingUrl}
           setEditingUrl={setEditingUrl}
           fetchUrls={fetchUrls}
         />
       )}

    </div>
  );
};

export default Dashboard;