import '../_sass/_main.scss';

import pace from 'pace-progress';
import 'bootstrap';
import 'bootstrap-toggle';
import AOS from 'aos';

import editor from './editor';
import favourites from './favourites.js';
import styleNavbar from './style-navbar';
import styleJumbotrons from './style-jumbotrons';
import displayScrollBtns from './display-scroll-btns';
import apiStats from './api-stats';
import imageError from './image-error';
import imageCrop from './image-crop';
import anchorScroll from './anchor-scroll';
import progress from './progress';
import s3 from './s3';
import ps from './project-shuffle';
import featuredProjects from './featured-projects';
import search from './search';
import btnScroll from './btn-scroll';
import tabControl from './tab-control';
import hamburger from './hamburger';
import sidebar from './sidebar.js';
import csrfToken from './csrf-token';
import msg from './flash-messages';

// TODO export to own repo to be bundled within projects - add bootstrap as dependency
import Interface from './ui/components/viewer/interface';

// Init pace-progress
pace.start()

// Init Bootstrap popovers and tooltips
$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();

// Init aos
AOS.init({ once: 'true' });