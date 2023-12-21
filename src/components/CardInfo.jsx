const CardInfo = () => {
  return (
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
            Software Engineer, be good at Java and C#, also love developing
            games and visual computing
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
  );
};

export default CardInfo;
