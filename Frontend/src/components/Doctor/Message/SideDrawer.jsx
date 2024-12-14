import React, { useState } from "react";

function SideDrawer({ setSelectedPatientChat }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com//doctor/searchat?search=${encodeURIComponent(
          search
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatRedirected = async (patientId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com//chats/accesschat/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const chatData = await response.json();
      setSelectedPatientChat(chatData);
      toggleSidebar();
    } catch (error) {
      console.error("Error fetching patient chat:", error);
    }
  };

  return (
    <>
      <div className="relative flex">
        <input
          onClick={toggleSidebar}
          className="border-2 p-2 pl-10 w-full rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button
          className="bg-blue-500 p-2 rounded-lg text-white ml-2"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {isSidebarOpen && (
        <div className="absolute left-0 top-[60px] ml-10 mt-10 h-full w-64 bg-white shadow-xl z-50">
          <div className="p-4">
            <button onClick={toggleSidebar}>Close</button>
            <ul className="mt-4">
              {loading && <li>Loading results...</li>}
              {!loading && searchResult.length === 0 && (
                <li>No results found.</li>
              )}
              {!loading &&
                searchResult.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => handleChatRedirected(item._id)}
                  >
                    <div>
                      <strong>{item.fullName}</strong>
                    </div>
                    <div>{item.email}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SideDrawer;
