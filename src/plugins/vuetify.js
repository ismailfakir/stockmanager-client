// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const APP_ICONS = {
  //https://fontawesome.com/icons?d=gallery&q=Home&m=free
  /**menues icons */
    profile: 'mdi-dots-vertical-circle',
    home: 'mdi-home-minus',
    users: 'mdi-account',
    foods: 'fas fa-pizza-slice',
    events: 'fas fa-calendar-week',
    perticipants: 'fas fa-th-list',
    news: 'fas fa-bullhorn',
    venue: 'fas fa-map-marked-alt',
    contacts: 'mdi-at',
    uparrow:'mdi-arrow-up-bold',
    downarrow:'mdi-arrow-down-bold',
    item:'mdi-bullseye',
    /**headers icons */
    signout:'mdi-logout',
    tools:'mdi-tools',
    user:'mdi-account',
    signin:'mdi-login',
    register:'mdi-account-plus',
    add:'fas fa-plus',
    edit:'fas fa-edit',
    delete:'fas fa-trash-alt',
    view:'fas fa-eye',
    search:'fas fa-search',
};

const opts = {
    icons: {
      iconfont: 'mdi',
      values: APP_ICONS,
      },
      theme: {
        dark: false,
        themes: {
          light: {
            primary: '#37474F',
            secondary: '#ECEFF1',
            accent: '#455A64',
            warning: '#f85f63',
            black: '#212636',
            grey: '#757575',
            progress: '#23b5d3',
            success: '#10ac84',
            error: '#ee5253',
            activated: '#10ac84',
            disabled: '#f85f63'
          }
        }
      }
}

export default new Vuetify(opts)