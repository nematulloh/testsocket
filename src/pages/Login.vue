<template>
  <div
    class="body"
    style="background: radial-gradient(circle, rgba(45,46,47,1) 20%, rgba(111,142,148,1) 100%);padding:12% 35% 20% 35%"
  >
    <div class="vue-template">
      <button type="button" @click="Setsocket()">tests</button>
      <form>
        <h3>Кириш ойнаси</h3>
        <div class="form-group">
          <label>Парол</label>
          <input
            type="password"
            v-model="password"
            class="form-control form-control-lg"
          />
        </div>
        <button
          type="button"
          class="btn btn-dark btn-lg btn-block"
          @click="Login()"
        >
          Кириш
        </button>
        <p class="forgot-password text-right mt-2 mb-4">
          <router-link :to="{ path: '/baseurl' }" class="btn mybtn">
            IP {{ $t("Ўзгартириш") }}
          </router-link>
        </p>
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
.login .form-control-lg {
  padding: 0;
}
.login .vs__selected-options {
  max-width: 100% !important;
  font-size: 21px !important;
}
</style>

<script>
  // import io from "socket.io-client";
export default {
  // sockets: {
  //   connect() {
  //     console.log('socket connected')
  //   },
  //   customEmit(val) {
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   }
  // },
  data() {
    return {
      socket:{},
      username: "",
      password: null,
      Userlist: [
        {
          id: 1,
          name: "test"
        }
      ],
      errors: ""
    };
  },
  methods: {
    Setsocket(){
      // console.log(this.$socket.client.on('new_message'));
      // this.$socket.$subscribe('event_name', payload => {
  // console.log(payload)
// });
      // this.$socket.client.on('new_message', val);
      // this.$socket.client.on('new_message', () => {
      // console.log('vfdvdfvdf');
      // });
    },
    Focus() {
      this.$refs.focused.focus();
    },
    Userlists() {
      if (localStorage.getItem("ip") != undefined) {
        window.axios.defaults.baseURL = localStorage.getItem("ip");
      }
      let self = this;
      axios
        .get("api/v1/users/usernames", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          self.Userlist = response.data;
        });
    },
    Login() {
      let self = this;
      self.errors = "";
      if (self.password == null) {
        self.errors = "Паролни тўлдиринг";
      } else {
        axios({
          method: "post",
          url: "api/v1/users/login",
          data: {
            username: self.username,
            password: self.password,
            confirm_password: self.password
          }
        }).then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_role", response.data.role);
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("sklad_id", response.data.sklad_id);
          self.$store.state.user_role=localStorage.getItem('user_role');
          if(response.data.role=='SuperUser'){
          self.$router.push({ name: "Chiqim qoshish" });
          }else{
          self.$router.push({ name: "Бош сахифа" });
          }
        });
      }
    }
  },
  created(){
    // this.socket=io('http://localhost:3000');
  },
  mounted() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("sklad_id");
    // axios
    //     .get("/", {
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     });
    // this.Userlists();
    // this.Focus();
  }
};
</script>
