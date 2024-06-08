import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "", // Corrected typeof to type
  });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTIyYzAwNjJjNTU0Nzg2NDg2ZDY0MmEzYmQxZTU4MCIsInN1YiI6IjY2NDQ0YmM0YTE3ZjJiYzVkNjJkNmI0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0YnOwANM_sqrgFjUAReTtA3uzZoL_0tyDF3qA_YNNs",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // Check if there are any videos in the response
        if (response.results && response.results.length > 0) {
          const videoData = response.results[0]; // Take the first video
          setApiData({
            name: videoData.name,
            key: videoData.key,
            published_at: videoData.published_at,
            type: videoData.type, // Corrected typeof to type
          });
        } else {
          throw new Error("No videos found for this movie");
        }
      })
      .catch((err) => console.error(err));
  }, [id, options]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      {apiData.key && ( // Render iframe only if apiData.key is available
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}

      <div className="player-info">
        {apiData.published_at && <p>{apiData.published_at.slice(0, 10)}</p>}
        <p>{apiData.name}</p>
        <p>{apiData.type}</p> {/* corrected typeof to type */}
      </div>
    </div>
  );
};

export default Player;
