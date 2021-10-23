<template>
  <v-container fluid fill-height>
    <ConfirmDlg ref="confirm" />
    <LoadingDlg ref="loading" />
    <ProductEditDialog ref="productedit" @save="saveItem" />
    <Toast ref="toast" />
    <v-layout child-flex>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        show-select
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Products</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn @click="realoadItems" color="primary" fab small dark>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn @click="addItem" color="primary" fab small dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
//import UserService from '../services/user.service';
import ProductService from '../services/product.service';

export default {
  name: 'Products',
  data() {
    return {
      search: '',
      headers: [
        // { text: 'Id', align: 'start', filterable: false, value: 'id' },
        { text: 'name', value: 'name' },
        { text: 'description', value: 'description' },
        { text: 'active', value: 'active' },
        { text: 'stock', value: 'stock' },
        { text: 'stockUnit', value: 'stockUnit' },
        { text: 'barCode', value: 'barCode' },
        { text: 'articleNumber', value: 'articleNumber' },
        { text: 'price', value: 'price' },
        { text: 'supplier', value: 'supplier' },
        // { text: 'createdAt', value: 'createdAt' },
        { text: 'updatedAt', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      products: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      errorcontent: ''
    };
  },

  created() {
    this.listProducts();
  },

  mounted() {
    this.listProducts();
  },

  methods: {
    initialize() {
      this.listProducts();
    },
    getColor(calories) {
      if (calories > 500) return 'red';
      else if (calories < 50) return 'orange';
      else return 'green';
    },
    async delRecord() {},

    realoadItems() {
      //alert("not yet implemented");
      //this.$refs.toast.show('warning', 'reloading data');
      this.listProducts();
    },

    addItem() {
      this.$refs.productedit.open();
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$refs.productedit.editOpen(this.editedItem);
    },
    saveItem(data) {
      if (data.hasOwnProperty('id')) {
        this.updateProduct(data);
      } else {
        this.saveProduct(data);
      }
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.$refs.confirm
        .open(
          'Delete Product',
          'Are you sure to delete product: ' + item.name + '?'
        )
        .then(confirm => {
          if (confirm) this.deleteRecord(this.editedItem);
        });
    },

    deleteRecord(item) {
      this.deleteProduct(item);
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    async listProducts() {
      this.$refs.loading.show();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec
      ProductService.getProducts()
        .then(
          response => {
            this.products = response.data;
            this.$refs.loading.hide();
          },
          error => {
            this.errorcontent =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.$refs.toast.show('error', this.errorcontent, 0);
            this.$refs.loading.hide();
          }
        )
        .finally(function() {
          this.$refs.loading.hide();
        });
    },

    async saveProduct(product) {
      this.$refs.loading.show();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec
      ProductService.postProduct(product)
        .then(
          response => {
            this.$refs.toast.show('success', response.data, 1500);
            this.listProducts();
            this.$refs.loading.hide();
          },
          error => {
            this.errorcontent =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.$refs.toast.show('error', this.errorcontent, 0);
            this.$refs.loading.hide();
          }
        )
        .finally(function() {
          this.$refs.loading.hide();
        });
    },

    async updateProduct(data) {
      this.$refs.loading.show();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec

      let id = data.id;

      ProductService.putProduct(id, data)
        .then(
          response => {
            this.$refs.toast.show('success', response.data.message, 1500);
            this.listProducts();
            this.$refs.loading.hide();
          },
          error => {
            this.errorcontent =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.$refs.toast.show('error', this.errorcontent, 0);
            this.$refs.loading.hide();
          }
        )
        .finally(function() {
          this.$refs.loading.hide();
        });
    },

    async deleteProduct(product) {
      this.$refs.loading.show();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec
      ProductService.deleteProduct(product.id)
        .then(
          response => {
            this.$refs.toast.show('success', response.data.message, 2000);
            this.listProducts();
            this.$refs.loading.hide();
          },
          error => {
            this.errorcontent =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.$refs.toast.show('error', this.errorcontent, 0);
            this.$refs.loading.hide();
          }
        )
        .finally(function() {
          this.$refs.loading.hide();
        });
    }
  } // method end
};
</script>
