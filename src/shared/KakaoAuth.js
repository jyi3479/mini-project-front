const CLIENT_ID = "d7a8363e2d11e3d2c8405bf4125e2e87";
const REDIRECT_URI = "http://localhost:3000/kakaoLogin";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
