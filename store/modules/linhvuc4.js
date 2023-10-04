export const state = () => ({
  ketluantt: [],
});

export const getters = {
  getChuongtrinhct: (state) => {
    return state.ketluantt;
  },
};

export const mutations = {
  setChuongtrinhct(state, ketluantt) {
    state.ketluantt = ketluantt;
  },
};

export const actions = {
  // Get all data
  async getKetluantt({ commit }) {
    try {
      // Gọi API để lấy danh sách người dùng
      const response = await this.$axios.get("/api/chuongtrinhct/linhvuc4");
      // console.log(response);
      // Lưu trữ vào store
      commit("setChuongtrinhct", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  // Add new data
  async createChuongtrinhct({ commit }, data) {
    try {
      // console.log(data);
      const response = await this.$axios.post(
        "/api/chuongtrinhct/addlinhvuc",
        data
      );
      // console.log(response);
      if (response.status == 200) {
        const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc4");
        commit("setChuongtrinhct", reload.data);
        return {
          success: true,
          message: "Created success !",
        };
      } else {
        return {
          success: false,
          message: "Create false !",
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update data
  async updateChuongtrinhct({ commit }, payload) {
    try {
      // console.log(payload.data);
      const response = await this.$axios.patch(
        `/api/chuongtrinhct/linhvuc/${payload._id}`,
        payload.data
      );
      // console.log(response);
      if (response.status == 200) {
        const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc4");
        commit("setChuongtrinhct", reload.data);
        return {
          success: true,
          message: "Update success !",
        };
      } else {
        return {
          success: false,
          message: "Update false !",
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete data
  async deleteChuongtrinhct({ commit }, chuongtrinhct) {
    try {
      const response = await this.$axios.delete(
        `/api/chuongtrinhct/linhvuc/${chuongtrinhct._id}`
      );
      // console.log(response);
      if (response.status == 200) {
        const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc4");
        commit("setChuongtrinhct", reload.data);
        return {
          success: true,
          message: "Deleted success !",
        };
      } else {
        return {
          success: false,
          message: "Delete false !",
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
