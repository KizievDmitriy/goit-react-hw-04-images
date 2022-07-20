import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';
import { MdSearch } from 'react-icons/md';


export const Searchbar = ({ onSubmit }) => {
  
  const [imgName, setImgName] = useState('');

  const handleNameChange = event => {
    setImgName(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    
    event.preventDefault();
   
    if (imgName.trim() === '') {
      return toast.warn('Enter something, please');
    }
  
    onSubmit(imgName);
    setImgName(event.currentTarget.value = '');
  };

    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ToastContainer />
          <button type="submit" className={styles.button}>
            <MdSearch className={styles.buttonIcon} />  
          </button>
          <input
            onChange={handleNameChange}
            className={styles.input}
            value={imgName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder=" Search images and photos"
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };