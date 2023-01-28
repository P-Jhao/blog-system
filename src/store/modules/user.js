import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    user: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar =
  //     "/static/upload/2023-1-26-14-13-11-463-0c666.jpg";
  // },
  SET_USER: (state, payload) => {
    state.user = payload;
    state.avatar = "/static/upload/2023-1-26-14-13-11-463-0c666.jpg";
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    //userInfo为用户提交的数据
    // login(userInfo).then((r) => console.log(r));
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res) => {
          console.log(res);
          const { data } = res;
          if (data) {
            commit("SET_USER", data);
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });

    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        if (typeof res === "string") {
          //未登录或登录过期
          res = JSON.parse(res);
          if (res.code === 401) reject(res.msg);
        } else {
          commit("SET_USER", res);
          resolve();
        }
      });

      // getInfo(state.token)
      //   .then((response) => {
      //     const { data } = response;

      //     if (!data) {
      //       return reject("Verification failed, please Login again.");
      //     }

      //     const { name, avatar } = data;

      //     commit("SET_NAME", name);
      //     commit("SET_AVATAR", avatar);
      //     resolve(data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      commit("RESET_STATE");
      resetRouter();
      resolve();

      // logout(state.token)
      //   .then(() => {
      //     removeToken(); // must remove  token  first
      //     resetRouter();
      //     commit("RESET_STATE");
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
