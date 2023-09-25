import { ImgGalleryItem, ImgItem } from './ImageGalleryItem.style';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  onClickImg,
  largeImageURL,
}) => {
  return (
    <ImgGalleryItem key={id} id={id}>
      <ImgItem src={webformatURL} alt={tags} onClick={onClickImg} />
    </ImgGalleryItem>
  );
};
