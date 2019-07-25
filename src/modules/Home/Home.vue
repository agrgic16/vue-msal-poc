<template>
  <v-layout column>
    <v-flex xs10 sm2 offset-sm5>
      <v-card
          >
        <v-img
          class="image"
          src="https://media.licdn.com/dms/image/C4D0BAQGe0QkrWz6VIQ/company-logo_200_200/0?e=2159024400&v=beta&t=E8D4ycI_q4_cr9qGS88OWyZ8diZcgV0PtbqsNpz2nOE"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Career Paths Project</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn text color="blue">Button</v-btn>
          <v-btn text color="blue">Button</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-card>
      <pre>
        <code>{{userInfo}}</code>
      </pre>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import { Route } from 'vue-router';

import store, { Mutations } from '@/modules/Home/store';

@Component<Home>({
  components: {
  },
  store,
  computed: {
    ...mapGetters(['isLoggedIn', 'isLoading', 'isError', 'userInfo']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
  },
})
export default class Home extends Vue {
  isLoggedIn!: boolean;

  isLoading!: boolean;

  isError!: boolean;

  userInfo!: any;

  getUserInfo!: () => void;

  created() {
    this.getUserInfo();
  }
}
</script>

<style lang="scss">
  .image {
    height: 280px;
  }
</style>
