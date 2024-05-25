<script lang="ts">
	import Icon from '@iconify/svelte';
	import TasksContainer from './TasksContainer.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { tasksStore } from '../store/tasksStore';
	import type { Task } from '../models/Task';

	let title = '';
	let isTitleError = false;
	let isEdit = false;
	let editId = '';

	const openEdit = (e: CustomEvent) => {
		isEdit = true;
		editId = e.detail.id;
		title = e.detail.title;
	};

	const submitHandler = () => {
		if (!title) {
			isTitleError = true;
			return;
		}
		if (!isEdit) {
			tasksStore.addTask({
				id: uuidv4(),
				title: title
			});
		} else {
			tasksStore.updateTask({
				id: editId,
				title: title
			});
			isEdit = false;
			editId = '';
		}
		title = '';
	};
</script>

<svelte:head>
	<title>Svelte Tasks</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex justify-center items-start p-4">
	<main class="w-[95vw] sm:w-[400px]">
		<h1 class="text-3xl font-title font-extrabold text-center">Svelte Tasks</h1>
		<form
			on:submit|preventDefault={submitHandler}
			class="flex justify-between items-center gap-2 mt-3"
		>
			<input
				on:input={() => (isTitleError = false)}
				bind:value={title}
				placeholder="Enter your task..."
				class="h-9 px-3 text-sm outline-none grow neo-wrap {isTitleError
					? 'placeholder:text-red-500'
					: 'placeholder:text-mute'}"
			/>
			{#if !isEdit}
				<button
					type="submit"
					class="neo-wrap neo-wrap-btn bg-primary w-[80px] h-9 flex justify-center gap-1 items-center px-2"
					>Add <Icon icon="oui:plus" /></button
				>
			{:else}
				<button
					type="submit"
					class="neo-wrap neo-wrap-btn bg-primary w-[80px] h-9 flex justify-center gap-1 items-center px-2"
					>Save <Icon icon="dashicons:saved" /></button
				>
			{/if}
		</form>
		<TasksContainer on:dispatchEdit={openEdit} />
	</main>
</section>

<style>
</style>
