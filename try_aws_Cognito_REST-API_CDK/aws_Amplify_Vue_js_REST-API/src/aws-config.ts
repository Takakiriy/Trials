import { I18n, ConsoleLogger as Logger } from '@aws-amplify/core';
import Auth, { AuthClass } from '@aws-amplify/auth';

export const AmplifyConfig = {
    Auth: {

        // Amazon Cognito Region
        region: 'ap-northeast-1',

        // Amazon Cognito User Pool ID
        // User pool ID is diaplayed on the "Resource" tag in Amazon Cloud Formation
        userPoolId: 'ap-northeast-1_dMcehQcHd',

        // Amazon Cognito Web Client ID
        // User pool ID is diaplayed on the "Resource" tag in Amazon Cloud Formation
        userPoolWebClientId: '2qev13ii66t9n090vl5n5snnsq',

        // Access token storage
        cookieStorage__not_used: {
            domain: 'localhost',
            path: '/',
            expires: 365,  // days
            secure: false,  // requires a secure protocol (https)
        },
    },
    API: {
        endpoints: [
            {
                name: 'TryingAPIGateway',
                endpoint: 'https://glvr507n0j.execute-api.ap-northeast-1.amazonaws.com/prod',
                region: 'ap-northeast-1',
                custom_header: async () => {
                    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
                    return { Authorization: token };
                },
            },
        ],
    },
};

export const AmplifyModules = {
    Auth,
    AuthClass,
    I18n,
    Logger,
};

export const AmplifyVocabularies = {
    ja: {
        'Sign in to your account': 'ログイン',
        'Username': 'ユーザー名',
        'Enter your Username': 'ユーザー名またはメールアドレス',
        'Password': 'パスワード',
        'Enter your password': 'パスワード',
        'Forget your password? ': 'パスワードをお忘れですか？',
        'Reset password': '再設定へ',
        'No account? ': '初めてですか？',
        'Create account': 'アカウント作成',
        'Sign In': 'ログイン',

        'Reset your password': 'パスワードの再設定',
        'Code': 'コード',
        'New Password': '新しいパスワード',
        'Send Code': 'コード送信',
        'Submit': '確定',
        'Back to Sign In': 'ログインへ戻る',
        'Resend Code': 'コード再送信',

        'Create a new account': 'アカウント作成',
        'Email': 'メールアドレス',
        'Phone Number': '電話番号',
        'Have an account? ': '既にお持ちですか？',
        'Sign in': 'ログインへ',
        'Create Account': 'アカウント作成',

        'Sign Out': 'ログオフ',

        'Confirm Sign Up': 'アカウント作成の確認',
        'Confirmation Code': '確認コード',
        'Lost your code? ': 'コードがありませんか？',
        'Confirm': '確認',

        'Confirm Sign In': 'ログインの確認',
    },
};
