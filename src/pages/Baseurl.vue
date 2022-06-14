<template>
  <div
    class="body"
    style="background: radial-gradient(circle, rgba(45,46,47,1) 20%, rgba(111,142,148,1) 100%);padding:12% 35% 20% 35%"
  >
    <div class="vue-template">
      <form>
        <h3>IP</h3>
        <div class="form-group">
          <label>Ipni kiriting</label>
          <input
            type="text"
            ref="focused"
            v-model="ip"
            class="form-control form-control-lg"
          />
        </div>

        <button
          type="button"
          class="btn btn-dark btn-lg btn-block"
          @click="Send()"
        >
          {{ $t("Сақлаш") }}
        </button>

        <p class="forgot-password text-right mt-2 mb-4"></p>
      </form>
    </div>
  </div>
</template>
<style>
.vue-template form {
  padding: 2% 8%;
  border-radius: 10px;
  background: white;
}

.vs__selected-options {
  max-width: 100% !important;
}
</style>

<script>
export default {
  data() {
    return {
      ip: ""
    };
  },
  methods: {
    Focus() {
      this.$refs.focused.focus();
    },
    Send() {
      let self = this;
      if (self.ip == "") {
        self.$store.state.errors = self.$t("Майдон бўш");
      } else {
        localStorage.setItem("ip", "http://" + self.ip + ":3001");
        self.$router.push({ name: "Login" });
      }
    }
  },
  mounted() {
    this.Focus();
  }
};
</script>
