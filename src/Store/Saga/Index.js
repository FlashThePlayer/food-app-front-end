import { takeEvery, all } from "redux-saga/effects";

import {AUTH_USER, LOGOUT_USER, CHECK_AUTH_STATE, CHECK_AUTH_EXP_DATE} from "../Actions/ActionTypes";
import { authUserSaga, logoutUserSaga, checkAuthStateSage, checkAuthExpDateSaga } from "./Auth";

export function* watchAuth() {
  yield all([
      takeEvery(AUTH_USER, authUserSaga),
      takeEvery(LOGOUT_USER, logoutUserSaga),
      takeEvery(CHECK_AUTH_STATE, checkAuthStateSage),
      takeEvery(CHECK_AUTH_EXP_DATE, checkAuthExpDateSaga)
  ])
}