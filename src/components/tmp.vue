<template>
  <div class="date-input">
    <input type="text" v-model="input" maxlength="10" />
  </div>
</template>

<script>
export default {
  props: {
    pattern: String,
    value: String,
  },
  data() {
    return {
      input: "",
    };
  },
  watch: {
    input(value) {
      if (value.length === 2) {
        this.input += ".";
      }

      if (value.length === 5) {
        this.input += ".";
      }

      if (value.length === 10) {
        const split = value.split(".");
        const year = split[2];
        const month = split[1];
        const day = split[0];
        const fullDate = `${year}-${month}-${day}`;
        const date = new Date(fullDate);
        this.$emit("input", date.getTime());
      }
    },
  },
};
</script>
