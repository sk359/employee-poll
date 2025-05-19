import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap'; // needed for responsive components
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './components/login';
import { Dashboard } from './components/dashboard';
import { CreatePoll } from './components/create_poll';
import { QuestionDetail } from './components/question_detail';
import { Leaderboard } from './components/leaderboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faUser);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/question/:question_id" element={<QuestionDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
