import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

function Meme(props: RouteComponentProps) {
  const [loaded, setLoaded] = useState(false);
  const [meme, setMeme] = useState(null);

  const getMeme = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };

  useEffect(() => {
    if (!loaded) {
      const id = props.match.params["id"];
      const url = `/api/v1/show/${id}`;
      getMeme(url)
        .then((response) => setMeme(response))
        .catch(() => props.history.push("/"));
      setLoaded(true);
    }
  });

  return <div>hi</div>;
}

export default Meme;
