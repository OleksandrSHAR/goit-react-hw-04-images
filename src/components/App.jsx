import { LoadMore } from './LoadMore/LoadMore';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImg } from './Api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
export const App = () => {
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [textSearch, setTextSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAltl] = useState('');

  const SubmitValue = e => {
    setTextSearch(
      `${Date.now()}/${e.target.elements.search.value.toLowerCase()}`
    );
    setImage([]);
    setPage(1);
    console.log(e.target.elements.search.value);
  };

  useEffect(() => {
    async function getImage() {
      try {
        setLoading(true);

        const img = await getImg(textSearch, page);

        setImage(prev => [...prev, ...img.hits]);
        setMaxPages(Math.round(img.totalHits / 12));
      } catch (error) {
        toast.error('Sorry ERROR');
      } finally {
        setLoading(false);
      }
    }
    if (textSearch !== '') {
      getImage();
    }
  }, [textSearch, page]);

  const onClickImg = e => {
    const imgMod = image.filter(img => img.webformatURL === e.target.src);
    setModal(true);
    setModalUrl(imgMod[0].largeImageURL);
    setModalAltl(imgMod[0].tags);
  };
  const onCloseModal = e => {
    if (e.target === e.currentTarget || e.code === `Escape`) {
      setModal(false);
    }
  };
  const onLoadeMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <Searchbar SubmitValue={SubmitValue} />
      {image.length > 0 && (
        <ImageGallery imagePac={image} onClickImg={onClickImg} />
      )}
      {modal && (
        <Modal
          modalUrl={modalUrl}
          modalAlt={modalAlt}
          onCloseModal={onCloseModal}
        />
      )}
      {image.length > 0 && page !== maxPages && (
        <LoadMore onLoadeMore={onLoadeMore} />
      )}
      <Loader loading={loading} />
      <GlobalStyle />
    </div>
  );
};
