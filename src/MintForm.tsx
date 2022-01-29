import { Button, Card, Container, FormControlLabel, Switch, TextField, Typography, Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form, useFormik } from 'formik';
import * as React from 'react';
import { useRef } from 'react';
import { AlertState } from "./utils";
import PreviewImage from './PreviewImage';

interface Values {
    backDropImage: any;
    collectionName: String;
    domain: String;
    email: String;
    iconImage: any;
}
interface Props {
    onSubmit: (values: Values) => void;
}
export const MintForm: React.FC<Props> = ({onSubmit}) => {
    const [collectionName, setCollectionName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [email, setEmail] = React.useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const isSubmitting = React.useState(false);
    
    const [alertState, setAlertState] = React.useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
      });
      
    const Submit = (values: Values) => {
        // This will run when the form is submitted
        onSubmit(values);

        setAlertState({
            open: true,
            message: "Congratulations! Page "+ values.domain + " bought and set up!",
            severity: "success",
          });

        console.log(values);
    };
    return (
        <Container maxWidth="sm">
            <Formik 
                initialValues={{backDropImage: null, collectionName: "", domain: "5", email: "", iconImage: null}} 
                onSubmit={Submit}
            >{({ values, setFieldValue }) => (
                <Form>
                    <Typography>Collection Name</Typography>
                    <TextField 
                        name='collectionName'
                        onChange={(event) => {
                            setFieldValue("iconImage", event.target.value);
                        }}
                    />
                    <Typography>Select Icon</Typography>
                    <Button 
                        variant="outlined" 
                        component="label" 
                        onClick={() => { 
                            fileRef.current?.click();
                        }}
                    >
                        Upload Icon
                        <input
                            ref={fileRef}
                            accept="image/*"
                            hidden
                            id="raised-button-file"
                            type="file"
                            onChange={(event) => {
                                if(event.target.files != null) {
                                    setFieldValue("iconImage", event.target.files![0]);
                                }
                            }}
                        />
                    </Button>
                    <Typography>Select Backdrop</Typography>
                    <Button variant="outlined" component="label">
                        Upload Backdrop
                        <input
                            accept="image/jpeg"
                            hidden
                            id="raised-button-file"
                            type="file"
                            onChange={(event) => {
                                if(event.target.files != null) {
                                    setFieldValue("backDropImage", event.target.files![0]);
                                }
                            }}
                        />
                    </Button>
                    <TextField 
                            name='email'
                            onChange={(event) => {
                                setFieldValue("email", event.target.value);
                            }}
                            label="Email"
                            style={{display: 'block'}}
                        />
                    <Box>
                        <TextField 
                            name='domain'
                            onChange={(event) => {
                                setFieldValue("domain", event.target.value);
                            }}
                            label="Your domain name"
                            defaultValue="yourawesomenft.heroku.com"
                            style={{display:'inline-block'}}
                        />
                        <Typography style={{display: "inline-block"}}>.heroku.com</Typography>
                    </Box>
                    <Card hidden variant="outlined" style={{padding: '20px', margin: '10px'}}>
                        <Typography>Domain Registration Contact</Typography>
                        <TextField 
                            name='email'
                            value={values.email}
                            label="Email"
                        />
                        <TextField 
                            name='full-name'
                            label="Full Name"
                        />
                        <TextField 
                            name='street-address'
                            label="Street Address"
                        />
                        <TextField 
                            name='suburb'
                            label="Suburb"
                        />
                        <TextField 
                            name='state'
                            label="State"
                        />
                        <TextField 
                            name='postcode'
                            label="Postcode"
                        />
                        <TextField 
                            name='Country/Region'
                            label="Country/Region"
                        />
                        <FormControlLabel style={{margin: '10px'}} control={<Switch defaultChecked aria-label='WHOIS PRIVACY'/>} label="WHOIS PRIVACY" />
                    </Card>
                    <div>
                        <Typography style={{display:'inline-block', padding: '20px'}}>Price: 0.6 SOL</Typography>
                        <Button variant="contained" type="submit" style={{display:'inline-block', margin: '5px', padding: '10px'}}>
                            Buy Minting Website!
                        </Button>
                    </div>
                </Form>
            )}</Formik>
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
        </Container>
    )
}