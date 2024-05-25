import { writable } from 'svelte/store';
import type { Task } from '../models/Task';

function createTaskStore() {
	const { subscribe, update, set } = writable<Task[]>([
		{id: '1hdg3-12',title: "Learn Svelte"}
	]);

	return {
		subscribe,
        addTask: (task:Task) => update((tasks:Task[]) => [task,...tasks]),
        removeTask: (id:string) => update((tasks:Task[]) => tasks.filter(t => t.id !== id)),
		updateTask : (task:Task) => update((tasks:Task[]) => [task,...tasks.filter(t => t.id != task.id)]),
        reset: () => set([])
	};
}

export const tasksStore = createTaskStore();
