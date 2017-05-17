import pace from 'pace-progress';
import 'bootstrap';
import notify from './notify';

pace.start()

$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();