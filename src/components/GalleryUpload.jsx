import { useEffect, useState, useCallback } from "react";
import { FaFolderClosed, FaUpload, FaCamera, FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { GalleryLoaderSliceAction } from "../store/GalleryLoaderSlice";
import ToastMessage from "./ToastMessage";
import { upload_image_api } from "../store/ApiKey";
function GalleryUpload() {
  const [show, setShow] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [progress, setProgress] = useState({
    total: null,
    uploaded: null,
  });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  // $totalFiles = 6;     // Total number of files
  // $uploadedFiles = 4;  // Number of files that have been uploaded

  // // Calculate the percentage
  // $uploadPercentage = ($uploadedFiles / $totalFiles) * 100;

  // // Round to 2 decimal places
  // $uploadPercentage = round($uploadPercentage, 2);

  // echo "Upload Percentage: " . $uploadPercentage . "%";
  const upload = useCallback((e) => {
    const ext = ["png", "jpg", "jpeg", "gif", "webp", "mp4"];
    const allFiles = e.target.files;
    let fileLen = allFiles.length;
    multpleUploads();
    function multpleUploads() {
      fileLen--;
      const file = e.target.files[fileLen];
      const fileE = file.type.split("/");
      if (ext.includes(fileE[1])) {
        const formData = new FormData();
        formData.append("image", file);
        dispatch(GalleryLoaderSliceAction.markFetchStarted());
        fetch(upload_image_api, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProgress({
              total: allFiles.length,
              uploaded: allFiles.length - fileLen,
            });
            if (fileLen == 0) {
              setLoginMessage(data.message);
              document.querySelector(".showGalleryUpload").click();
              dispatch(GalleryLoaderSliceAction.markFetchDone());
              dispatch(GalleryLoaderSliceAction.markFetchFinished());
              setTimeout(() => {
                setProgress({
                  total: null,
                  uploaded: null,
                });
              }, 3000);
            } else {
              multpleUploads();
            }
          })
          .catch((error) => {
            setLoginMessage("Error uploading image");
          });
      } else {
        setLoginMessage("Unsupported file type");
      }
    }

    // });
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
              multiple
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
          className={`btn showGalleryUpload rounded-pill text-white mt-3 ${
            progress.total !== null && "p-2"
          }`}
          onClick={(e) => {
            setShow(!show);
          }}
        >
          {progress.total !== null ? (
            <div className="position-relative">
              <div
                className="spinner-border"
                style={{ width: "2.5rem", height: "2.5rem" }}
                role="status"
              ></div>
              <span
                className="fw-bold"
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                }}
              >
                {Math.trunc((progress.uploaded / progress.total) * 100)}%
              </span>
            </div>
          ) : (
            <FaPlus style={{ transform: `rotate(${show ? "45" : 0}deg)` }} />
          )}
        </button>
      </div>
    </>
  );
}

export default GalleryUpload;
