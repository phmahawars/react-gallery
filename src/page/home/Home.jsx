import { FaMagnifyingGlass, FaSliders } from "react-icons/fa6";
import GalleryHead from "../../components/GalleryHead";
import GalleryMenu from "../../components/GalleryMenu";
import GalleryImages from "../../components/GalleryImages";
import GalleryUpload from "../../components/GalleryUpload";

function Home() {
  return (
    <>
      <GalleryHead />

      <div id="body">
        <GalleryMenu />
        <div className="gallerySearch">
          <div className="search">
            <div className="input-group shadow-sm rounded">
              <input
                type="search"
                className="form-control shadow-none border-0"
                placeholder="Search"
              />
              <button className="input-group-text border-0">
                <FaMagnifyingGlass />
              </button>
            </div>
            <button className="ms-3 btn searchFilter shadow-sm rounded">
              <FaSliders />
            </button>
          </div>
        </div>
        <GalleryImages />
        <GalleryUpload />
      </div>
    </>
  );
}

export default Home;
