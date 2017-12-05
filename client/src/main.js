// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import { ApolloClient, createBatchingNetworkInterface } from "apollo-client";
import VueApollo from "vue-apollo";

import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const networkInterface = createBatchingNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cjatgxfv0130501894porp08r"
});

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  template: "<App/>",
  components: { App }
});
