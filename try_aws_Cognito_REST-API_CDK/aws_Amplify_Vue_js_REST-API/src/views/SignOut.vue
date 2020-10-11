<template>
  <div/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cognito from '@aws-amplify/auth';

@Component({
  name: 'SignOut',
})
export default class SignOut extends Vue {

  private mounted() {

    Cognito.signOut()
      .then( (user: any) => {
        this.$router.replace('/signin');
      })
      .catch( (reason: any) => {
        this.$router.replace('/');
      } );
  }
}
</script>

<style scoped>
</style>
