import { all } from "redux-saga/effects";
import MaincategorySagas from "./MaincategorySagas";
import SubcategorySagas from "./SubcategorySagas";
import BrandSagas from "./BrandSagas";
import ProductSagas from "./ProductSagas";
import FeatureSagas from "./FeatureSagas";
import FaqSagas from "./FaqSagas";
import SettingSagas from "./SettingSagas";


export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeatureSagas(),
        FaqSagas(),
        SettingSagas(),
    ])
}