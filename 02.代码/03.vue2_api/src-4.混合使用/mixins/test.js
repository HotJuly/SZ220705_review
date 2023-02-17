export default {
  data() {
    return {
      a: 2,
    };
  },
  mounted() {
    console.log("局部混合", this.$options.name);
  },
};
