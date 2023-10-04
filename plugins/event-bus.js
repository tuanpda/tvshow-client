import Vue from "vue";
import VueObserveVisibility from "vue-observe-visibility";

Vue.use(VueObserveVisibility);

const EventBus = new Vue();
export default EventBus;
