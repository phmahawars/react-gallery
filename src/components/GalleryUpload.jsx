import { useEffect, useState, useCallback } from "react";
import { FaFolderClosed, FaUpload, FaCamera, FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { GalleryLoaderSliceAction } from "../store/GalleryLoaderSlice";
import ToastMessage from "./ToastMessage";
function GalleryUpload() {
  const [show, setShow] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const upload = useCallback((e) => {
    const ext = ["png", "jpg", "jpeg", "gif", "webp", "mp4"];
    const file = e.target.files[0];
    const fileE = file.type.split("/");

    if (ext.includes(fileE[1])) {
      const formData = new FormData();
      formData.append("image", file);

      dispatch(GalleryLoaderSliceAction.markFetchStarted());
      fetch("https://cdn.flightbulk.com/api/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoginMessage(data.message);
          document.querySelector(".showGalleryUpload").click();
          dispatch(GalleryLoaderSliceAction.markFetchDone());
          dispatch(GalleryLoaderSliceAction.markFetchFinished());
        })
        .catch((error) => {
          console.error("Error uploading image:");
        });
    } else {
      console.log("Unsupported file type");
    }
  }, []);
  return (
    <>
      {loginMessage != "" && (
        <ToastMessage message={loginMessage} state={setLoginMessage} />
      )}
      {show && (
        <div
          className="galleryUpload"
          onClick={() => {
            document.querySelector(".showGalleryUpload").click();
          }}
        ></div>
      )}
      <div className="rightfixed">
        {show && (
          <>
            <label
              className="btn shadow-sm border rounded-pill pb-2 bg-white"
              name="New Album"
            >
              <FaFolderClosed />
            </label>
            <label
              htmlFor="FaUpload"
              className="btn shadow-sm border rounded-pill pb-2 mt-3 bg-white"
              name="Upload Picture"
            >
              <FaUpload />
            </label>
            <label
              htmlFor="FaCamera"
              name="Open Camera"
              className="btn shadow-sm border rounded-pill pb-2 mt-3 bg-white"
            >
              <FaCamera />
            </label>
            <input
              type="file"
              className="d-none"
              accept="image/*, video/*"
              id="FaUpload"
              onChange={(e) => upload(e)}
            ></input>
            <input
              type="file"
              className="d-none"
              accept="image/*, video/*"
              id="FaCamera"
              onChange={(e) => upload(e)}
              capture="camera"
            ></input>
          </>
        )}

        <button
          className="btn showGalleryUpload rounded-pill text-white mt-3"
          onClick={(e) => {
            // e.currentTarget.style.transform = show
            //   ? "rotate(0deg)"
            //   : "rotate(45deg)";

            setShow(!show);
          }}
        >
          <FaPlus style={{ transform: `rotate(${show ? "45" : 0}deg)` }} />
        </button>
      </div>
    </>
  );
}

export default GalleryUpload;
