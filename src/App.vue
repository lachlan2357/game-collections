<script setup lang="ts">
	import NavBar from "@/components/NavBar.vue";
	import PageHeader from "@/components/PageHeader.vue";
	import PageFooter from "@/components/PageFooter.vue";
</script>

<template>
	<NavBar />
	<PageHeader />

	<RouterView />

	<PageFooter />
</template>
