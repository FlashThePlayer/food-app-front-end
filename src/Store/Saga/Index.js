import { takeEvery } from "redux-saga/effects";

import { AUTH_USER } from "../Actions/ActionTypes";
import { authUserSaga } from "./Auth";

export function* watchAuth() {
  yield takeEvery(AUTH_USER, authUserSaga);
}