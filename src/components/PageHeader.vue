<script setup lang="ts">
	import { useRoute } from "vue-router";
	import { routeInfo, type RouteName } from "@/router";
	import { ref, watch } from "vue";

	const route = useRoute();
	const routeName = (route.name?.toString() as RouteName) ?? "404";
	const routeData = ref(routeInfo[routeName]);

	watch(route, () => {
		const routeName = (route.name?.toString() as RouteName) ?? "404";
		routeData.value = routeInfo[routeName];
	});
</script>

<template>
	<header class="card">
		<h1>{{ routeData[0] }}</h1>
		<p>{{ routeData[1] }}</p>
	</header>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";

	header {
		@include mixins.flexbox(column);
		@include mixins.flexbox-align(center, center);
		padding: 5em 2em;
	}
</style>
