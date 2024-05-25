<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';
	import { tasksStore } from '../store/tasksStore';
	import type { Task } from '../models/Task';
    
    const dispatch = createEventDispatcher();
    const dispatchEdit = (task:Task) => {
        dispatch("dispatchEdit",task);
    }
</script>

<div class="flex flex-col gap-3 mt-3 transition-all duration-200">
	<h2 class="text-2xl font-title font-extrabold text-center">Tasks</h2>

	{#each $tasksStore as task (task.id)}
		<div class="p-2 neo-wrap flex justify-between items-center gap-1">
			<p>{task.title}</p>
			<span class="flex gap-2">
                <button on:click={() => dispatchEdit(task)} class="flex justify-center items-center">
					<Icon icon="mingcute:edit-line" font-size="20" inline={true} class="text-blue-400" />
				</button>
				<button on:click={() => tasksStore.removeTask(task.id)} class="flex justify-center items-center">
					<Icon icon="ion:trash-bin" font-size="20" inline={true} class="text-red-500" />
				</button>
			</span>
		</div>
	{/each}

    <button on:click={() => tasksStore.reset()} class="text-red-500 underline">Delete All</button>
</div>
