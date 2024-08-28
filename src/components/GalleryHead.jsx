import { useEffect } from "react";

function GalleryHead() {
  return (
    <>
      <div id="head" className="shadow">
        <div className="shadow-1">
          <div className="shadow-2">
            <img
              src="https://staging.solaralberta.ca/wp-content/uploads/2020/03/product_icon_individual-450x450.png"
              alt=""
            />
          </div>
        </div>
        <span className="message text-white">
          Hii there,
          <br />
          Good evening!
        </span>
      </div>
    </>
  );
}

export default GalleryHead;
