import React from 'react';

import Header from './components/header';
import MapPage from './pages/map';
import CreateAccountPage from './pages/create-account';
import ProfilePage from './pages/profile';
import PageNotFound from './pages/404';
import EditProfilePage from './pages/edit-profile';
import EditLocationPage from './pages/edit-location';
import FriendsPage from './pages/friends';
import EditProfileIconPage from './pages/edit-profileicon';
import EditSocialsPage from './pages/edit-socials';
import ChallengePage from './pages/challenge';
import AdminPage from './pages/admin';
import SubmissionPage from './pages/submission';
import UserPage from './pages/user';
import TransactionPage from './pages/transaction';
import ReferralCodePage from './pages/referral-code';
import AmbassadorFaqPage from './pages/ambassador-faq';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfServicePage from './pages/terms-of-service';
import FaqPage from './pages/faq';
import SafetyPage from './pages/safety';
import RulesPage from './pages/rules';
import ResetPasswordPage from './pages/reset-password';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<MapPage/>}/>
            <Route path="location/:locationId" element={<MapPage/>}/>
            <Route path="create-account" element={<CreateAccountPage firstTimeSetup={true}/>}/>
            <Route path="setup-account" element={<CreateAccountPage firstTimeSetup={false}/>}/>
            <Route path="my-account" element={<ProfilePage/>}/>
            <Route path="edit-profile" element={<EditProfilePage/>}/>
            <Route path="edit-location" element={<EditLocationPage/>}/>
            <Route path="edit-profileicon" element={<EditProfileIconPage/>}/>
            <Route path="edit-socials" element={<EditSocialsPage/>}/>
            <Route path="friends" element={<FriendsPage/>}/>
            <Route path="ambassador-application" element={<ChallengePage ambassadorApplication/>}/>
            <Route path="challenge/:challengeId" element={<ChallengePage/>}/>
            <Route path="challenges" element={<ChallengePage/>}/>
            <Route path="admin" element={<AdminPage/>}/>
            <Route path="submissions" element={<SubmissionPage/>}/>
            <Route path="submission/:submissionId" element={<SubmissionPage/>}/>
            <Route path="user/:userId" element={<UserPage/>}/>
            <Route path="users" element={<UserPage/>}/>
            <Route path="transactions" element={<TransactionPage/>}/>
            <Route path="transaction/:transactionId" element={<TransactionPage/>}/>
            <Route path="referral-code/:referralCodeId" element={<ReferralCodePage/>}/>
            <Route path="referral-codes" element={<ReferralCodePage/>}/>
            <Route path="faq" element={<FaqPage/>}/>
            <Route path="ambassador-faq" element={<AmbassadorFaqPage/>}/>
            <Route path="privacy-policy" element={<PrivacyPolicyPage/>}/>
            <Route path="terms-of-service" element={<TermsOfServicePage/>}/>
            <Route path="safety" element={<SafetyPage/>}/>
            <Route path="rules" element={<RulesPage/>}/>
            <Route path="reset-password/:key" element={<ResetPasswordPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
