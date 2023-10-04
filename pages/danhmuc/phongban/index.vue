<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-fax"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Phòng ban</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              phongban.length | formatNumber
            }}</span>
            <span>Phòng</span>
          </div>
          <div class="column" style="text-align: right">
            <button
              @click="isActive = true"
              class="button is-success is-fullwidth is-small"
            >
              <span class="icon is-small">
                <i class="fas fa-pen-fancy"></i>
              </span>
              <span>Thêm</span>
            </button>
          </div>
        </div>
        <div style="margin-bottom: 3px; text-align: right">
          <vue-excel-xlsx
            :data="phongban"
            :columns="columns"
            :file-name="'Danh_muc_phong_ban'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục phòng ban'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: smaller; width: 3%">
                  STT
                </th>
                <th style="text-align: center; font-size: smaller; width: 10%">
                  Mã phòng
                </th>
                <th style="text-align: center; font-size: smaller; width: 50%">
                  Tên phòng
                </th>
                <th style="text-align: center; font-size: smaller">Ghi chú</th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Sửa
                </th>
                <th style="text-align: center; font-size: smaller; width: 5%">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(phong, index) in phongban" :key="index">
                <td style="text-align: center; font-size: smaller">
                  {{ index + 1 }}
                </td>
                <td style="font-size: smaller">{{ phong.maphong }}</td>
                <td style="font-size: smaller">{{ phong.tenphong }}</td>
                <td style="font-size: smaller">{{ phong.ghichu }}</td>
                <td style="text-align: center; color: green">
                  <nuxt-link :to="`/danhmuc/phongban/${phong._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link>
                </td>
                <td style="text-align: center">
                  <a @click="onDelete(phong)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns is-mobile">
                  <div class="column">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Thêm Phòng ban
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="field">
                  <label class="label">Mã phòng ban</label>
                  <div class="control">
                    <input
                      v-model="form.maphong"
                      @blur="$v.form.maphong.$touch()"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập mã phòng ban"
                    />
                  </div>
                  <div v-if="$v.form.maphong.$error" class="form-error">
                    <span
                      v-if="!$v.form.maphong.required"
                      class="help is-danger"
                      >Yêu cầu nhập mã phòng</span
                    >
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tên phòng ban</label>
                  <div class="control">
                    <input
                      v-model="form.tenphong"
                      @blur="$v.form.tenphong.$touch()"
                      class="input is-small"
                      type="text"
                      placeholder="Nhập tên phòng ban"
                    />
                  </div>
                  <div v-if="$v.form.tenphong.$error" class="form-error">
                    <span
                      v-if="!$v.form.tenphong.required"
                      class="help is-danger"
                      >Yêu cầu nhập tên phòng</span
                    >
                  </div>
                </div>
                <div class="field">
                  <label class="label">Diễn giải thêm</label>
                  <div class="control">
                    <textarea
                      v-model="form.ghichu"
                      class="textarea is-small"
                      placeholder="Ghi chú thêm ..."
                    ></textarea>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <button
                      :disabled="$v.form.$invalid"
                      @click.prevent="onAddPhongban"
                      class="button is-success is-fullwidth is-small"
                    >
                      Ghi nhận
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import XLSX from "xlsx";
export default {
  middleware: "auth",
  data() {
    return {
      phongban: [],
      form: {
        maphong: null,
        tenphong: null,
        ghichu: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals
      isActive: false,

      columns: [
        {
          label: "Id phòng ban",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Mã phòng",
          field: "maphong",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên phòng",
          field: "tenphong",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        {
          label: "Tạo ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tạo bởi",
          field: "createdBy",
        },
        {
          label: "Cập nhật ngày",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
      ],
    };
  },

  validations: {
    form: {
      maphong: {
        required,
      },
      tenphong: {
        required,
      },
    },
  },

  // load dữ liệu all phòng ban từ store phongban
  // fetch({ store }) {
  //   return store.dispatch("phongban/fetchPhongbans");
  // },

  mounted() {
    this.getDspb();
    this.currentDateTime();
  },

  // computed: {
  //   // load dữ liệu từ store ra DOM
  //   phongbans() {
  //     return this.$store.state.phongban.items;
  //   },
  // },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    onChangePage(pageOfitems) {
      this.pageOfitems = pageOfitems;
    },

    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },

    async getDspb() {
      this.phongban = await this.$axios.$get(`/api/phongban/allphongban`);
      if (this.phongban.length <= 0) {
        this.$toasted.show("Không có danh sách phòng ban", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    onAddPhongban() {
      Swal.fire({
        title: "Chắc chắn thêm mới phòng ban này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Chắc chắn thêm mới",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$v.form.$touch();
            // console.log(this.$auth.$state.user.username);

            this.$store.dispatch("phongban/createPhongban", this.form);
            this.getDspb();

            // this.$store
            //   .dispatch("phongban/createPhongban", this.form)
            //   .then((_) => this.$router.push("/danhmuc/phongban/"));

            // this.$axios.$post("/api/phongban/addphongban", this.form);
            // this.$forceUpdate()
            // save log
            this.hisform.tenthaotac = `Thêm danh mục phòng ban, tên: ${this.form.tenphong}`;
            this.hisform.ghichu = `Thêm danh mục phòng ban`;
            this.$axios.$post(`/api/logsystem/record-action`, this.hisform);

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Thêm mới phòng ban thành công",
            });

            this.isActive = false;
          } catch (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: "Có lỗi xảy ra !!!",
            });
          }
        }
      });
    },

    onDelete(pb) {
      swal({
        title: "Bạn muốn xóa phòng ban này?",
        text: "Phòng ban này sẽ không lấy lại được sau khi xóa!",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.$delete(`/api/phongban/${pb._id}`).then((response) => {
            const index = this.phongban.findIndex((p) => p._id === pb._id); // find the post index
            if (~index)
              // if the post exists in array
              this.phongban.splice(index, 1); //delete the post
          });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Xóa thành công",
          });
        } else {
          swal("Bạn đã hủy xóa phòng ban");
        }
      });
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 350px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 720px;
}

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .is-flex-mobile {
    display: flex;
    align-items: center;
  }
}
</style>
