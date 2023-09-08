<template>
  <div id="app">
    <b-row>
        <b-col cols="3">
          <b-sidebar
            id="sidebar-1"
            shadow
            visible
            bg-variant="dark"
            text-variant="light"
            no-close-on-route-change
            no-close-on-backdrop
            no-header-close
          >
          <b-row>
            <b-col cols="12" class="px-5">
              <b-button
                variant="outline-warning"
                class="w-100"
                @click="createNewChat"
              >
                <i class="fas fa-comment-dots"></i> Novo chat
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col cols="12">
              <ul class="list-unstyled" v-if="chatsHistoric.length > 0">
                <li
                  v-for="(item, index) in chatsHistoric"
                  :key="index"
                  class="historic-item px-5 py-2"
                  :class="{'active': activeChat.id === item.id}"
                >
                <button @click="restoreChat(item.chat); setChatItem(item)">
                  <div class="link mt-2">
                    <div>
                      <i class="far fa-comments"></i>
                      {{ item.title }}
                    </div>
                    <span>
                      {{ item.created | formatDate }}
                    </span>
                  </div>
                </button>
                </li>
              </ul>
            </b-col>
          </b-row>
          </b-sidebar>
        </b-col>
        <b-col lg="6" offset="1">
          <router-view/>
        </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { mapActions, mapGetters } from 'vuex';
import { ChatHistoryProps } from './types/chatTypes';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      activeChat: {} as ChatHistoryProps,
    };
  },
  computed: {
    ...mapGetters(['chat', 'chatsHistoric']),
  },
  methods: {
    ...mapActions(['setChatsHistoric', 'restoreChat']),
    createNewChat() {
      if (this.chat.length === 0) return;
      this.setChatsHistoric({
        chat: this.chat,
        title: 'Novo chat',
        created: new Date().getTime(),
        id: this.activeChat.id || uuidv4(),
      });

      this.activeChat = {
        chat: [],
        title: '',
        created: '',
        id: '',
      };
    },
    setChatItem(item: ChatHistoryProps) {
      this.activeChat = item;
    },
  },
});
</script>
<style>
  body, html, #app {
    background-color: #1f1e1e;
    color: #fff;
    overflow-x: hidden;
  }
  .historic-item {
    display: flex;
    align-items: center;
  }
  .historic-item button {
    width: 100%;
    background: transparent;
    border: none;
    text-align: left;
    color: inherit;
    font-size: 18px;
  }
  .historic-item:hover {
    cursor: pointer;
    background: #1f1e1e;
  }

  .active {
    background: #1f1e1e;
  }

  .date {
    color: aquamarine;
    font-size: 12px;
    font-weight: bold;
  }

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .link span {
    color: #02f0b4;
    font-size: 12px;
  }
</style>
