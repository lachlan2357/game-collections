import { computed } from "vue";
import { encode } from "./encoder";

export const listUrlConstructor = (appIDs: number[]) => {
	const path = window.location.origin;
	const relPath = computed(() => `/list/${encode(appIDs)}`);
	const fullPath = computed(() => `${path}${relPath.value}`);

	return { relPath, fullPath };
};
