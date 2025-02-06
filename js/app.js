import dom from "./modules/domWrapper.js";
import { loadTasks, addTask, handleClick } from './modules/taskHelper.js';
import taskCounter from './modules/taskCounter.js';
import { handlePointerDown, handlePointerMove, handlePointerUp } from './modules/taskSorter.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

dom.on(document, 'DOMContentLoaded', loadTasks);
dom.on$('#taskForm', 'submit', addTask);
dom.on$('#todolist', 'click', handleClick);
taskCounter('#todolist')
dom.on$('#todolist', 'pointerdown', handlePointerDown);
dom.on(document, 'pointermove', handlePointerMove);
dom.on(document, 'pointerup', handlePointerUp);
dom.on(document, 'pointercancel', handlePointerUp);
