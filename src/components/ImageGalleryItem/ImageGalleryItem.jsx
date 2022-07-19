import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webSrc, alt, toggleModal }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        onClick={toggleModal}
        className={styles.galleryItemImage}
        src={webSrc}
        alt={alt}
        width="200"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  webSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
