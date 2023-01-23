<template>
  <div :id="id" :ref="id" v-if="d">
    <slot></slot>
  </div>
</template>

<script>
import { Dashboard } from "./Dashboard.model";
import elementResizeDetectorMaker from "element-resize-detector";

//Monitor the Props and update the item with the changed value
const watchProp = (key, deep) => ({
  handler(newValue) {
    //If the prop did not cause the update there is no updating
    if (this.d[key] === newValue) {
      return;
    }
    this.d[key] = newValue;
  },
  deep,
});
export default {
  name: "Dashboard",
  inheritAttrs: false,
  props: {
    id: { type: [Number, String], required: true },
    autoHeight: { type: Boolean, default: Dashboard.defaults.autoHeight },
  },
  mounted() {
    this.erd.listenTo({}, document.getElementById(this.id), element => {
      let width = element.offsetWidth;
      let height = element.offsetHeight;
      this.onResize({ detail: { width, height } });
    });
  },
  beforeUnmount() {
    this.erd.uninstall(document.getElementById(this.id));
  },
  data() {
    return {
      d: null,
      erd: elementResizeDetectorMaker({
          strategy: "scroll" //<- For ultra performance.
      })
    };
  },
  provide() {
    return {
      $dashboard: () => this.d,
    };
  },
  computed: {
    currentBreakpoint() {
      if (this.d) {
        return this.d.currentBreakpoint;
      }
      return null;
    },
  },
  watch: {
    currentBreakpoint(newValue) {
      if (newValue) {
        this.$emit("currentBreakpointUpdated", newValue);
      }
    },
  },
  methods: {
    onResize(e) {
      this.d.width = e.detail.width;
    },
    createPropWatchers() {
      //Setup prop watches to sync with the Dash Item
      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, watchProp(key, true));
      });
    },
  },
  created() {
    this.d = new Dashboard(this.$props);
    this.createPropWatchers();
  },
};
</script>

<style></style>
