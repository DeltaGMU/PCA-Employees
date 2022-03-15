import axios from "axios";

const state = {
  name: null,
};

const getters = {
    StateName: (state) => state.name,
};

const actions = {
    async GetName(context) {
      let headers = {
        headers: {'Authorization': 'Bearer '+context.rootState.auth.user.token}
      }
      await axios.get("api/v1/me", headers).then(
        resp => {
          context.commit("setName", resp.data.data.user);
          // console.log(resp.data.data.user);
        }
      );
    },
};
  
const mutations = {
    setName(state, name) {
      state.name = name;
    },
};
  
export default {
    state,
    getters,
    actions,
    mutations,
};