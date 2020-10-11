<template>
  <div>
    <amplify-authenticator v-bind:authConfig="authConfig"/>
    <p>
    Region: <span id="region">{{ region }}</span><br/>
    UserPoolId: <span id="userPoolId">{{ userPoolId }}</span><br/>
    UserPoolWebClientId: <span id="userPoolWebClientId">{{ userPoolWebClientId }}</span><br/>
    </p><p>
    aws-config.ts ファイルに書かれたユーザープールなどのIDは、<br/>
    ./deploy.sh make-config コマンドで更新されます。<br/>
    または、Amazon Cloud Formation の [ リソース ] タグで表示されるIDや、<br/>
    API Gateway の [ ステージ >> Prod ] で表示されるURLに合わせてください<br/>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cognito, { CognitoUser } from '@aws-amplify/auth';
import { Logger } from '@aws-amplify/core';
// @ts-ignore
import { AmplifyEventBus } from 'aws-amplify-vue';

import { AmplifyConfig } from '../aws-config';

@Component({
  name: 'SignInSignUp',
})
export default class SignInSignUp extends Vue {
  private authConfig = {
    signUpConfig: {
      hiddenDefaults: ['phone_number'],
    },
    // signInConfig: {},
  };

  private region: string = AmplifyConfig.Auth.region;
  private userPoolId: string = AmplifyConfig.Auth.userPoolId;
  private userPoolWebClientId: string = AmplifyConfig.Auth.userPoolWebClientId;

  private mounted() {

    Cognito.currentUserPoolUser()
      .then( (user: CognitoUser) => {
        this.$router.replace('/');
      });

    AmplifyEventBus.$on('authState', async (state: string) => {
      const logger = new Logger('SignInLogger', 'INFO');
      if (state === 'signUp') {
        logger.log('Changed to the sign up form.');
      } else if (state === 'signIn') {
        logger.log('Changed to the sign in form.');
      } else if (state === 'confirmSignUp') {
        logger.log('Success to sign up and changed to the sign in form.');
      } else if (state === 'signedIn') {
        this.$router.replace('/');
      } else {
        logger.log(state);
      }
    });
  }
}
</script>

<style scoped>
</style>
