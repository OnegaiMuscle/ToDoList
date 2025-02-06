import dom from "./modules/domWrapper.js";
import { loadTasks, addTask, handleClick } from './modules/taskHelper.js';
import { handlePointerDown, handlePointerMove, handlePointerUp } from './modules/taskSorter.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

dom.on(document, 'DOMContentLoaded', loadTasks);
dom.on$('#taskForm', 'submit', addTask);
dom.on$('#todolist', 'click', handleClick);
dom.on$('#todolist', 'pointerdown', handlePointerDown);
dom.on(document, 'pointermove', handlePointerMove);
dom.on(document, 'pointerup', handlePointerUp);
dom.on(document, 'pointercancel', handlePointerUp);
