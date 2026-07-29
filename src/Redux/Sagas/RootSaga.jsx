import { all } from "redux-saga/effects";
import MaincategorySagas from "./MaincategorySagas";

export default function* RootSaga() {
    yield all([
        MaincategorySagas(),

    ])
}