import '../_sass/_main.scss';

import pace from 'pace-progress';
import 'bootstrap';
import 'bootstrap-toggle';
import AOS from 'aos';

import './editor';
import './favourites.js';
import './style-navbar';
import './style-jumbotrons';
import './display-scroll-btns';
import './api-stats';
import './image-error';
import './image-crop';
import './anchor-scroll';
import './progress';
import './s3';
import './project-shuffle';
import './featured-projects';
import './search';
import './btn-scroll';
import './tab-control';
import './hamburger';
import './sidebar.js';
import './csrf-token';
import './flash-messages';

// TODO export to own repo to be bundled within projects - add bootstrap as dependency
import './ui/components/viewer/interface';

// Init pace-progress
pace.start();

// Init Bootstrap popovers and tooltips
$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();

// Init aos
AOS.init({ once: 'true' });