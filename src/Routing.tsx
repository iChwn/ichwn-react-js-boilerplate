import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routeUrl } from "constant";
import PeranDanIzin from "page/client-form/peran-izin";
import DataKlien from "page/client-form/data-klien";
import SocialMediaAccount from "page/client-form/social-media-account";
import Marketplace from "page/client-form/marketplace";
import DataUsaha from "page/client-form/data-usaha";
import LatarBelakangPerusahaan from "page/client-form/latar-belakang-perusahaan";
import ProductofServices from "page/client-form/product-of-services";
import MarketSegmentation from "page/client-form/market-segmentation";
import SwotAnalysis from "page/client-form/swot-analysis";
import PreferensiTalent from "page/client-form/preferensi-talent";
import ContentGuidelines from "page/client-form/content-guidelines";
import TermsConditions from "page/client-form/terms-conditions";
import TalentAssignment from "page/client-form/talent-assignment";
import { SimpleTemplate } from "components";
import ProtectedRoute from "utility/auth/ProtectedRoute";
import AuthenticationRoute from "utility/auth/AuthenticationRoute";

const AuthPage = React.lazy(() => import("page/authentication"))
const HomePage = React.lazy(() => import("page/home"))
const SampleFormPage = React.lazy(() => import("page/sampleForm"))

const Router = () => {

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<SimpleTemplate />}>
            <Route path="/*" element={<Navigate to={routeUrl.peranIzin} replace />} />
            <Route path={routeUrl.peranIzin} index element={<PeranDanIzin/>} />
            <Route path={routeUrl.socialMediaAccount} index element={<SocialMediaAccount/>} />
            <Route path={routeUrl.marketplace} index element={<Marketplace/>} />
            <Route path={routeUrl.dataUsaha} index element={<DataUsaha/>} />
            <Route path={routeUrl.latarBelakangPerusahaan} index element={<LatarBelakangPerusahaan/>} />
            <Route path={routeUrl.productOfService} index element={<ProductofServices/>} />
            <Route path={routeUrl.marketSegmentation} index element={<MarketSegmentation/>} />
            <Route path={routeUrl.swotAnalysis} index element={<SwotAnalysis/>} />
            <Route path={routeUrl.preferensiTalent} index element={<PreferensiTalent/>} />
            <Route path={routeUrl.contentGuidelines} index element={<ContentGuidelines/>} />
            <Route path={routeUrl.termsCondition} index element={<TermsConditions/>} />
            <Route path={routeUrl.talentAssigment} index element={<TalentAssignment/>} />
            <Route path={routeUrl.dataKlien} element={<DataKlien/>} />

            <Route path={routeUrl.home} element={<HomePage/>} />
            <Route path={routeUrl.sampleForm} element={<SampleFormPage/>} />
          </Route>
        </Route>
        
        <Route element={<AuthenticationRoute />} >
          <Route path={routeUrl.authentication} element={<AuthPage/>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
 
export default Router