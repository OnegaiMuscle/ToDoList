import dom from './modules/domHelper.js';
import task from './modules/taskHelper.js';
import DragDrop from './modules/dragDrop.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/serviceworker.js');
//};

task.load()
dom.on$('#taskForm', 'submit', task.add.bind(task));
dom.on$('#todolist', 'click', task.update.bind(task));
DragDrop('#todolist')

// dragdrop not working with touch devices
//pointer events
