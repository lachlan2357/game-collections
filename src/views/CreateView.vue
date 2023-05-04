<script setup lang="ts">
	import { computed, ref } from "vue";
	import GamesContainer from "@/components/GamesContainer.vue";
	import { useCreateStore } from "@/stores/creator";
	import { listUrlConstructor } from "@/logic/url";

	const createStore = useCreateStore();

	const addAppID = (payload: Event) => {
		payload.preventDefault();
		const form = payload.target as HTMLFormElement;
		const formData = new FormData(form);
		const appIDString = formData.get("appid")?.toString();
		const appID = parseInt(appIDString ?? "");
		if (!appID) return;
		createStore.addApp(appID);
		form.reset();
	};

	const copyUrl = () => {
		if (disabled.value) return;
		navigator.clipboard.writeText(fullPath.value);
		copyText.value = "Copied!";
	};

	const { relPath, fullPath } = listUrlConstructor(createStore.appIDs);
	const disabled = computed(() => createStore.appIDs.length == 0);
	const copyText = ref("Copy");
</script>

<template>
	<main>
		<section class="card">
			<h2>Add Games</h2>
			<form @submit="addAppID">
				<label for="appid">Add AppIDs</label>
				<input id="appid" name="appid" type="number" placeholder="e.g. 730" />
			</form>
			<GamesContainer :draggable="true" :deletable="true" />
		</section>
		<section v-if="!disabled" class="card">
			<h2>Share</h2>
			<div id="share-link">
				<span @click="copyUrl">{{ fullPath }}</span>
				<button @click="copyUrl">{{ copyText }}</button>
				<RouterLink :to="relPath">Try</RouterLink>
			</div>
		</section>
	</main>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";

	header {
		@include mixins.container();
		@include mixins.flexbox(column, 0);
	}

	form {
		@include mixins.flexbox(column, 0.5em);
	}

	input {
		@include mixins.focus-visible();
		border-radius: var(--br);
		padding: 0.5em 0.75rem;

		&.inline {
			background-color: transparent;
		}

		&.big {
			font-size: 1.25em;
		}

		&.bigger {
			font-size: 2em;
		}
	}

	#share-link {
		@include mixins.flexbox();
		@include mixins.flexbox-align(center, center);

		span {
			align-self: center;
			background-color: var(--fg);
			border-radius: var(--br);
			cursor: copy;
			flex-grow: 1;
			padding: 0.5em 1em;
		}

		a {
			@include mixins.button();
		}
	}
</style>
