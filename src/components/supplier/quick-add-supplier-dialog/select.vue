<template>
  <div>
    <p class="mt-4 mb-1">Options</p>
    <div class="table-responsive">
      <table class="table table-sm mb-0">
        <tbody>
          <tr v-for="supplier in selectableSuppliers" :key="supplier.id">
            <td>{{ supplier.name }}</td>
            <td class="text-end">
              <a href="#" @click.prevent="selectSupplier(supplier)">select</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-4 mb-1">Selected</p>
    <div class="table-responsive">
      <table class="table table-sm mb-0">
        <tbody>
          <tr v-for="supplier in selectedSuppliers" :key="supplier.id">
            <td>{{ supplier.name }}</td>
            <td class="text-end">
              <a
                class="text-danger"
                href="#"
                @click.prevent="removeSupplier(supplier)"
                >remove</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div class="mt-3 text-end">
      <b-button @click="onCancel" variant="secondary" class="w-sm"
        >Close</b-button
      >
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../../libs/eventbus";
import events from "./events";

export default {
  props: {
    suppliers: Array,
    useAllProducts: Boolean,
    product: Object,
  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    this.selected = this.product.suppliers.map(
      (supplier) => supplier.supplierId
    );
  },
  computed: {
    selectedSuppliers() {
      return this.suppliers.filter((supplier) => {
        return this.selected.includes(supplier.id);
      });
    },
    selectableSuppliers() {
      return this.suppliers.filter((supplier) => {
        return !this.selected.includes(supplier.id);
      });
    },
  },
  methods: {
    selectSupplier(supplier) {
      this.selected.push(supplier.id);

      EventBus.$emit(events.SELECT, {
        supplier,
        allProducts: this.useAllProducts,
        product: this.product,
      });
    },
    removeSupplier(supplier) {
      const ref = this.product.suppliers.find((e) => {
        return e.supplierId === supplier.id;
      });

      this.selected.splice(this.selected.indexOf(supplier.id), 1);

      EventBus.$emit(events.DESELECT, {
        supplier: ref,
        allProducts: this.useAllProducts,
        product: this.product,
      });
    },
    onCancel() {
      EventBus.$emit(events.HIDE);
    },
  },
};
</script>
