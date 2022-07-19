import { Component } from 'react';
import { toast } from 'react-toastify';
import styles from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    imgName: '',
    page: 1,
    showModal: false,
    imageSelected: null,
    status: 'idle',
    fullGallery: [],
  };

  handleFormSubmit = imgName => {
    if (imgName === this.state.imgName) {
      return;
    }

    this.setState({
      imgName,
      page: 1,
    });
  };

  fetchImg = async (imgName, page) => {
    const response = await fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=27112752-ba9c06a82163f4d21667ea4bf&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error(`Not found ${imgName}`));
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName, page, fullGallery } = this.state;

    if (prevState.imgName !== imgName || prevState.page !== page) {
      this.galleryClean(prevState);
      this.setState({ status: 'pending' });
      this.fetchImg(imgName, page).then(imgArray => {
        const newImgArray = imgArray.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );

        if (imgArray.hits.length === 0) {
          toast.error('No images found for your request');
          return this.setState({ status: 'idle' });
        } else {
          page === 1 && toast.success(`Found ${imgArray.totalHits} images`);
        }

        this.setState(({ fullGallery }) => ({
          fullGallery: [...fullGallery, ...newImgArray],
          status: 'resolved',
        }));

        if (fullGallery.length + 12 === imgArray.totalHits) {
          toast.warn('End of list reached');
          this.setState({ status: 'idle' });
        }
      });
    }
    this.scrollBottom();
  }

  galleryClean = prevState => {
    const { imgName } = this.state;
    const prevImgName = prevState.imgName;

    if (prevImgName !== imgName) {
      this.setState(() => ({
        fullGallery: [],
      }));
    }
  };

  scrollBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    this.setState({ imageSelected: { largeImageURL, tags } });
  };

  onClickLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  render() {
    const { showModal, imageSelected, status, fullGallery } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          fullGallery={fullGallery}
          toggleModal={this.toggleModal}
        />
        {showModal && (
          <Modal imageSelected={imageSelected} toggleModal={this.toggleModal} />
        )}
        <div className={styles.container}>
          {status === 'resolved' && <Button onClick={this.onClickLoadMore} />}
          {status === 'pending' && <Loader />}
        </div>
      </div>
    );
  }
}
