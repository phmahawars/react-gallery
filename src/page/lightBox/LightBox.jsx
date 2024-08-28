import { useState } from "react";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useNavigate, useParams } from "react-router-dom";
import Download from "yet-another-react-lightbox/plugins/download";
function LightBox({ indexId, images, setOpenLightbox }) {
  // let { indexId } = useParams();
  const [index, setIndex] = useState(-1);
  const navigate = useNavigate();
  console.log(images);
  return (
    <>
      <RowsPhotoAlbum
        photos={images}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        toolbar={{ buttons: ["close"] }}
        // slides={images}
        slides={images.map((slide) => ({
          ...slide,
          download: `${slide.src}?download`,
        }))}
        open={true}
        index={indexId}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download]}
        on={{
          exiting: () => {
            setOpenLightbox(null);
          },
        }}
      />
    </>
  );
}

export default LightBox;
