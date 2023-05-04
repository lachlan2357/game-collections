<script setup lang="ts">
	const emit = defineEmits<{ (e: "dropped", payload: DragEvent): void }>();
	const props = defineProps({
		index: {
			type: Number,
			required: true
		},
		dragging: {
			type: Boolean,
			required: true
		}
	});

	const allowDrag = (e: DragEvent) => e.preventDefault();
	const dragDrop = (e: DragEvent) => emit("dropped", e);
</script>

<template>
	<div
		v-if="props.dragging"
		class="drop-target"
		:data-index="props.index"
		@drop="dragDrop"
		@dragover="allowDrag"></div>
</template>

<style scoped lang="scss">
	.drop-target {
		background-color: var(--accent);
		border-radius: var(--br);
		box-shadow: var(--bs);
		height: 5rem;
		width: 1rem;
	}
</style>
