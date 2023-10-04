<template>
  <section class="hero is-success is-fullheight">
    <div class="">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="avatar">
              <img src="../assets/image/logo.png" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.username"
                    @blur="$v.form.username.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Tên đăng nhập"
                  />
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span
                      v-if="!$v.form.username.required"
                      class="help is-danger"
                      >Yêu cầu nhập tên đăng nhập</span
                    >
                    <span
                      v-if="!$v.form.username.minLength"
                      class="help is-danger"
                      >Tên ít nhất 6 ký tự</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.name"
                    @blur="$v.form.name.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Họ và tên"
                  />
                  <div v-if="$v.form.name.$error" class="form-error">
                    <span v-if="!$v.form.name.required" class="help is-danger"
                      >Yêu cầu nhập họ tên</span
                    >
                    <span v-if="!$v.form.name.minLength" class="help is-danger"
                      >Họ tên ít nhất 6 ký tự</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                    class="input is-large"
                    type="email"
                    placeholder="Email"
                  />
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger"
                      >Yêu cầu nhập Email</span
                    >
                    <span
                      v-if="!$v.form.email.emailValidator"
                      class="help is-danger"
                      >Địa chỉ email không hợp lệ</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="file is-small has-name">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      @change="onFileSelected"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label"> Đính file … </span>
                    </span>
                    <span class="file-name">
                      {{ form.fileName }}
                    </span>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Mật khẩu"
                    autocomplete="new-password"
                  />
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span
                      v-if="!$v.form.password.required"
                      class="help is-danger"
                      >Yêu cầu nhập mật khẩu</span
                    >
                    <span
                      v-if="!$v.form.password.minLength"
                      class="help is-danger"
                      >Mật khẩu ít nhất 6 ký tự</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.passwordConfirmation"
                    @blur="$v.form.passwordConfirmation.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    autocomplete="off"
                  />
                  <div
                    v-if="$v.form.passwordConfirmation.$error"
                    class="form-error"
                  >
                    <span
                      v-if="!$v.form.passwordConfirmation.required"
                      class="help is-danger"
                      >Xác nhận mật khẩu không đúng</span
                    >
                    <span
                      v-if="!$v.form.passwordConfirmation.sameAs"
                      class="help is-danger"
                      >Xác nhận mật khẩu phải trùng với mật khẩu đã nhập</span
                    >
                  </div>
                </div>
              </div>
              <button
                @click.prevent="register"
                :disabled="$v.form.$invalid"
                type="button"
                class="button is-block is-info is-large is-fullwidth"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
import { supportedFileType } from "@/helpers/validators";
export default {
  layout: "none",
  middleware: "auth-admin",
  data() {
    return {
      form: {
        username: null,
        name: null,
        email: null,
        avatar: '../static/avatar/avatar.jpg',
        password: null,
        role: null,
        mahuyen: null,
        updatedAt: null,
        passwordConfirmation: null,
        fileName: "",
        selectedFile: null,
        createdAt: new Date().toISOString().substr(0, 10),
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
        // minLength: minLength(6)
      },
      name: {
        required,
        // minLength: minLength(6)
      },
      avatar: {
        url,
        supportedFileType,
      },
      email: {
        required,
        emailValidator: email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirmation: {
        required,
        sameAs: sameAs("password"),
      },
    },
  },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid;
    },
  },
  methods: {
    /* Lấy tên file */
    onFileSelected(event) {
      this.form.selectedFile = event.target.files[0];
      console.log(this.form.selectedFile);
      this.form.fileName = event.target.files[0].name;
    },

    /* Submit form */
    async register() {
      this.$v.form.$touch();
      if (this.isFormValid) {
        try {
          let data = new FormData();
          data.append("username", this.form.username);
          data.append("name", this.form.name);
          data.append("email", this.form.email);
          data.append("password", this.form.password);
          data.append('role', this.form.role);
          data.append('mahuyen', this.form.mahuyen);
          data.append("createdAt", this.form.createdAt);
          if (this.form.selectedFile) {
            data.append(
              "avatar",
              this.form.selectedFile,
              this.form.selectedFile.name
            );
          } else {
            data.append("avatar", this.form.avatar);
          }
          await this.$axios.$post("/api/users/account", data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
p.subtitle {
  padding-top: 1rem;
}
</style>
