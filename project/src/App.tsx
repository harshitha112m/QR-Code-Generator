import React from 'react';
import { Header } from './components/Header';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;