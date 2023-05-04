<script setup lang="ts">
	import { decode } from "@/logic/encoder";
	import { useRoute } from "vue-router";
	import GamesContainer from "@/components/GamesContainer.vue";

	const route = useRoute();
	const encodedValue = route.params.encodedValue.toString() || "";
	const appIDs = decode(encodedValue);
</script>

<template>
	<main>
		<section class="container card">
			<h2>Games</h2>
			<p>Click on any game to view on Steam Store or request Steam install them</p>
			<GamesContainer :app-i-ds-override="appIDs" :actionable="true" />
		</section>
	</main>
	<iframe frameborder="0" width="0" height="0" opacity="0" name="steam-opener"></iframe>
</template>

<style scoped lang="scss">
	iframe {
		pointer-events: none;
		position: absolute;
		z-index: -100;
	}
</style>
