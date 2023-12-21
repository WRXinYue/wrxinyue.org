import React, { useEffect, useState } from "react";

const JinRiSHiCi = () => {
  const [poetry, setPoetry] = useState("");

  useEffect(() => {
    fetch("https://v2.jinrishici.com/token")
      .then((response) => response.json())
      .then((data) => {
        const token = data.data;
        return fetch("https://v2.jinrishici.com/sentence", {
          headers: { "X-User-Token": token },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPoetry(data.data.content);
      })
      .catch((error) => console.error("Error fetching poetry:", error));
  }, []);

  return (
    <div className="card-widget card-announcement">
      <div className="card-content">
        <div className="item-headline">
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <span>今日诗词</span>
        </div>
        <div>{poetry}</div>
      </div>
    </div>
  );
};

export default JinRiSHiCi;
