import React from 'react';
import './App.scss';
import DeleteForm from "./components/DeleteForm";

function App() {
  return (
    <div className={'container'}>
        <div className={'row justify-content-md-center'}>
            <div className={'col-md-auto'}>
                <DeleteForm />
            </div>
        </div>
    </div>
  );
}

export default App;
