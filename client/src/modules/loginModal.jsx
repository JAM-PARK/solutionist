/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const LOGIN_MODAL_ON = 'loginModal/LOGIN_MODAL_ON';
const MODAL_OFF = 'loginModal/MODAL_OFF';
const LOGIN_SUCCESS = 'loginModal/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'loginModal/LOGOUT_SUCCESS';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const loginModalOnAction = () => ({ type: LOGIN_MODAL_ON });
export const modalOffAction = () => ({ type: MODAL_OFF });
export const loginAction = () => ({ type: LOGIN_SUCCESS });
export const logoutAction = () => ({ type: LOGOUT_SUCCESS });

/* 초기 상태 선언 */
const initialState = {
  isLoginModalOn: false,
  isLogin: false,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
const loginModal = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_MODAL_ON:
      return (state = { ...state, isLoginModalOn: true });
    case MODAL_OFF:
      return (state = { ...initialState });
    case LOGIN_SUCCESS:
      return (state = { ...state, isLogin: true });
    case LOGOUT_SUCCESS:
      return (state = { ...state, isLogin: false });
    default:
      return state;
  }
};

export default loginModal;
