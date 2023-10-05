<template>
  <div>
    <div class="box shadowed-box" style="margin: 20px">
      <div class="columns">
        <div class="column">
          <div class="logo">
            <figure class="image is-32x32">
              <img class="is-rounded" src="../assets/image/logobhxh.png" />
            </figure>
            <div class="text-logo">
              <p class="text" style="color: red; font-weight: bold">
                Bảo hiểm xã hội Thạch Hà
              </p>
            </div>
          </div>
        </div>
        <div class="column">
          <div
            v-if="isUser == true"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a @click="logout" class="navbar-item">
              <span>Chào! &nbsp;</span>
              <span style="font-weight: bold; color: #f96854">{{
                info_user.name
              }}</span>
              <span style="color: blueviolet">&ensp; Đăng xuất</span>
            </a>
          </div>
          <!-- <div
            v-if="isUser == true"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link"
              ><img
                :src="info_user.avatar"
                alt=""
                width="40"
                height="40"
                style="border-radius: 50%"
              />
              &ensp; hi, {{ info_user.name }} !</a
            >
            <div class="navbar-dropdown is-boxed">
              <a @click="logout" class="navbar-item">
                <span class="icon is-small is-left" style="color: #3e8ed0">
                  <i class="fab fa-google-play"></i>
                </span>
                &ensp; Đăng xuất
              </a>
            </div>
          </div> -->
        </div>
        <div class="column">
          <div class="menu-bar">
            <div class="control has-icons-left">
              <div class="select">
                <select @change="redirectToPage">
                  <option disabled selected>-- Chọn lĩnh vực --</option>
                  <option value="kehoachcongviec">Kế hoạch công việc</option>
                  <option value="phattriendoituong">
                    Phát triển đối tượng
                  </option>
                  <option value="dondocthutaituc">Đôn đốc Thu - Tái tục</option>
                  <option value="thuchienkltt">
                    Thực hiện kết luận thanh tra - Quyết toán
                  </option>
                  <option value="filepdf">Hiển thị file PDF</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <i style="color: red" class="fas fa-align-justify"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: "quantri",
  middleware: "auth",
  data() {
    return {
      info_user: null,
      isUser: false,
    };
  },

  mounted() {
    this.loadUser();
  },

  methods: {
    redirectToPage(event) {
      const selectedValue = event.target.value;
      if (selectedValue) {
        // Chuyển hướng đến trang cần dựa trên giá trị đã chọn
        switch (selectedValue) {
          case "kehoachcongviec":
            this.$router.push("/quantri/chuongtrinhct");
            break;
          case "phattriendoituong":
            this.$router.push("/quantri/phattriendoituong");
            break;
          case "dondocthutaituc":
            this.$router.push("/quantri/dondocthutaituc");
            break;
          case "thuchienkltt":
            this.$router.push("/quantri/thuchienkltt");
            break;
          case "filepdf":
            this.$router.push("/quantri/pdf");
            break;
          default:
            break;
        }
      }
    },

    async loadUser() {
      // if (this.$auth.$state.user) {
      //   this.info_user = this.$auth.$state.user;
      //   console.log(this.info_user);
      //   this.isUser = true;
      // } else {
      //   this.isUser = false;
      //   this.$router.push("/login");
      //   this.$auth.$state.loggedIn = false;
      // }
      // console.log(this.$auth.$state.user.success);
      if (this.$auth.$state.user.success == false) {
        this.isUser = false;
        this.$auth.$state.loggedIn = false;
      } else {
        this.info_user = this.$auth.$state.user;
        // console.log(this.info_user);
        this.isUser = true;
      }
    },

    logout() {
      // console.log('logout')
      // console.log(this.$auth.$state.loggedIn)
      this.$auth.$state.loggedIn = false;
    },
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: cornflowerblue;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.menu-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.text-logo {
  margin-left: 10px;
}

.text {
  text-align: right;
}

.shadowed-box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
