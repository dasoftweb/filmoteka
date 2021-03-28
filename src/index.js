import './sass/main.scss';
import './js/modal';
import './js/pagination';
import './js/search';
import headerMarkup from './partials/header.html';
import galleryMarkup from './partials/gallery.html';
import footerMarkup from './partials/footer.html';

const body = document.querySelector('body');

body.insertAdjacentHTML('beforeend', headerMarkup);
body.insertAdjacentHTML('beforeend', galleryMarkup);
body.insertAdjacentHTML('beforeend', footerMarkup);
