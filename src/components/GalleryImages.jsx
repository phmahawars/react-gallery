import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GallerySingleImage from "./GallerySingleImage";
import { useSelector, useDispatch } from "react-redux";
import { galleryGetSliceAction } from "../store/GalleryGetSlice";
import LightBox from "../page/lightBox/LightBox";
import { GalleryLoaderSliceAction } from "../store/GalleryLoaderSlice";
import { get_images_api } from "../store/ApiKey";

function GalleryImages() {
  const images = useSelector((store) => store.gallery);
  const auth = useSelector((store) => store.auth);
  const [openLightbox, setOpenLightbox] = useState(null);
  const [rendring, setRendring] = useState(false);
  const { fetchDone, currentlyFetching } = useSelector(
    (store) => store.loaderGallery
  );
  const dispatch = useDispatch();
  let device;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    device = 200;
  } else {
    device = 300;
  }
  let time = 2;
  const renderAfterSec = useCallback(() => {
    setTimeout(() => {
      fetch(`${get_images_api}?page=${time}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length != 0) {
            dispatch(galleryGetSliceAction.appendImages(data.data));
            time = time + 1;
            renderAfterSec();
            setRendring(true);
          } else {
            setRendring(false);
          }
        });
    }, 2000);
  });
  useEffect(() => {
    dispatch(GalleryLoaderSliceAction.markFetchStarted());
    fetch(`${get_images_api}?page=1`, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(galleryGetSliceAction.getImages(data.data));
        dispatch(GalleryLoaderSliceAction.markFetchFinished());
        if (data.data.length !== 0 && data.last_page > 1) {
          renderAfterSec();
        } else {
          setRendring(false);
        }
      });
  }, [fetchDone]);

  const clickPhoto = (id) => {
    setOpenLightbox(id);
  };
  return (
    <>
      {openLightbox != null && (
        <LightBox
          indexId={openLightbox}
          images={images}
          setOpenLightbox={setOpenLightbox}
        />
      )}
      <div className="galleryImages row m-0 mt-4 gx-2">
        {currentlyFetching && (
          <div className="col-4 placeholder-glow">
            <div className="imgBg shadow-sm d-flex flex-row justify-content-center align-items-center">
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
            </div>
          </div>
        )}

        {images.length !== 0 ? (
          images.map((item, key) => (
            <GallerySingleImage
              key={item.id}
              item={item}
              device={device}
              clickPhoto={clickPhoto}
              indexId={key}
            />
          ))
        ) : (
          <>No Uploads</>
        )}
        {rendring && (
          <div className="col-lg-3 col-4 singleImageContainer placeholder-glow">
            <div className="imgBg shadow-sm d-flex flex-row justify-content-center align-items-center">
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
              <div
                className="spinner-grow border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GalleryImages;
