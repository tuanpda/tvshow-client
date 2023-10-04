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
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: "default",
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
