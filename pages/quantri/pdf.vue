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
                <i style="color: #fed604" class="fas fa-angle-double-up"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Đẩy File theo dõi tháng 10/2023</span
              >
            </div>
          </div>
        </div>
        <div class="columns" style="margin-top: 10px">
          <div class="column">
            <div class="file has-name is-boxed">
              <label class="file-label">
                <input
                  @change="onFileSelected"
                  class="file-input"
                  type="file"
                  name="resume"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Chọn File</span>
                </span>
                <span class="file-name">
                  {{ fileName }}
                </span>
              </label>
            </div>
            <div style="margin-top: 5px">
              <button @click="onUploadFile" class="button is-success">
                Tải File lên
              </button>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div v-if="url" class="box" id="preview">
                <img :src="url" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  layout: "quantri",
  data() {
    return {
      fileName: "",
      selectedFile: null,
      url: null,
    };
  },

  methods: {
    // lấy tên file
    onFileSelected(event) {
      this.fileName = event.target.files[0];
      // console.log(this.dataAddForm.selectedFile);
      this.url = URL.createObjectURL(this.fileName);
      // console.log(this.url);
      this.fileName = event.target.files[0].name;
      this.selectedFile = event.target.files[0];
    },

    async onUploadFile() {
      let data = new FormData();
      data.append("urlfile", this.selectedFile, this.selectedFile.name);

      const response = await this.$axios.post(
        "/api/chuongtrinhct/uploadfile",
        data
      );

      // console.log(response);
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
          title: `Đã cập nhật`,
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
    },
  },
};
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 150px;
  max-height: 150px;
}
</style>
