import sortHelper from './modules/sortHelper.js';
import taskHelper from './modules/taskHelper.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

taskHelper('#todolist')
sortHelper('#todolist')
