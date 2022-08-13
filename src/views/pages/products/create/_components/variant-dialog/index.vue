<template>
  <b-modal
    centered
    id="variant-dialog"
    size="lg"
    title="Variant Details"
    title-class="font-18"
  >
    <Row>
      <Column cols="8">
        <div class="form-group">
          <label for="default-input">Description</label>
          <input id="default-input" type="text" class="form-control" />
        </div>
      </Column>
      <Column cols="4">
        <div class="form-group">
          <label for="default-input">Price</label>
          <input id="default-input" type="text" class="form-control" />
        </div>
      </Column>
    </Row>
    <Row class="mt-4">
      <Column>
        <div class="form-group">
          <label for="default-input">Url</label>
          <input id="default-input" type="text" class="form-control" />
        </div>
      </Column>
    </Row>
    <Row class="mt-4">
      <Column cols="8">
        <div class="table-responsive">
          <table class="mt-2 w-100">
            <thead>
              <tr>
                <th style="width: 150px;">Attribute</th>
                <th style="width: 300px;">Value</th>
                <th style="width: 30px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Color
                </td>
                <td>
                  <select class="form-select form-select-sm">
                    <option>Black</option>
                    <option>Quarts</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-danger">
                    <i class="uil uil-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  Bluetooth
                </td>
                <td>
                  <select class="form-select form-select-sm"
                    ><option>Select</option>
                    <option>True</option>
                    <option>False</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-danger">
                    <i class="uil uil-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Column>
    </Row>
  </b-modal>
</template>

<script>
import { EventBus } from "@/libs/eventbus.js";
import Row from "@/components/layout/row.vue";
import Column from "@/components/layout/column.vue";

export default {
  components: {
    Row,
    Column,
  },
  mounted() {
    EventBus.$on("variant-dialog:show", this.showDialog.bind(this));
  },
  methods: {
    showDialog() {
      this.$bvModal.show("variant-dialog");
    },
  },
};
</script>
