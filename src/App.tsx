import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MintForm } from './MintForm';
import { Alert, Snackbar } from '@mui/material';
import { AlertState } from './utils';

function App() {
  const [alertState, setAlertState] = React.useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });
  function Submit (values: any) {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values)
    // };
  
    // fetch("cryptotradiez.com/submit", requestOptions)
    //     .then(response => response.json())
    //     .then(res => console.log(res));
  
    setAlertState({
        open: true,
        message: "Congratulations! Page "+ values.domain + ".heroku.com bought and set up!",
        severity: "success",
    });
  }
  return (
    <>
      <MintForm onSubmit={Submit}/>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
        >
        {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
