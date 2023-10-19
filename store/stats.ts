import { defineStore } from 'pinia'
import { useCustomFetch } from "~/composables/useCustomFetch";


export const useStatsStore = defineStore('stats', {
    state: () => {

    },
    actions: {
        async fill() {
            const { data, pending, error } = await useCustomFetch('/admin/getmetrics', {
                method: "get"
            })
        }
    }
})