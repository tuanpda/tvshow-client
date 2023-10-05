<template>
  <div class="columns">
    <div class="column">
      <div class="box" style="margin: 20px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-calendar-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Kế hoạch công việc</span
              >
            </div>
          </div>
          <div class="column" style="text-align: right">
            <span style="font-weight: 600">Tháng năm </span>
            <div class="select is-small">
              <select id="" @change="onChange_Thang($event)">
                <option selected>-- Chọn tháng --</option>
                <option value="01">Tháng 1</option>
                <option value="02">Tháng 2</option>
                <option value="03">Tháng 3</option>
                <option value="04">Tháng 4</option>
                <option value="05">Tháng 5</option>
                <option value="06">Tháng 6</option>
                <option value="07">Tháng 7</option>
                <option value="08">Tháng 8</option>
                <option value="09">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
            </div>
            <div class="select is-small">
              <select id="" @change="onChange_Nam($event)">
                <option selected>-- Chọn năm --</option>
                <option value="2022">Tháng 2022</option>
                <option value="2023">Tháng 2023</option>
                <option value="2024">Tháng 2024</option>
                <option value="2025">Tháng 2025</option>
                <option value="2026">Tháng 2026</option>
                <option value="2027">Tháng 2027</option>
                <option value="2028">Tháng 2028</option>
                <option value="2029">Tháng 2029</option>
                <option value="2030">Tháng 2030</option>
                <option value="2031">Tháng 2031</option>
                <option value="2032">Tháng 2032</option>
                <option value="2033">Tháng 2033</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #fed604" class="far fa-calendar-check"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Bảng theo dõi thực hiện các Kết luận Thanh tra, Kiểm tra, Quyết
                toán tháng 10/2023</span
              >
            </div>
          </div>
          <div class="column is-3" style="text-align: right">
            <button @click="openModalAddData" class="button is-success">
              Thêm chương trình
            </button>
          </div>
        </div>
        <div class="columns" style="margin-top: 10px">
          <div class="column">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead>
                <tr style="background-color: #fdedf6">
                  <th style="text-align: center; width: 3%">STT</th>
                  <th style="text-align: center">Nội dung / Chỉ tiêu</th>
                  <th style="text-align: center; width: 10%">
                    Số nội dung phải thực hiện
                  </th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Kết quả</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
                  <th style="text-align: center; width: 6%">Cập nhật</th>
                  <th style="text-align: center; width: 6%">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in ketluantt" :key="index">
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td style="font-weight: bold">{{ item.noidung }}</td>
                  <td style="font-weight: bold; text-align: center">
                    {{ item.kehoach }}
                  </td>
                  <td style="font-weight: bold; text-align: center">
                    {{ item.kehoach - item.dathuchien }}
                  </td>
                  <td style="font-weight: bold; text-align: center">
                    {{ item.dathuchien }}
                  </td>
                  <td style="font-weight: bold; text-align: center">
                    {{
                      ((item.dathuchien / item.kehoach) * 100)
                        | formatNumberTyle
                    }}
                    %
                  </td>
                  <td style="text-align: center; vertical-align: middle">
                    <div class="column">
                      <div class="progress is-small">
                        <div
                          class="progress is-small"
                          :style="{
                            width: (item.dathuchien / item.kehoach) * 100 + '%',
                            backgroundColor: getProgressBarColor(item),
                          }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td style="text-align: center; vertical-align: middle">
                    <a @click="openModalUpdate(item)"
                      ><span class="icon is-small is-left">
                        <i
                          style="color: #48c78e"
                          class="fas fa-broom"
                        ></i> </span
                    ></a>
                  </td>
                  <td style="text-align: center; vertical-align: middle">
                    <a @click="onDelete(item)"
                      ><span class="icon is-small is-left">
                        <i
                          style="color: #f96854"
                          class="fa fa-trash"
                        ></i> </span
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal create -->
    <div :class="{ 'is-active': isActive }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content modal-card">
        <header
          class="modal-card-head"
          style="height: 10px; background-color: #48c78e"
        >
          <p class="modal-card-title">
            <span class="icon is-small is-left">
              <i
                style="color: #3850b7; font-size: medium"
                class="far fa-calendar-alt"
              ></i>
            </span>
            <span style="font-size: medium; font-weight: 600; color: white"
              >Thêm chương trình công tác</span
            >
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="isActive = false"
          ></button>
        </header>
        <section class="modal-card-body" style="">
          <div class="field">
            <label class="label">Nội dung / Chỉ tiêu</label>
            <div class="control">
              <input
                v-model="form_Add_Data.noidung"
                class="input"
                type="text"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Kế hoạch giao (Đầu việc)</label>
            <div class="control">
              <input
                v-model="form_Add_Data.kehoach"
                class="input"
                type="number"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Đã thực hiện</label>
            <div class="control">
              <input
                v-model="form_Add_Data.dathuchien"
                class="input"
                type="number"
              />
            </div>
          </div>

          <!-- <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
          </div> -->
          <br />
          <div>
            <div class="control">
              <button @click="onAdd" class="button is-danger is-fullwidth">
                Thêm chương trình
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- modal update -->
    <div :class="{ 'is-active': isActive_update }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content modal-card">
        <header
          class="modal-card-head"
          style="height: 10px; background-color: #48c78e"
        >
          <p class="modal-card-title">
            <span class="icon is-small is-left">
              <i
                style="color: #3850b7; font-size: medium"
                class="far fa-calendar-alt"
              ></i>
            </span>
            <span style="font-size: medium; font-weight: 600; color: white"
              >Cập nhật chương trình công tác</span
            >
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="isActive_update = false"
          ></button>
        </header>
        <section class="modal-card-body" style="">
          <template v-if="child_Data != null">
            <div class="field">
              <label class="label">Nội dung / Chỉ tiêu</label>
              <div class="control">
                <input v-model="child_Data.noidung" class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Kế hoạch giao (Đầu việc)</label>
              <div class="control">
                <input
                  v-model="child_Data.kehoach"
                  class="input"
                  type="number"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Đã thực hiện</label>
              <div class="control">
                <input
                  v-model="child_Data.dathuchien"
                  class="input"
                  type="number"
                />
              </div>
            </div>

            <!-- <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
          </div> -->
            <br />
            <div>
              <div class="control">
                <button @click="onUpdate" class="button is-danger is-fullwidth">
                  Cập nhật chương trình
                </button>
              </div>
            </div>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  layout: "quantri",
  data() {
    return {
      form_Add_Data: {
        _id: null,
        noidung: "",
        kehoach: "",
        dathuchien: "",
        malinhvuc: "4",
        linhvuc: "Thực hiện Kết luận Thanh tra, Quyết toán",
        createdAt: null,
      },
      form_Update_Data: null,
      child_Data: null,
      thang: "",
      nam: "",
      isActive: false,
      isActive_update: false,
    };
  },

  mounted() {
    this.currentDateTime();
  },

  computed: {
    ...mapState("modules/linhvuc4", ["ketluantt"]),
  },

  created() {
    this.getKetluantt(); // Gọi action để lấy dữ liệu từ Vuex
  },

  methods: {
    ...mapActions("modules/linhvuc4", ["getKetluantt"]),

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
      this.form_Add_Data.createdAt = date + " " + time;
    },

    openModalAddData() {
      this.isActive = true;
    },

    getProgressBarColor(item) {
      const progressPercentage = (item.dathuchien / item.kehoach) * 100;
      if (progressPercentage > 80) {
        return "green";
      } else if (progressPercentage < 50) {
        return "red";
      } else {
        return "yellow";
      }
    },

    onChange_Thang(e) {
      var id = e.target.value;
      this.thang = id;
    },

    async onChange_Nam(e) {
      var id = e.target.value;
      this.nam = id;
      //   console.log(this.thang);
      //   console.log(this.nam);
      // cập nhật thông tin tháng năm vào db
      const data = {
        thang: this.thang,
        nam: this.nam,
      };
      const response = await this.$axios.patch(
        `chuongtrinhct/thangnam/1`,
        data
      );
      //   console.log(response.data.success);
      if (response.data.success == true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `Đã cập nhật ngày tháng kế hoạch`,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Lỗi! Không cập nhật được`,
        });
      }
    },

    async onAdd() {
      //   console.log(this.form_Add_Data);
      const data = this.form_Add_Data;
      //   console.log(data);
      const response = await this.$store.dispatch(
        "modules/linhvuc4/createChuongtrinhct",
        data
      );
      if (response.success == true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `Đã thêm`,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Lỗi! Không thêm được`,
        });
      }
    },

    async openModalUpdate(data) {
      this.form_Update_Data = null;
      this.child_Data = null;
      this.isActive_update = true;
      this.form_Update_Data = data;
      this.child_Data = { ...data };
      //   console.log(this.form_Update_Data);
    },

    async onUpdate() {
      const result = await Swal.fire({
        title: `Bạn có muốn cập nhật dữ liệu?`,
        showDenyButton: true,
        confirmButtonText: "Có, Cập nhật",
        denyButtonText: `Hủy cập nhật`,
      });
      if (result.isConfirmed) {
        try {
          const data = {
            noidung: this.child_Data.noidung,
            kehoach: this.child_Data.kehoach,
            dathuchien: this.child_Data.dathuchien,
          };

          const payload = {
            data: data,
            _id: this.child_Data._id,
          };

          // cập nhật dữ liệu
          const response = await this.$store.dispatch(
            "modules/linhvuc4/updateChuongtrinhct",
            payload
          );

          if (response.success == true) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Cập nhật thành công",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Có lỗi xảy ra`,
            });
          }
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    // delete user
    async onDelete(data) {
      const result = await Swal.fire({
        title: `Bạn có muốn xóa?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy xóa`,
      });
      if (result.isConfirmed) {
        try {
          const response = await this.$store.dispatch(
            "modules/linhvuc4/deleteChuongtrinhct",
            data
          );
          if (response.success == true) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: `Đã xóa`,
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Có lỗi xảy ra`,
            });
          }
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      } else if (result.isDenied) {
        Swal.fire(`Bạn đã hủy xóa`);
      }
    },
  },
};
</script>

<style scoped>
.progress-bar {
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-green {
  color: green;
}

.progress-red {
  color: red;
}

.progress-yellow {
  color: yellow;
}
</style>
