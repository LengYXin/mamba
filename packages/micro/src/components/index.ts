import { App } from 'vue';
import User from './user.vue';
export default {
    install(app: App) {
        app.component('AppUser', User)
    }
}