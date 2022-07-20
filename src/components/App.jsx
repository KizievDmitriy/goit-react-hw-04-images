import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './App.module.css';

import { fetchImg } from 'servise/Api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';


export const App = () => {
  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [fullGallery, setFullGallery] = useState([]);
  const [perPage] = useState(12);
  
   const handleFormSubmit = imgForSubmit => {
    if (imgForSubmit === imgName) {
      return;
    }
    setImgName(imgForSubmit);
    setPage(1);
     setFullGallery([]);
  };

  useEffect(() => {
    if (!imgName) {
      return;
    }

    setStatus('pending');
    fetchImg(imgName, page).then(imgArray => {
      const newImgArray = imgArray.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );
      if (imgArray.hits.length === 0) {
        toast.error('No images found for your request');
        return setStatus('idle');
      } else {
        page === 1 && toast.success(`Found ${imgArray.totalHits} images`);
      }

      setFullGallery(prevSet => [...prevSet, ...newImgArray]);
      setStatus('resolved');

      if (page * perPage === imgArray.totalHits) {
        toast.warn('End of list reached');
        setStatus('idle');
      }
    });
  }, [imgName, page, perPage]);

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setImageSelected({ largeImageURL, tags });
  };

  const onClickLoadMore = () => {
    setPage(prevSetPage => prevSetPage + 1);
  };

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          fullGallery={fullGallery}
          toggleModal={toggleModal}
        />
        {showModal && (
          <Modal imageSelected={imageSelected} toggleModal={toggleModal} />
        )}
        <div className={styles.container}>
          {status === 'resolved' && <Button onClick={onClickLoadMore} />}
          {status === 'pending' && <Loader />}
        </div>
      </div>
    );
}
