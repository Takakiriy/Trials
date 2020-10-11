<template>
  <div class="home" v-if="signedIn">
    <a href="/signout">SignOut</a><br/>
    <div><a id="webAPIURL"   v-bind:href="webAPIURL">{{ webAPIURL }}</a></div>
    <div><a id="webAPIURLMy" v-bind:href="webAPIURLMy">{{ webAPIURLMy }}</a></div>
    <div><button id="withToken"    @click.prevent="get('/')">/ with security token</button></div>
    <div><button id="myWithToken"  @click.prevent="get('/My')">/My with security token</button></div>
    <p><div>Response Body: {{ responseBody }}</div></p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cognito, { CognitoUser } from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import { AmplifyConfig } from '../aws-config';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private signedIn: boolean = false;
  private responseBody: string = '';

  private webAPIURL: string = AmplifyConfig.API.endpoints[0].endpoint;
  private webAPIURLMy: string = AmplifyConfig.API.endpoints[0].endpoint + '/My';

  private mounted() {

    Cognito.currentUserPoolUser()
      .then( (user: CognitoUser) => {
        this.signedIn = true;
      })
      .catch( (resason: any) => {
        this.signedIn = false;
        this.$router.replace('/signin');
      });
  }

  private get(relativePath: string) {

    API.get('TryingAPIGateway', relativePath, {})
      .then( (response: any) => {
        this.responseBody = response;
      })
      .catch( (error: any) => {
        this.responseBody = 'error';
      });
  }
}
</script>
