import dom from './modules/domWrapper.js';
import task from './modules/taskHelper.js';
import sortHelper from './modules/sortHelper.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

task.load()
dom.on$('#taskForm', 'submit', task.add.bind(task));
dom.on$('#todolist', 'click', task.update.bind(task));
sortHelper('#todolist')
