import { createApp } from 'vue';
import { App } from 'src/app';
import 'src/app/style.css'
import router from 'src/shared/router';
import { useVuetify } from 'src/shared/plugins/vuetify';
import { useFirebase } from 'src/shared/plugins/firebase';
import store from 'src/shared/stores';

const app = createApp(App);
    useFirebase();
    useVuetify(app);
    app.use(router)
    app.use(store)
    app.mount('#app')
