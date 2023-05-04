<template>
	<footer class="card">
		<a class="icon" href="http://github.com/lachlan2357/game-collections">
			<FontAwesomeIcon icon="fa-brands fa-github" />
		</a>
		<p>
			Copyright 2023 | Lachlan Rehder. All code available on GitHub under GPLv3 License. Images
			sourced by URL through SteamCDN. Steam and the Steam logo are trademarks and/or
			registered trademarks of Valve Corporation in the U.S. and/or other countries.
		</p>
	</footer>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/mixins";

	footer {
		@include mixins.container();
		gap: 0.5em;
		text-align: center;
	}

	a.icon {
		align-self: center;
		&,
		&:visited {
			color: var(--txt);
		}

		&:hover {
			color: var(--accent-hover);
		}
	}

	p {
		font-size: 0.75em;
	}
</style>
