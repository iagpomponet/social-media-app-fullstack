import React from 'react';
import Api from './service/api';



function App() {

  Api.getUsers();

  return (
    <div>
      Teste
    </div>
  );
}

export default App;
