<template>
  <nav
    class="navbar is-transparent is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            style="opacity: 0.5"
            src="@/assets/image/logo_toanluc.png"
            width="118"
            height="32"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpen }"
        id="navbarMenu"
      >
        <div class="navbar-start">
          <div
            class="navbar-item has-dropdown"
            :class="{ 'is-active': isDropdownOpen }"
          >
            <a class="navbar-link" @click="toggleDropdown">
              <span style="color: #3850b7" class="icon is-small is-left">
                <i class="fas fa-layer-group"></i>
              </span>
              &ensp; Danh mục
            </a>
            <div class="navbar-dropdown is-boxed" v-show="isDropdownOpen">
              <nav-link
                class="navbar-item"
                to="/danhmuc/phongban/"
                @click="closeMenu"
                :class="{ 'is-active': activeMenu === 'phongban' }"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-fax"></i>
                </span>
                &ensp; Phòng ban
              </nav-link>
              <a
                class="navbar-item"
                href="/danhmuc/phanxuong/"
                @click="closeMenu"
                :class="{ 'is-active': activeMenu === 'phanxuong' }"
              >
                <span style="color: #3850b7" class="icon is-small is-left">
                  <i class="fas fa-gavel"></i>
                </span>
                &ensp; Phân xưởng
              </a>
            </div>
          </div>

          <a class="navbar-item" href="#"> About </a>
          <a class="navbar-item" href="#"> Contact </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      activeMenu: "", // Thêm thuộc tính activeMenu để lưu trạng thái menu đang được sử dụng
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    closeMenu() {
      this.isMenuOpen = false;
    },

    setActiveMenu(menu) {
      this.activeMenu = menu;
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
.navbar-item a.is-active {
  text-decoration: underline;
  background-color: beige;
  /* Thêm các thuộc tính khác cho đoạn gạch chân tùy theo yêu cầu của bạn */
}
</style>
