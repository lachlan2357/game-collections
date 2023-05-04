<script setup lang="ts">
	import { ref } from "vue";
	import DropTarget from "./DropTarget.vue";
	import GameCard from "./GameCard.vue";
	import { useCreateStore } from "@/stores/creator";

	const props = defineProps<{
		appIDsOverride?: number[];
		draggable?: boolean;
		actionable?: boolean;
		deletable?: boolean;
	}>();

	const dragging = ref(false);
	const createStore = props.appIDsOverride
		? {
				appIDs: props.appIDsOverride,
				reorderApps: () => {}
		  }
		: useCreateStore();

	const dragStart = (payload: DragEvent, appID: number) => {
		dragging.value = true;
		payload.dataTransfer?.setData("AppID", appID.toString());
	};

	const dragEnd = () => (dragging.value = false);

	const dragDrop = (e: DragEvent) => {
		e.preventDefault();

		const appIDString = e.dataTransfer?.getData("AppID");
		const element = e.target as HTMLDivElement;
		const nextIndexString = element.getAttribute("data-index");
		if (!appIDString || !nextIndexString) return;

		const appID = parseInt(appIDString);
		let newIndex = parseInt(nextIndexString);
		createStore.reorderApps(appID, newIndex);
	};
</script>

<template>
	<div class="games-container">
		<template v-for="appID in createStore.appIDs" :key="appID">
			<DropTarget
				v-if="createStore.appIDs.indexOf(appID) === 0 && draggable"
				:index="0"
				:dragging="dragging"
				@dropped="dragDrop" />
			<GameCard
				:id="appID"
				:deletable="deletable"
				:actionable="actionable"
				:draggable="draggable"
				@dragstart="e => dragStart(e, appID)"
				@dragend="dragEnd"
				tabindex="1" />
			<DropTarget
				v-if="draggable"
				:index="createStore.appIDs.indexOf(appID) + 1"
				:dragging="dragging"
				@dropped="dragDrop" />
		</template>
	</div>
</template>
