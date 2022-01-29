import { Button, Card, Container, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form, useFormik } from 'formik';
import * as React from 'react';
import { useRef } from 'react';
import PreviewImage from './PreviewImage';

interface Values {
    collectionName: String;
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
    
    const Submit = (values: Values) => {
            // This will run when the form is submitted
            onSubmit(values);
            console.log(values);
        };
    return (
        <Container maxWidth="sm">
            <Formik 
                initialValues={{collectionName: "", domain: "", email: "", iconImage: null}} 
                onSubmit={Submit}
            >{({ values, setFieldValue }) => (
                <Form>
                    <Typography>Collection Name</Typography>
                    <TextField 
                        name='collectionName'
                        value={values.collectionName}
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
                        />
                    </Button>
                    <Typography>Available Domains</Typography>
                    <TextField 
                        name='domain'
                        value={values.domain}
                        label="Your domain name"
                        defaultValue="www.yourawesomenft.com"
                    />
                    <Card variant="outlined" style={{padding: '20px', margin: '10px'}}>
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
                        <FormControlLabel control={<Switch defaultChecked />} label="WHOIS PRIVACY" />
                    </Card>
                    <div>
                        <Typography style={{display:'inline-block', padding: '20px'}}>Price: 0.6 SOL</Typography>
                        <Button variant="contained" type="submit" style={{display:'inline-block', margin: '5px', padding: '10px'}}>
                            Buy Minting Website!
                        </Button>
                    </div>
                </Form>
            )}</Formik>
        </Container>
    )
}