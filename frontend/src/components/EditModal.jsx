import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const EditModal = ({
  editingUrl,
  setEditingUrl,
  fetchUrls,
}) => {

  const [form, setForm] = useState({
    fullUrl: editingUrl.fullUrl,
    shortId: editingUrl.shortId,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const updateUrl = async () => {

    try {

      await API.put(
        `/url/${editingUrl._id}`,
        form
      );

      fetchUrls();

      setEditingUrl(null);
      toast.success("Updated Successful");

    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 w-[450px] p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Edit URL
        </h2>

        <input
          type="text"
          name="fullUrl"
          value={form.fullUrl}
          onChange={handleChange}
          className="w-full bg-slate-800 p-3 rounded-xl mb-4 outline-none"
        />

        <input
          type="text"
          name="shortId"
          value={form.shortId}
          onChange={handleChange}
          className="w-full bg-slate-800 p-3 rounded-xl mb-4 outline-none"
        />

        <div className="flex gap-4">

          <button
            onClick={updateUrl}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl"
          >
            Update
          </button>

          <button
            onClick={() => setEditingUrl(null)}
            className="flex-1 bg-slate-700 hover:bg-slate-600 transition p-3 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditModal;