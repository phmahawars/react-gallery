function GallerySingleImage({ item, device, clickPhoto, indexId }) {
  return (
    <div className="col-lg-3 col-4 singleImageContainer">
      <div
        className="imgBg shadow"
        onClick={() => clickPhoto(indexId)}
        style={{
          backgroundImage: `url('https://cdn.flightbulk.com/image/${item.name}/${device}')`,
        }}
      ></div>
    </div>
  );
}

export default GallerySingleImage;
