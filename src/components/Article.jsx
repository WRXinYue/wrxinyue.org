import { useEffect, useState } from "react";
import { marked } from "marked";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

const useGithubMarkdown = (url) => {
  const [content, setContent] = useState("");
  const cacheLifetime = 60 * 60 * 1000 * 12;

  useEffect(() => {
    const cacheData = localStorage.getItem("readmeData");
    const cacheTime = localStorage.getItem("readmeTime");
    const currentTime = new Date().getTime();

    if (cacheData && cacheTime && currentTime - cacheTime < cacheLifetime) {
      setContent(marked.parse(cacheData));
    } else {
      fetch(url, { headers: { Accept: "application/vnd.github.v3.raw" } })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          const html = marked.parse(data, { mangle: false, headerIds: false });
          setContent(html);
          localStorage.setItem("readmeData", data);
          localStorage.setItem("readmeTime", new Date().getTime().toString());
        })
        .catch((error) => console.error(error));
    }
  }, [url]);

  return content;
};

const Article = () => {
  useEffect(() => {
    fetch(
      "https://api.injahow.cn/meting/?server=tencent&type=playlist&id=4063308541",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const audioList = data.map((song) => {
          return {
            name: song.name,
            artist: song.artist,
            url: song.url,
            pic: song.pic,
            lrc: song.lrc,
          };
        });

        const player = new APlayer({
          container: document.getElementById("player"),
          audio: audioList,
        }).catch((error) => {
          console.error("Error fetching the playlist:", error);
        });
      });
  }, []);

  const githubMarkdown = useGithubMarkdown(
    "https://api.github.com/repos/WRXinYue/WRXinYue/readme",
  );

  return (
    <article id="page">
      <div className="article-container">
        <h2>介绍</h2>
        <div
          id="introduce"
          dangerouslySetInnerHTML={{ __html: githubMarkdown }}
        />
        <hr />

        <h2>音乐</h2>
        {/* <meting-js auto="https://api.injahow.cn/meting/?server=tencent&type=playlist&id=4063308541"></meting-js> */}
        <div id="player"></div>
        <hr />

        <br />
        <h2>我的</h2>
        <div className="tool">
          <a href="https://www.wrxinyue.org" target="_blank">
            技术栈
          </a>
          <br />
          <a href="https://blog.wrxinyue.org" target="_blank">
            博客
          </a>
        </div>

        <hr />
        <h2>刷题</h2>
        <div className="tool">
          <a href="https://leetcode-cn.com/problemset/all/" target="_blank">
            Leetcode
          </a>
          <br />
          <a
            href="https://www.nowcoder.com/ta/coding-interviews"
            target="_blank"
          >
            剑指 Offer
          </a>
        </div>
      </div>
    </article>
  );
};

export default Article;
