import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // The new Layout component
import Home from './views/Home'; // Example Page
import Task from './views/Task';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/task" element={<Task/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
