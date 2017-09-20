import {{{ lc }}}Fetch from '../../../api/{{{ lc }}}Fetch';
import {
  {{{ uc }}}_CREATE_ERROR,
  {{{ uc }}}_CREATE_LOADING,
  {{{ uc }}}_CREATE_SUCCESS,
  {{{ uc }}}_CREATE_VIOLATIONS,
  {{{ uc }}}_CREATE_RESET
} from './mutation-types';

const state = {
  loading: false,
  error: '',
  created: null
};

function error(error) {
  return {type: {{{ uc }}}_CREATE_ERROR, error};
}

function loading(loading) {
  return {type: {{{ uc }}}_CREATE_LOADING, loading};
}

function success(created) {
  return {type: {{{ uc }}}_CREATE_SUCCESS, created};
}

function violations(violations) {
  return {type: {{{ uc }}}_CREATE_VIOLATIONS, violations};
}

function reset() {
  return {type: {{{ uc }}}_CREATE_RESET};
}

const getters = {
  created: state => state.created,
  error: state => state.error,
  loading: state => state.loading,
  violations: state => state.violations,
};

const actions = {
  create({ dispatch }, values) {
    dispatch(loading(true));

    return {{{ lc }}}Fetch('/{{{ name }}}', {method: 'POST', body: JSON.stringify(values)})
      .then(response => {
        dispatch(loading(false));

        return response.json();
      })
      .then(data => {
        dispatch(success(data));
      })
      .catch(e => {
        dispatch(loading(false));

        if (e instanceof SubmissionError) {
          dispatch(violations(e.errors));
          dispatch(error(e.errors._error));
          return;
        }

        dispatch(error(e.message));
      });
  },
  reset({ dispatch }) {
    dispatch(reset());
  }
};

const mutations = {
    [{{{ uc }}}_CREATE_ERROR] (state, payload) {
      state.error = payload.error;
    },
    [{{{ uc }}}_CREATE_LOADING] (state, payload) {
      state.loading = payload.loading;
    },
    [{{{ uc }}}_CREATE_SUCCESS] (state, payload) {
      state.created = payload.created;
    },
    [{{{ uc }}}_CREATE_VIOLATIONS] (state, payload) {
      state.violations = payload.violations;
    },
    [{{{ uc }}}_CREATE_RESET] (state) {
      state.loading = false;
      state.error = '';
      state.created = null;
      state.violations = null;
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
