<template>
  <div class="columns">
    <div class="column">
      <div
        class="column is-pulled-right"
        style="margin-top: -35px; padding-right: 20px"
      >
        <span class="clock">{{ formatTime(countdown) }}</span>
      </div>
      <!-- Kế hoạch công việc -->
      <div v-show="activeDiv === 1" class="box" style="margin: 20px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #fed604" class="far fa-calendar-check"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Bảng theo dõi thực hiện nhiệm vụ tháng {{ thangnam.thang }}/{{
                  thangnam.nam
                }}</span
              >
            </div>
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
                    Kế hoạch giao (Đầu việc)
                  </th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Đã thực hiện</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in chuongtrinhct" :key="index">
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Phát triển đối tượng -->
      <div v-show="activeDiv === 2" class="box" style="margin: 20px">
        <!-- <div class="columns">
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
        </div>
        <hr /> -->
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #fed604" class="fas fa-male"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Bảng theo dõi thực hiện các chỉ tiêu Thu, Phát triển đối tượng
                tháng {{ thangnam.thang }}/{{ thangnam.nam }}</span
              >
            </div>
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
                    Kế hoạch giao (Đầu việc)
                  </th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Đã thực hiện</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in phattriendoituong" :key="index">
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td style="font-weight: bold">{{ item.noidung }}</td>
                  <template v-if="item.istyle == false">
                    <td style="font-weight: bold; text-align: center">
                      {{ item.kehoach | formatNumber }}
                    </td>
                  </template>
                  <template v-else>
                    <td style="font-weight: bold; text-align: center">
                      {{ item.kehoach | formatNumberTyleGiao }} %
                    </td>
                  </template>
                  <template v-if="item.istyle == false">
                    <td style="font-weight: bold; text-align: center">
                      {{ (item.kehoach - item.dathuchien) | formatNumber }}
                    </td>
                  </template>
                  <template v-else>
                    <td style="font-weight: bold; text-align: center">
                      {{
                        (item.kehoach - item.dathuchien) | formatNumberTyleGiao
                      }}
                      %
                    </td>
                  </template>
                  <template v-if="item.istyle == false">
                    <td style="font-weight: bold; text-align: center">
                      {{ item.dathuchien | formatNumber }}
                    </td>
                  </template>
                  <template v-else>
                    <td style="font-weight: bold; text-align: center">
                      {{ item.dathuchien | formatNumberTyleGiao }} %
                    </td>
                  </template>

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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Đôn đốc tái tục BHXH TN -->
      <div v-show="activeDiv === 3" class="box" style="margin: 20px">
        <!-- <div class="columns">
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
        </div>
        <hr /> -->
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #fed604" class="fas fa-directions"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Bảng theo dõi thực hiện Đôn đốc thu BHXH tự nguyện - Tái tục
                {{ thangnam.thang }}/{{ thangnam.nam }}</span
              >
            </div>
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
                  <th style="text-align: center">Địa bàn</th>
                  <th style="text-align: center; width: 10%">Chỉ tiêu giao</th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Kết quả</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dondocthutaituc.slice(0, 11)"
                  :key="index"
                >
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
                </tr>
              </tbody>
            </table>
          </div>
          <div class="column">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead>
                <tr style="background-color: #fdedf6">
                  <th style="text-align: center; width: 3%">STT</th>
                  <th style="text-align: center">Địa bàn</th>
                  <th style="text-align: center; width: 10%">Chỉ tiêu giao</th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Kết quả</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dondocthutaituc.slice(11, 22)"
                  :key="index"
                >
                  <td style="text-align: center">{{ index + 12 }}</td>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Đôn đốc thực hiện kế hoạch thanh tra -->
      <div v-show="activeDiv === 4" class="box" style="margin: 20px">
        <!-- <div class="columns">
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
        </div>
        <hr /> -->
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #fed604" class="fas fa-feather-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Bảng theo dõi thực hiện các Kết luận Thanh tra, Kiểm tra, Quyết
                toán tháng {{ thangnam.thang }}/{{ thangnam.nam }}</span
              >
            </div>
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
                    Kế hoạch giao (Đầu việc)
                  </th>
                  <th style="text-align: center; width: 10%">Đang thực hiện</th>
                  <th style="text-align: center; width: 10%">Đã thực hiện</th>
                  <th style="text-align: center; width: 10%">Tỷ lệ</th>
                  <th style="text-align: center">Tiến độ hoàn thành</th>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Đôn đốc thực hiện kế hoạch thanh tra -->
      <div
        v-show="activeDiv === 5"
        class=""
        style="margin: 20px; text-align: center"
      >
        <img src="http://10.42.240.200:8080/bhtn.jpg" width="850" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import pdf from "vue-pdf";
// import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
export default {
  auth: "guest",
  components: {
    // pdf,
    // VuePdfEmbed,
  },
  data() {
    return {
      data: [],
      thangnam: {
        thang: "",
        nam: "",
      },
      activeDiv: 1,
      countdown: 5,
    };
  },

  mounted() {
    this.getThangnam();

    setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.activeDiv = (this.activeDiv % 5) + 1;
        this.countdown = 5; // Đặt lại thời gian đếm ngược thành 10 phút (10 * 60 giây)
      }
    }, 1000); // Mỗi giây
  },

  computed: {
    ...mapState("modules/linhvuc1", ["chuongtrinhct"]),
    ...mapState("modules/linhvuc2", ["phattriendoituong"]),
    ...mapState("modules/linhvuc3", ["dondocthutaituc"]),
    ...mapState("modules/linhvuc4", ["ketluantt"]),
  },

  created() {
    this.getChuongtrinhct(); // Gọi action để lấy dữ liệu từ Vuex
    this.getPhattriendoituong();
    this.getDondocthutaituc();
    this.getKetluantt();
  },

  methods: {
    ...mapActions("modules/linhvuc1", ["getChuongtrinhct"]),
    ...mapActions("modules/linhvuc2", ["getPhattriendoituong"]),
    ...mapActions("modules/linhvuc3", ["getDondocthutaituc"]),
    ...mapActions("modules/linhvuc4", ["getKetluantt"]),

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    },

    async getThangnam() {
      const thangnam = await this.$axios.get(`/api/chuongtrinhct/thangnam`);
      // console.log(thangnam.data[0]);
      this.thangnam = thangnam.data[0];
      // console.log(this.thangnam.thang);
      // console.log(this.thangnam.nam);
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

.clock {
  color: white;
  font-weight: bold;
  font-size: 30px;
}
</style>
