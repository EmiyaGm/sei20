<script setup lang="ts">
</script>

<template>
  <div style="width: 100%">
    <div class="container">
      <h2 class="firstText">SEI-20</h2>
      <h2 class="lastText">SEI-20</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 200px;
  display: flex;
  flex: 1;
  position: relative;

  @mixin text {
    position: absolute;
    top: calc(50% + 20px);
    left: 50%;
    font-size: 11vw;
    font-weight: 600;
    transform: translate(-50%, -50%);
  }

  .firstText {
    @include text;
    color: transparent;
    -webkit-text-stroke: 1px #03a9f4;
  }

  .lastText {
    @include text;
    color: #03a9f4;
    animation: wave 3s ease-in-out infinite;
  }

  @keyframes wave {

    0%,
    100% {
      clip-path: polygon(0% 47%,
          10% 48%,
          28% 54%,
          54% 50%,
          50% 61%,
          84% 59%,
          100% 52%,
          100% 100%,
          0% 100%);
    }

    50% {
      clip-path: polygon(0% 60%,
          16% 65%,
          34% 66%,
          51% 62%,
          67% 50%,
          84% 45%,
          100% 46%,
          100% 100%,
          0% 100%);
    }
  }
}
</style>