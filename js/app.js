import dom from './modules/domHelper.js';
import task from './modules/taskHelper.js';
import sortable from './modules/sortable.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/serviceworker.js');
//};

task.load()
dom.on$('#taskForm', 'submit', task.add.bind(task));
dom.on$('#todolist', 'click', task.update.bind(task));
sortable('#todolist')
