import Vue from 'vue'
import swal from 'sweetalert'

Vue.use({
  // this is the required "install" method for Vue plugins
  install (Vue) {
    Vue.swal = swal
    Vue.prototype.$swal = swal
  }
})

