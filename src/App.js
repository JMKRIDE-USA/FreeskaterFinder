import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/header';
import MapPage from './pages/map';
import CreateAccountPage from './pages/create-account';
import ProfilePage from './pages/profile';
import PageNotFound from './pages/404';
import EditProfilePage from './pages/edit-profile';
import EditLocationPage from './pages/edit-location';
import FriendsPage from './pages/friends';
import EditProfileIconPage from './pages/edit-profileicon';
import ChallengePage from './pages/challenge';
import AdminPage from './pages/admin';
import SubmissionPage from './pages/submission';
import UserPage from './pages/user';
import TransactionPage from './pages/transaction';
import ReferralCodePage from './pages/referral-code';
import FaqPage from './pages/faq';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfServicePage from './pages/terms-of-service';

import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#080808',
    },
    secondary: {
      main: '#00b0ff',
    },
    neutral: {
      main: '#dadada',
      contrastText: '#000'
    },
    background: {default: '#c8c8c8', paper: '#f3f3f3'},
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header/>}>
              <Route index element={<MapPage/>}/>
              <Route path="location/:locationId" element={<MapPage/>}/> <Route path="create-account" element={<CreateAccountPage firstTimeSetup={true}/>}/>
              <Route path="setup-account" element={<CreateAccountPage firstTimeSetup={false}/>}/>
              <Route path="my-account" element={<ProfilePage/>}/>
              <Route path="edit-profile" element={<EditProfilePage/>}/>
              <Route path="edit-location" element={<EditLocationPage/>}/>
              <Route path="edit-profileicon" element={<EditProfileIconPage/>}/>
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
              <Route path="privacy-policy" element={<PrivacyPolicyPage/>}/>
              <Route path="terms-of-service" element={<TermsOfServicePage/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
