import jwt from "jsonwebtoken";

import { put, delay } from "redux-saga/effects";
import {
  authSuccess,
  logoutSuccess,
  logout,
  checkAuthExpDate,
} from "../Actions/Index";

export function* authUserSaga(action) {
  const { exp } = yield jwt.decode(action.token);

  yield localStorage.setItem("token", action.token);
  yield localStorage.setItem("userEmail", action.userEmail);
  yield put(checkAuthExpDate(new Date(exp * 1000).getTime() /1000, action.history))
  yield put(authSuccess(action.token, action.userEmail));
}

export function* logoutUserSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userEmail");
  yield action.history.push("/");
  yield put(logoutSuccess());
}

export function* checkAuthExpDateSaga(action) {
  yield delay(action.expirationTime);
  yield put(logout(action.history));
}

export function* checkAuthStateSage(action) {
  const token = yield localStorage.getItem("token");
  const storageEmail = yield localStorage.getItem("userEmail");

  if (!token || !storageEmail) {
    yield put(logout(action.history));
  } else {
    const { email, exp } = yield jwt.decode(token);
    if (email !== storageEmail) {
      yield put(logout(action.history));
    } else {
      const expirationDate = yield new Date(exp * 1000);
      if (expirationDate < Date.now()) {
        yield put(logout(action.history));
      } else {
        yield put(authSuccess(token, email));
        yield put(
          checkAuthExpDate(
            expirationDate.getTime() - new Date().getTime() / 1000,
            action.history
          )
        );
      }
    }
  }
}
