import { ref } from "vue";
import { defineStore } from "pinia";
defineStore;
export const useCreateStore = defineStore("create", () => {
	const appIDs = ref<number[]>([]);
	const addApp = (appID: number) => {
		if (!appIDs.value.includes(appID)) appIDs.value.push(appID);
	};
	const removeApp = (appID: number) => {
		if (appIDs.value.includes(appID)) appIDs.value = appIDs.value.filter(id => id != appID);
	};

	const reorderApps = (appID: number, newIndex: number) => {
		const currentIndex = appIDs.value.indexOf(appID);
		if (currentIndex < 0) return;
		if (newIndex > currentIndex) newIndex -= 1;
		appIDs.value.splice(currentIndex, 1);
		appIDs.value.splice(newIndex, 0, appID);
	};

	return { appIDs, addApp, removeApp, reorderApps };
});
