import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContact from "./SearchContact";

export default function Contacts({ contacts, latestMessage, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  // console.log({ contacts, latestMessage, changeChat });
  const navigate = useNavigate();
  const changeAvatar = () => {
    navigate("/setavatar");
  };

  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    })();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className="h-[40rem] border w-[20rem]">
      
      <SearchContact contacts={contacts} changeChat={changeChat} />

      {currentUserImage && currentUserImage && (
        <>
          <div className="h-[31.5rem] w-[20rem] overflow-y-scroll">
            {latestMessage.map((message, index) => {
              const contact = contacts.find(
                (contact) => contact._id === message.otherUserDetails._id
              );

              return (
                <div
                  key={message._id}
                  className={`flex items-center gap-4 border py-2 px-4 ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <img
                    className="w-20 rounded-full border"
                    src={contact?.avatarImage}
                    alt=""
                  />
                  <h3>{contact?.username}</h3>
                  <div className="flex flex-col">
                    <p>{message.message.text}</p>
                    <p>
                      time{new Date(message.updatedAt).getHours()}:
                      {new Date(message.updatedAt).getMinutes()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center px-4 py-2 gap-4 bg-blue-300 z-20">
            <img
              onClick={changeAvatar}
              className="w-16 cursor-pointer rounded-full border border-black"
              src={currentUserImage}
              alt="avatar"
            />
            <h2>{currentUserName}</h2>
          </div>
        </>
      )}
    </div>
  );
}
