import { useEffect, useState } from "react";

function GalleryMenu() {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    window.onscroll = function (e) {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition >= (window.innerWidth <= 500 ? 105 : 208)) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
  }, []);
  return (
    <div className="galleryMenu">
      <ul className={`shadow-sm ${fixed && "setFixed"}`}>
        <li className="active">Photos</li>
        <li className="">Videos</li>
        <li>Albums</li>
        <li>Favourites</li>
      </ul>
    </div>
  );
}

export default GalleryMenu;
