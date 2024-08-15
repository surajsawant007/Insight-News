import React from "react";

function Card(props) {
  <div className="everything-card mt-10">
    <div className="everything-card flex-wrap p-5 gap-1 mb-1">
      <div>
        <b>{props.title}</b>
        <div className="everything-card-img">
          <img src={props.imgUrl} alt="img" />
        </div>
      </div>
      <div className="description">
        <p>{props.description?.substring(0, 200)}</p>
      </div>
      <div className="info">
        <div className="source-info flex items-center gap-2">
          <span className="font-semibold">Source:</span>
          <a
            href="{props.url}"
            target="_blank"
            className="link underline break-word"
          >
            {props.source.substring(0, 70)}
          </a>
        </div>
      </div>
      <div className="origin flex flex-col">
        <p className="origin-item">
          <span className="font-semibold">Author:</span>
          {props.author}
        </p>
        <p className="origin-item">
          <span className="font-semibold">Published At:</span>(
          {props.publishedAT})
        </p>
      </div>
    </div>
  </div>;
}

export default Card;
