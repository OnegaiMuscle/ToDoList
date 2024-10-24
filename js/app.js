import taskHelper from './modules/taskHelper.js';
import taskCounter from './modules/taskCounter.js';
import taskSorter from './modules/taskSorter.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

taskHelper('#todolist')
taskCounter('#todolist')
taskSorter('#todolist')
