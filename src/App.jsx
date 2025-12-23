import React from 'react';
import { PromptProvider } from './context/PromptContext';
import Layout from './components/Layout';
import MainSelector from './components/MainSelector'; // We will create this next
import './App.css';

function App() {
  return (
    <PromptProvider>
      <Layout>
        <MainSelector />
      </Layout>
    </PromptProvider>
  );
}

export default App;
