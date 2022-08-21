<template>
  <div class="combobox">
    <AppComboboxInput :id="id" v-model="input" :placeholder="placeholder" />
    <AppComboboxMenu
      :id="id"
      :search="input"
      :items="items"
      :createNew="createNew"
      :selected="selected"
      :label="label"
      :useLabel="useLabel"
      :trackBy="trackBy"
    />
  </div>
</template>

<script>
import { EventBus } from "@/libs/eventbus";
import AppComboboxInput from "./AppComboboxInput.vue";
import AppComboboxMenu from "./AppComboboxMenu.vue";

export default {
  components: {
    AppComboboxInput,
    AppComboboxMenu,
  },
  props: {
    id: {
      type: String,
    },
    value: {
      type: Object,
    },
    items: {
      type: Array,
    },
    label: {
      type: String,
      required: false,
    },
    trackBy: {
      type: String,
      required: false,
    },
    createNew: {
      type: Function,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      input: "",
      selected: null,
      hasExactMatch: false,
    };
  },
  watch: {
    input() {
      if (this.selected) {
        this.selected = null;
        this.$emit("input", this.selected);
      }
    },
  },
  computed: {
    useLabel() {
      return !!this.label;
    },
  },
  mounted() {
    EventBus.$on(`combobox-${this.id}:created`, this.onCreated.bind(this));
    EventBus.$on(`combobox-${this.id}:selected`, this.onSelected.bind(this));
    EventBus.$on(
      `combobox-${this.id}:has-exact-match`,
      this.onSelected.bind(this)
    );
  },
  beforeDestroy() {
    EventBus.$off(`combobox-${this.id}:created`, this.onCreated.bind(this));
    EventBus.$off(`combobox-${this.id}:selected`, this.onSelected.bind(this));
    EventBus.$on(
      `combobox-${this.id}:has-exact-match`,
      this.onSelected.bind(this)
    );
  },
  methods: {
    async onCreated() {
      if (!this.createNew) {
        EventBus.$emit(`combobox-${this.id}:selected`, this.input);
        return;
      }

      const newItem = await this.createNew(this.input);
      EventBus.$emit(`combobox-${this.id}:selected`, newItem);
    },
    async onSelected(value) {
      EventBus.$emit(
        `combobox-${this.id}:update-input`,
        this.useLabel ? value[this.label] : value
      );

      this.$nextTick(() => {
        this.selected = value;
        this.$emit("input", this.selected);
      });
    },
    reset() {
      EventBus.$emit(`combobox-${this.id}:update-input`, "");
      EventBus.$emit(`combobox-${this.id}:focus-input`);
    },
  },
};
</script>

<style lang="scss">
.combobox {
  position: relative;
  display: inline-block;
  width: 100%;

  .combobox-menu {
    position: absolute;
    width: 100%;
  }
}
</style>
