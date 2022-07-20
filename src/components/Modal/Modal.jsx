import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({ imageSelected, toggleModal }) => {

  const { largeImageURL, tags } = imageSelected;

  function bodyRemoveNoScroll() {
   const scrollY = document.body.style.top;
   document.body.style.position = '';
   document.body.style.top = '';
   window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function bodyAddNoScroll() {
   document.body.style.top = `-${window.scrollY}px`;
   document.body.style.position = 'fixed';
  }
  
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    bodyAddNoScroll()
   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      bodyRemoveNoScroll()
    };
    }, [toggleModal]
  );
  
    return (
      <div className={styles.overlay} onClick={handleBackdropClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} className={styles.img}/>
        </div>
      </div>
    );
}

Modal.propTypes = {
    imageSelected: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
  };