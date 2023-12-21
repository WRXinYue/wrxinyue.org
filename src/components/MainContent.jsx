import { useEffect } from "react";

import Article from "./Article";
import CardAnnouncement from "./CardAnnouncement/CardAnnouncement";
import CardWebInfo from "./CardWebInfo";

const MainContent = () => {
  useEffect(() => {
    console.clear();
    console.log(
      "%c 有朋自远方来, 不亦说乎.",
      "background:#24272A; color:#ffffff",
      "",
    );
    console.log(
      "%c Github %c",
      "background:#24272A; color:#ffffff",
      "",
      "https://github.com/WRXinYue",
    );
    console.log(
      "%c 版本号: %c",
      "background:#24272A; color:#ffffff",
      "",
      "1.0.0",
    );
  }, []);
  return (
    <main id="content-outer">
      <div className="layout_page" id="content-inner">
        <div className="aside_content" id="aside_content">
          <div className="card-widget card-info">
            <div className="card-content">
              <div className="card-info-avatar is-center">
                <img
                  className="avatar-img"
                  src="http://q1.qlogo.cn/g?b=qq&nk=3322543587&s=640"
                  alt="avatar"
                />
                {/* <!-- <img className="avatar-img" src="https://avatars.githubusercontent.com/wrxinyue" alt="avatar"> --> */}
                <div className="author-info__name">吾日心悦如石水</div>
                <div className="author-info__description">
                  Software Engineer, be good at Java and C#, also love
                  developing games and visual computing
                </div>
              </div>
              <div className="card-info-social-icons is-center">
                <a
                  className="social-icon"
                  href="https://github.com/WRXinYue"
                  target="_blank"
                >
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          <CardAnnouncement />
          <CardWebInfo />
        </div>

        <Article />
      </div>
    </main>
  );
};

export default MainContent;
