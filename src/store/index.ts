import Vue from 'vue';
import Vuex from 'vuex';
import { ChatHistoryProps, ChatItem } from '@/types/chatTypes';

Vue.use(Vuex);
declare interface State {
  chatsHistoric: ChatHistoryProps[];
  chat: ChatItem[];
}

export default new Vuex.Store({
  state: (): State => ({
    chatsHistoric: [
      // {
      //   id: '1',
      //   title: 'OpenAI',
      //   chat: [],
      //   created: new Date().getTime(),
      // },
    ],
    chat: [
      // {
      //   message: 'Quero saber mais sobre a OpenAI',
      //   type: 'question',
      // },
      // {
      //   message: 'Olá, eu sou o chatbot da OpenAI, como posso te ajudar?',
      //   type: 'answer',
      // },
    ],
  }),
  getters: {
    chatsHistoric: (state) => state.chatsHistoric,
    chat: (state) => state.chat,
  },
  mutations: {
    SET_CHATS_HISTORIC(state, payload: ChatHistoryProps) {
      const index = state.chatsHistoric.findIndex((item) => item.id === payload.id);

      if (index !== -1) {
        state.chatsHistoric[index] = payload;
        return;
      }

      state.chatsHistoric.push(payload);
    },
    SET_CHAT(state, payload: ChatItem) {
      if (payload.type === 'answer' && !payload.loading) {
        state.chat[state.chat.length - 1] = payload;
        return;
      }
      state.chat.push(payload);
    },
    RESTORE_CHAT(state, payload: ChatItem[]) {
      state.chat = payload;
    },
    NEW_CHAT(state) {
      state.chat = [];
    },
  },
  actions: {
    setChatsHistoric({ commit }, payload: ChatHistoryProps) {
      commit('NEW_CHAT');
      commit('SET_CHATS_HISTORIC', payload);
    },
    setChat({ commit }, payload: ChatItem) {
      commit('SET_CHAT', payload);
    },
    restoreChat({ commit }, payload: ChatItem[]) {
      commit('RESTORE_CHAT', payload);
    },
  },
  modules: {
  },
});
