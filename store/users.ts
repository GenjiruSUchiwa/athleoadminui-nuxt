import {defineStore} from "pinia";
import {useCustomFetch} from "~/composables/useCustomFetch";

export let useUsersStore = defineStore('users', {
    state: () => {
        return {
            users: []
        }
    },
    actions: {
      async fill() {
          let {data, pending,error} = await useCustomFetch('/admin/listallusers?page=1', {
              method: 'get'
          })

          console.log({data})
      }
    }
})