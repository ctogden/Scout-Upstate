import React from "react";

export default () => (
  <div className="root">
    <p className="love">
      Made with
      {" "}
      <img src="/static/images/heart-icon.png" alt="Heart icon" height="14" width="14" />
      {" "}
      in Walton, NY
    </p>
    <style jsx>{`
            .root {
                padding-top: 40px;
                right: 14%;
            }
            p {
                text-align: right;
            }
        `}</style>
  </div>
);
