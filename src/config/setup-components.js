// Core Components
import Toolbar from '../components/core/Toolbar.vue';
import Navigation from '../components/core/NavigationDrawer.vue';
import Breadcrumbs from '../components/core/Breadcrumbs.vue';
import PageFooter from '../components/core/PageFooter.vue';
import Footer from '../components/core/Footer.vue';
import Header from '../components/core/Header.vue';
import Menues from '../components/core/Menues.vue';
import ConfirmDlg from '../components/core/ConfirmDlg.vue';
import LoadingDlg from '../components/core/LoadingDlg.vue';
import FormDlg from '../components/core/FormDlg.vue';
import ProductEditDialog from '../components/ProductEditDialog.vue';
import Toast from '../components/core/Toast.vue';


function setupComponents(Vue){
  Vue.component('toolbar', Toolbar);
  Vue.component('navigation', Navigation);
  Vue.component('breadcrumbs', Breadcrumbs);
  Vue.component('page-footer', PageFooter);
  Vue.component('Footer', Footer);
  Vue.component('Header', Header);
  Vue.component('Menues', Menues);
  Vue.component('ConfirmDlg', ConfirmDlg);
  Vue.component('LoadingDlg', LoadingDlg);
  Vue.component('FormDlg', FormDlg);
  Vue.component('ProductEditDialog', ProductEditDialog);
  Vue.component('Toast', Toast);
}

export {
  setupComponents
}