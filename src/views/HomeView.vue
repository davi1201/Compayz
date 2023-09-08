<template>
  <b-container class="mt-5">
    <b-row>
      <b-col lg="12" xs="4">
        <b-form v-on:submit.prevent="getData">
          <b-form-group>
            <b-input
              size="lg"
              placeholder="Fala comigo"
              v-model="message"
            />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <b-row class="mt-5" id="chatContent" ref="chatContent">
      <b-row>
        <b-col cols="12">
        <MessageItem
          v-for="(item, index) in chat" :key="index"
          :message="item.message"
          :type="item.type"
          :loading="item.loading"
        />
        </b-col>
      </b-row>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import apiService from '../api';
import MessageItem from '../components/Ui/MessageItem.vue';

declare interface HomeViewState {
  message: string;
  loading: boolean;
}
export default Vue.extend({
  name: 'HomeView',
  components: {
    MessageItem,
  },
  data(): HomeViewState {
    return {
      message: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['chat']),
  },
  methods: {
    ...mapActions(['setChat']),
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContent as HTMLElement;
        container.scrollTop = container.scrollHeight;
      });
    },
    async getData() {
      if (!this.message) return;
      this.scrollToBottom();
      this.setChat(
        {
          message: this.message,
          type: 'question',
          loading: false,
        },
      );

      this.setChat(
        {
          message: '',
          type: 'answer',
          loading: true,
        },
      );

      this.loading = true;
      this.message = '';

      try {
        const { data } = await apiService.post('/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: this.message,
            },
          ],
        });

        this.loading = false;

        this.setChat(
          {
            message: data.choices[0].message.content,
            type: 'answer',
            created: data.created,
            loading: false,
          },
        );
        this.$forceUpdate();
        this.scrollToBottom();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  created() {
    // this.getData();
  },
});
</script>

<style lang="css">
  #chatContent{
    height: 550px;
    overflow-y: scroll;
  }

  #chatContent::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  #chatContent::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
</style>
