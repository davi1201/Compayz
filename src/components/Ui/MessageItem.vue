<template>
  <div class="mb-4" :class="{ 'd-flex justify-content-end': type === 'answer'}">
    <b-avatar src="https://avatars.githubusercontent.com/u/17195933?v=4" v-if="type === 'question'" />
    <div class="balon" :class="`${type}`">
      <div v-if="loading">
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
      </div>
      <div>
        {{ message  }}
      </div>
    </div>
    <b-avatar v-if="type === 'answer'" src="https://img.freepik.com/fotos-premium/robo-malvado-em-retrato-de-avatar-de-visao-frontal-de-terno-de-negocios-sobre-mini_124717-1735.jpg?w=2000" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageItem',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style>
  .balon {
    padding: 10px 30px;
    border-radius: 16px;
    display: inline-block;
    max-width: 400px;
  }
  .question {
    margin-left: 10px;
    background: #38b8f3;
  }
  .answer {
    background: #f3b938;
    margin-right: 10px;
  }
</style>
