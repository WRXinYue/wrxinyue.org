const CardWebInfo = () => {
  return (
    <div className="card-widget card-webinfo">
      <div className="card-content">
        <div className="item-headline">
          <i className="fa fa-line-chart" aria-hidden="true"></i>
          <span>站点信息</span>
        </div>
        <div className="webinfo">
          <div className="webinfo-item">
            <div className="webinfo-site-uv-name">本站访客数 :</div>
            <div
              className="webinfo-site-uv-count"
              id="busuanzi_value_site_uv"
            ></div>
          </div>
          <div className="webinfo-item">
            <div className="webinfo-site-name">本站总访问量 :</div>
            <div
              className="webinfo-site-pv-count"
              id="busuanzi_value_site_pv"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWebInfo;
