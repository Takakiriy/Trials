import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import Amplify, { Logger } from '@aws-amplify/core';
// @ts-ignore
import { AmplifyPlugin } from 'aws-amplify-vue';
import { AmplifyConfig, AmplifyModules, AmplifyVocabularies } from './aws-config';

Amplify.configure(AmplifyConfig);
AmplifyModules.I18n.setLanguage('ja');
AmplifyModules.I18n.putVocabularies(AmplifyVocabularies);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');

Vue.config.errorHandler = (err, vm, info) => {
  const logger = new Logger('AmplifyLogger');
  try {  // for avoiding infinite loop exception
    logger.error( err.stack );
    logger.error( vm.$vnode );
    logger.error( info );
  } catch (e) {
    logger.error( 'in catch' );
  }
};
