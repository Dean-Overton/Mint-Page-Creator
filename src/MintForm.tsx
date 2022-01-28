import { Button, Container, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { useRef } from 'react';
import PreviewImage from './PreviewImage';

interface Values {
    collectionName: String;
    iconImage: any;
    email: String;
}
interface Props {
    onSubmit: (values: Values) => void;
}
export const MintForm: React.FC<Props> = ({onSubmit}) => {
    const fileRef = useRef<HTMLInputElement>(null);
    
    return (
        <Container maxWidth="sm">
            <Formik 
                initialValues={{collectionName: '', iconImage: null, email: ''}} 
                onSubmit={(values) => {
                    onSubmit(values);
                    console.log(values);
                }}
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
                    {fileRef ? (
                        <PreviewImage>
                    ):(<></>)}
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
                </Form>
            )}</Formik>
        </Container>
    )
}