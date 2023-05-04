<script setup lang="ts">
	import { useCreateStore } from "@/stores/creator";
	import { computed } from "vue";

	const props = defineProps<{ id: number; actionable?: boolean; deletable?: boolean }>();
	const actionableClass = computed(() => (props.actionable ? "actionable" : undefined));

	const createStore = useCreateStore();

	const remove = (appID: number) => createStore.removeApp(appID);

	const storePage = () => steamLink(props.id, "store");
	const install = () => steamLink(props.id, "preload");

	const steamLink = (appID: number, action: "store" | "preload") =>
		window.open(`steam://${action}/${appID}`, "_self");
</script>

<template>
	<div class="game-card" :class="actionableClass" :title="`Install ${props.id}`" tabindex="1">
		<img :src="`https://cdn.akamai.steamstatic.com/steam/apps/${props.id}/header.jpg`" alt="" />
		<p>{{ props.id }}</p>
		<div v-if="actionable" class="button-container">
			<button @click="storePage" tabindex="-1">Store</button>
			<button @click="install" tabindex="-1">Install</button>
		</div>
		<button v-if="deletable" class="remove" @click="() => remove(id)">
			<FontAwesomeIcon icon="fa-solid fa-xmark" />
		</button>
	</div>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";
	.game-card {
		position: relative;

		&[draggable="true"] {
			cursor: grab;
		}

		&.actionable {
			cursor: pointer;

			&:hover,
			&:focus {
				img {
					filter: brightness(15%);
					transform: scale(1.1);
				}

				p {
					transform: translateX(-50%) translateY(-2em);
				}

				.button-container {
					transform: translateY(-1em);
				}
			}
		}
	}

	.button-container {
		@include mixins.flexbox();
		@include mixins.flexbox-align(space-evenly, center);
		bottom: 0;
		left: 0;
		padding-inline: 0.5em;
		position: absolute;
		transform: translateY(100%);
		width: 100%;
		z-index: 1;

		button {
			background-color: var(--txt);
			color: var(--bg);
			flex-basis: 0;
			flex-grow: 1;
			padding: 0.5em;

			&:hover {
				background-color: var(--accent);
			}
		}
	}
</style>
