<template>
  <FormSection>
    <template slot="title">
      <h5 class="font-size-16">Variants</h5>
    </template>
    <template>
      <button @click="openVariantDialog" class="btn btn-sm btn-outline-primary">
        Configure variants
      </button>
      <div class="table-responsive mt-2">
        <table class="table table-bordered table-sm mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 300px;">Name</th>
              <th width="*">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(variant, key) in variants" :key="key">
              <td>
                {{ variant.name }}
              </td>
              <td>
                R0.00
              </td>
              <td>
                <button class="btn btn-outline-light">
                  <i class="uil uil-edit"></i>
                </button>
                <button class="btn btn-outline-light">
                  <i class="uil uil-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <VariantDialog></VariantDialog>
  </FormSection>
</template>

<script>
import FormSection from "@/components/form/section.vue";
import VariantDialog from "./variant-dialog/index.vue";
import { EventBus } from "@/libs/eventbus";

function generateCombinations(input, output, position, path) {
  if (position == null) {
    position = 0;
  }
  if (path == null) {
    path = [];
  }
  if (position < input.length) {
    var item = input[position];
    for (var i = 0; i < item.length; ++i) {
      var value = item[i];
      path.push(value);
      generateCombinations(input, output, position + 1, path);
      path.pop();
    }
  } else {
    output.push(path.slice());
  }
}

const defaultVariant = {
  name: "",
  price: 0,
};

export default {
  components: {
    FormSection,
    VariantDialog,
  },
  data() {
    return {
      multipleVariants: false,
      variants: [defaultVariant],
    };
  },
  mounted() {
    EventBus.$on("variants:updated", this.buildVariantOptions.bind(this));
  },
  watch: {
    multipleVariants() {},
  },
  methods: {
    openVariantDialog() {
      EventBus.$emit("variant-dialog:show");
    },
    buildVariantOptions(options) {
      const variantOptions = options.map((variant) => {
        return {
          name: variant.name,
          options: variant.values.split(","),
        };
      });

      // const variantPropertyMap = variantOptions.map((variant) => variant.name);

      const input = [];

      variantOptions.forEach((vo) => {
        input.push(vo.options);
      });

      const output = [];
      generateCombinations(input, output);

      this.variants = output.map((elem) => {
        return {
          name: elem.join("/"),
          price: 0,
        };
      });
    },
  },
};
</script>
