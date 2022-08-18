<template>
  <ul
    role="menu"
    tabindex="-1"
    class="dropdown-menu combobox-menu"
    :class="show ? 'show' : ''"
    aria-labelledby="__BVID__195__BV_toggle_"
    x-placement="bottom-start"
  >
    <li role="presentation" @click="onCreateNew" v-if="!hasExactMatch">
      <a
        role="menuitem"
        href="#"
        target="_self"
        class="dropdown-item text-primary"
        >Create new "{{ search }}"</a
      >
    </li>
    <div v-if="!useLabel">
      <li
        @click.prevent="select(item)"
        role="presentation"
        v-for="item in filteredItems"
        :key="item"
      >
        <a role="menuitem" href="#" target="_self" class="dropdown-item">{{
          item
        }}</a>
      </li>
    </div>
    <div v-if="useLabel">
      <li
        @click.prevent="select(item)"
        role="presentation"
        v-for="item in filteredItems"
        :key="item[trackBy]"
      >
        <a role="menuitem" href="#" target="_self" class="dropdown-item">{{
          item[label]
        }}</a>
      </li>
    </div>
  </ul>
</template>

<script>
import { EventBus } from "../../../libs/eventbus";
import { filterWithoutLabel, filterWithLabel } from "./filters";

export default {
  props: {
    id: {
      type: String,
    },
    search: {
      type: String,
      default: "",
    },
    selected: {
      type: Object,
    },
    label: {
      type: String,
      required: false,
    },
    useLabel: {
      type: Boolean,
    },
    trackBy: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
    },
  },
  computed: {
    hasSelected() {
      return !!this.selected;
    },
    show() {
      return !this.hasSelected && this.search.length > 0;
    },
    filteredItems() {
      const search = this.search.toLowerCase();

      if (!search.length) {
        return [];
      }

      return this.useLabel
        ? filterWithLabel(this.label, search, this.items)
        : filterWithoutLabel(search, this.items);
    },
    hasExactMatch() {
      const search = this.search.toLowerCase();

      return this.filteredItems.some((item) => {
        const field = this.useLabel ? item[this.label] : item;
        return field.toLowerCase() === search;
      });
    },
  },
  methods: {
    select(item) {
      EventBus.$emit(`combobox-${this.id}:selected`, item);
    },
    onCreateNew() {
      EventBus.$emit(`combobox-${this.id}:created`);
    },
  },
};
</script>
