<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card color="secondary">
      <v-card-title class="primary text-center">
        <span class="text-h5 white--text">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="product.name"
            :rules="requiredRules"
            label="name"
            type="text"
            prepend-icon="mdi-alpha-p-box-outline"
            required
          >
          </v-text-field>
          <v-textarea
            v-model="product.description"
            label="description"
            type="text"
            prepend-icon="mdi-all-inclusive"
          >
          </v-textarea>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="product.stock"
                label="stock"
                type="number"
                prepend-icon="mdi-application-variable-outline"
              >
              </v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="product.stockUnit"
                :items="units"
                label="stock unit"
                outlined
                prepend-icon="mdi-arch"
              >
              </v-select
            ></v-col>
          </v-row>

          <v-text-field
            v-model="product.barcode"
            :rules="requiredRules"
            label="barcode"
            type="text"
            prepend-icon="mdi-barcode"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="product.articleNumber"
            label="articleNumber"
            type="text"
            prepend-icon="mdi-all-inclusive"
          >
          </v-text-field>

          <v-text-field
            v-model="product.price"
            label="price"
            type="number"
            prepend-icon="mdi-all-inclusive"
          >
          </v-text-field>
          <v-combobox
          v-model="product.supplier"
          :items="suppliers"
          label="supplier"
          multiple
          outlined
          dense
        prepend-icon="mdi-account-multiple-plus">
        </v-combobox>

          <v-checkbox v-model="product.active" label="active"> </v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Product from '../models/product';
export default {
  name: 'ProductEditDialog',
  data: () => ({
    dialog: false,
    valid: true,
    requiredRules: [v => !!v || 'Required'],
    product: Product.empty(),
    units: ['st', 'kg'],
    suppliers: ['willis','hemkop']
  }),

  computed: {
    formTitle() {
      return this.product.name === '' ? 'New Product' : 'Edit Product';
    }
  },

  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    save() {
      this.dialog = false;
      this.$emit('save', this.product);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.product = Product.empty();
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
