import {
  useState,
  useEffect,
  useRef,
} from "react";

import toast from "react-hot-toast";

import API from "../services/api";

const Chatbot = ({
  setSuggestedImage,
}) => {

  const [messages, setMessages] =
    useState([
      {
        sender: "ai",
        text:
          `Welcome to Shortify AI

• Ask for shortname ideas
• Get branding suggestions
• Learn how to use the platform
• Ask general questions`,
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const chatEndRef = useRef(null);  
  useEffect(() => {

  chatEndRef.current?.scrollIntoView({

    behavior: "smooth",

  });

}, [messages]);

  // SEND MESSAGE
  const sendMessage = async (
    e
  ) => {

    // IMPORTANT
    if (e) e.preventDefault();

    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userInput,
      },
    ]);

    setInput("");

    try {

      setLoading(true);

      const res =
        await API.post(
          "/ai/chat",
          {
            message: userInput,
          }
        );

      const aiReply =
        res?.data?.reply ||
        "No response";

      const aiImage =
        res?.data?.image;

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
          image: aiImage,
        },
      ]);

      // AUTO SET IMAGE
      if (
        aiImage &&
        setSuggestedImage
      ) {

        setSuggestedImage(
          aiImage
        );
      }

    } catch (err) {

      console.log(err);

      toast.error(
        "AI unavailable"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
      h-full
      bg-slate-900
      border-l
      border-slate-700
      flex
      flex-col
    ">

      {/* HEADER */}
      <div className="
        p-4
        border-b
        border-slate-700
      ">

        <h2 className="
          text-xl
          font-bold
          text-white
        ">

          AI Assistant

        </h2>

      </div>

      {/* MESSAGES */}
      <div className="
        flex-1
        overflow-y-auto
        p-4
        space-y-4
      ">

        {messages.map(
          (msg, index) => (

            <div
              key={`${msg.sender}-${index}`}
              className={`
                max-w-[90%]
                p-3
                rounded-2xl
                text-sm
                break-words 
                overflow-hidden
                whitespace-pre-wrap

                ${
                  msg.sender ===
                  "user"

                  ? `bg-blue-600 ml-auto text-white shadow-lg shadow-blue-500/20`

                  : `bg-gradient-to-br
                     from-slate-800
                     to-slate-900
                     text-white
                     border
                     border-slate-700`
                }
              `}
            >

              <div className="whitespace-pre-line leading-7 text-[14px] font-medium">
  {msg.text}
</div>

            </div>
          )
        )}
<div ref={chatEndRef}></div>
        {/* LOADING */}
        {loading && (

          <div className="
            bg-slate-800
            border
            border-slate-700
            p-3
            rounded-2xl
            text-white
            w-fit
            animate-pulse
          ">

            Shortify AI is thinking...

          </div>

        )}

      </div>

      {/* INPUT */}
      <form

        onSubmit={sendMessage}

        className="
          p-4
          border-t
          border-slate-700
          flex
          gap-2
        "
      >

        <input
          type="text"

          value={input}

          onChange={(e) =>
            setInput(
              e.target.value
            )
          }

          placeholder="
            Ask AI about shortnames...
          "

          className="
            flex-1
            bg-slate-800
            p-3
            rounded-xl
            outline-none
            text-white
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            px-4
            rounded-xl
            text-white
          "
        >

          Send

        </button>

      </form>

    </div>
  );
};

export default Chatbot;