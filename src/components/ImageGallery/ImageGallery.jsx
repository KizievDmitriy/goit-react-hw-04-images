import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    fullGallery: PropTypes.arrayOf(
      PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
      })
    ).isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  render() {
    const { toggleModal, fullGallery } = this.props;

    return (
      <ul className={styles.gallery}>
        {fullGallery.map(img => {
          const { id, webformatURL, tags, largeImageURL } = img;
          return (
            <ImageGalleryItem
              toggleModal={() => toggleModal(largeImageURL, tags)}
              key={id}
              webSrc={webformatURL}
              alt={tags}
            />
          );
        })}
      </ul>
    );
  }
}
