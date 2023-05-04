<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import { routes, navRoutes } from "@/router";

	const filteredRoutes = routes.filter(route => navRoutes.includes(route.name));
</script>

<template>
	<nav class="card">
		<ul>
			<li v-for="route in filteredRoutes" :key="route.name">
				<RouterLink :to="route.path">{{ route.name }}</RouterLink>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";

	nav {
		@include mixins.container(true);
		@include mixins.flexbox();
		@include mixins.flexbox-align(center, center);
		padding-block: 0.5em;

		ul {
			@include mixins.flexbox();
			list-style-type: none;

			li {
				display: inline-block;

				a {
					@include mixins.button();
					background-color: var(--mg);
				}
			}
		}
	}
</style>
