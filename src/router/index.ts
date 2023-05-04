import { createRouter, createWebHistory } from "vue-router";
import AboutViewVue from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import CreateView from "@/views/CreateView.vue";
import ListView from "@/views/ListView.vue";
import EmptyList from "@/redirects/EmptyList.vue";

const routeNameArray = <const>["Home", "Create", "ListButNoCigar", "List", "About", "404"];
export type RouteName = (typeof routeNameArray)[number];
type RouteInfo = { [key in RouteName]: [string, string] };
type Route = {
	name: RouteName;
	path: string;
	component: any;
};

export const routes: Route[] = [
	{ name: "Home", path: "/", component: HomeView },
	{ name: "Create", path: "/create", component: CreateView },
	{ name: "ListButNoCigar", path: "/list", component: EmptyList },
	{ name: "List", path: "/list/:encodedValue", component: ListView },
	{ name: "About", path: "/about", component: AboutViewVue },
	{ name: "404", path: "/:pathMatch(.*)*", component: null }
];

export const routeInfo: RouteInfo = {
	"Home": ["Game Collections", "Groups of Steam Games in one place!"],
	"Create": ["Create Collection", "Create your very own collection. Fun!"],
	"ListButNoCigar": ["Empty List", "There's nothing here!"],
	"List": ["Shared Collection", "Somebody sent you these games. Maybe install them."],
	"About": ["About", "What is this place, anyway?"],
	"404": ["Page Not Found", "Woah! You're not supposed to be here. Strange."]
};

export const navRoutes: RouteName[] = ["Home", "Create", "About"];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.beforeEach(({ name }) => {
	if (name == "Home") document.title = "Game Collections";
	else document.title = `Game Collections | ${name?.toString()}`;
});

export default router;
