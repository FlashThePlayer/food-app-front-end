import { put } from "redux-saga/effects";
import { authSuccess } from "../Actions/Index";

export function* authUserSaga(action) {
  yield localStorage.setItem("token", action.token);
  yield put(authSuccess(action.token));
}
