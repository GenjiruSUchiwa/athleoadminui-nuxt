import {defineStore} from "pinia";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({

            menuOpen: false,
            userNavigation: [
                {name: 'Your profile', href: '#'},
                {name: 'Sign out', href: '#'},
            ]

    }),
    actions: {
        toggle() {
            this.menuOpen = !this.menuOpen;
        }
    },
    getters: {
        sidebarOpen: (state) => state.menuOpen,
    }
})