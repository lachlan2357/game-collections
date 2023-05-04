<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import GamesContainer from "@/components/GamesContainer.vue";
	import { decode } from "@/logic/encoder";
	import { listUrlConstructor } from "@/logic/url";

	const rawExamples = [
		{ title: "All the Counter-Strike Games", encodedValue: "a-28-6o-ka" },
		{
			title: "All the (proper) LEGO Games as of early 2023",
			encodedValue:
				"p14-oy2-g7c-p1e-gay-p32-6oka-4di0-4klu-4lim-ce8q-5c8a-5qfe-6414-6q1m-7jww-8oqm-9egg-dqa6-dvva-hjf4-hrqu-iw14-jq1e"
		}
	];

	const examples = rawExamples.map(example => ({
		...example,
		paths: listUrlConstructor(decode(example.encodedValue))
	}));
</script>

<template>
	<main>
		<section class="card small">
			<h2>Ever needed to store collections of games?</h2>
			<p>
				Well, here you go I guess. With this tool, create collections as big as you want
				<del>
					unless you want to share on Twitter, then it's only a hundred and something
				</del>
				well that joke aged well.
			</p>
			<p>So what are you waiting for?</p>
			<RouterLink to="/create">Get Started</RouterLink>
		</section>
		<section class="card">
			<h2>Not convinced? Here's some examples!</h2>
			<p>Note these may not be up to date.</p>
			<article v-for="collection in examples" :key="collection.title">
				<h3>{{ collection.title }}</h3>
				<RouterLink :to="collection.paths.relPath.value" class="small">{{
					collection.paths.fullPath.value
				}}</RouterLink>
				<GamesContainer
					:app-i-ds-override="decode(collection.encodedValue)"
					:actionable="true" />
			</article>
		</section>
	</main>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";

	a {
		@include mixins.button();

		&.small {
			align-self: flex-start;
		}
	}

	article {
		@include mixins.flexbox(column);
	}
</style>
