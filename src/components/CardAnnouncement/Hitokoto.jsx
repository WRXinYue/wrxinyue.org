import React, { useEffect, useState } from "react";

const Hitokoto = () => {
  const [hitokoto, setHitokoto] = useState("");

  useEffect(() => {
    fetch("https://v1.hitokoto.cn/?c=h")
      .then((response) => response.json())
      .then((data) => {
        setHitokoto(data.hitokoto);
      })
      .catch((error) => {
        console.error("Error fetching hitokoto:", error);
      });
  }, []);

  return (
    <div className="card-widget card-announcement">
      <div className="card-content">
        <div className="item-headline">
          <i className="fa fa-bullhorn" aria-hidden="true"></i>
          <span>一言</span>
        </div>
        <div id="hitokoto">{hitokoto}</div>
      </div>
    </div>
  );
};

export default Hitokoto;
