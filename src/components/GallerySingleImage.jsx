import { get_single_image_api } from "../store/ApiKey";

function GallerySingleImage({ item, device, clickPhoto, indexId }) {
  return (
    <div className="col-lg-3 col-4 singleImageContainer">
      <div
        className="imgBg shadow"
        onClick={() => clickPhoto(indexId)}
        style={{
          backgroundImage: `url('${get_single_image_api}/${item.name}/${device}')`,
        }}
      ></div>
    </div>
  );
}

export default GallerySingleImage;
