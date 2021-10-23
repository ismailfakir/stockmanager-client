<template>
  <v-navigation-drawer
    v-model="isOpen"
    :mini-variant.sync="mini"
    app
    :clipped="$vuetify.breakpoint.lgAndUp"
    color="secondary lighten-1"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :to="child.link"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon dark color="accent">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link :to="item.link">
          <v-list-item-action>
            <v-icon large dark color="accent">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Menues',
  mounted() {
    this.$root.$on('hideMenues', () => {
      //this.isOpen=!this.isOpen;
      this.mini = !this.mini;
    });
  },
  data() {
    return {
      isOpen: null,
      mini: false,
      items: [
        { icon: '$home', text: 'Home', link: '/home' },
        //{ icon: 'mdi-tray-full', text: 'Test', link: '/test' },

        {
          icon: '$uparrow',
          'icon-alt': '$downarrow',
          text: 'Product',
          model: true,
          children: [
            { icon: 'mdi-format-list-bulleted-square', text: 'Product List', link: '/products' },
            { icon: 'mdi-barcode-scan', text: 'Barcode', link: '/barcodes' },
            { icon: 'mdi-chart-bar', text: 'Stock', link: '/stocks' }
          ]
        },
        { icon: '$user', text: 'Profile', link: '/profile' },
        { icon: '$contacts', text: 'Contact Us', link: '/contact' }
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
