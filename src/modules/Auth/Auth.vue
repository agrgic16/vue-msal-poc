<template>
  <v-flex>
    <slot v-if="isLoggedIn"></slot>
    <span v-if="isError && !isLoading">Error logging you in!</span>
    <span v-if="isLoading && !isError">Logging you in...</span>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';

import { Route } from 'vue-router';
import store, { Mutations } from '@/modules/Auth/store';
import authService, { AuthService } from '@/core/services/auth.service';

@Component<Auth>({
  components: {},
  store,
  computed: {
    ...mapGetters(['isLoggedIn', 'isLoading', 'isError']),
  },
  methods: {
    ...mapActions(['login']),
  },
})
export default class Auth extends Vue {
  authService!: AuthService;

  isLoggedIn!: boolean;

  isLoading!: boolean;

  isError!: boolean;

  login!: () => void;

  beforeCreate() {
    this.authService = authService;
  }

  mounted() {
    if (!this.isLoggedIn && !this.authService.instance.getLoginInProgress()) {
      this.login();
    }
  }
}
</script>

<style lang="scss">
</style>
