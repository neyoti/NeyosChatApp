import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileImageDisplay = ({ source, username }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`https://localhost:7085/UserAuth/getImageUrl/${username}`);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [username]);

  return (
    <div>
      {imageUrl
        ?
        source === "chatlobby"
          ?
          <div>
            <img
              src={imageUrl}
              alt="Fetched from S3"
              style={{
                width: "55px", height: "55px", borderRadius: "50%", borderStyle: "solid", borderWidth: "thin",
                borderColor: "black", marginLeft: "7px", marginRight: "7px"
              }}
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <div
                style={{
                  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex",
                  justifyContent: "center", alignItems: "center",
                  zIndex: 9999
                }}
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={imageUrl}
                  alt="Profile Preview"
                  style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: "10px" }}
                />
              </div>
            )}
          </div>

          :

          <div>
            <img
              src={imageUrl}
              alt="Fetched from S3"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <div
                style={{
                  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex",
                  justifyContent: "center", alignItems: "center",
                  zIndex: 9999
                }}
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={imageUrl}
                  alt="Profile Preview"
                  style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: "10px" }}
                />
              </div>
            )}
          </div>
        :
        source === "chatlobby"
          ?
          <img
            src="/userImage2.jpg"
            alt="Fetched from local"
            style={{
              width: "55px", height: "55px", borderRadius: "50%", borderStyle: "solid", borderWidth: "thin",
              borderColor: "black", marginLeft: "7px", marginRight: "7px"
            }}
            onClick={() => setIsOpen(true)}
          />
          :
          <img
            src="/userImage2.jpg"
            alt="Fetched from local"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            onClick={() => setIsOpen(true)}
          />
      }
    </div>
  );
};

export default ProfileImageDisplay;
