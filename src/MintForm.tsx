import { Button, Card, Container, FormControlLabel, Switch, TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, useFormik } from 'formik';
import * as React from 'react';
import { useRef } from 'react';
import { Color, ColorPicker, createColor } from 'mui-color';
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
const theme = createTheme();
const useStyles = makeStyles((theme) => ({
    inputBox: {
        margin: '20px',
    }, // a style rule
}));

export const MintForm: React.FC<Props> = ({onSubmit}) => {
    const backDropImage = useRef<HTMLInputElement>(null);
    const [collectionName, setCollectionName] = React.useState("");
    const [collectionDescription, setCollectionDescription] = React.useState("");
    const [collectionMintTime, setCollectionMintTime] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [discordInviteCode, setDiscordInviteCode] = React.useState("");
    const [twitterUsername, setTwitterUsername] = React.useState("");

    const [highlightsColour, setHighlightsColour] = React.useState(createColor("grey"));
    const [socialsColour, setSocialsColour] = React.useState(createColor("pink"));
    const [mintColour, setMintColour] = React.useState(createColor("red"));
    const [mintTextColour, setMintTextColour] = React.useState(createColor("red"));

    const fileRef = useRef<HTMLInputElement>(null);
    //const isSubmitting = React.useState(false);
      
    const Submit = (values: Values) => {
        // This will run when the form is submitted
        onSubmit(values);

        console.log(values);
    };
    const classes = useStyles();
    return (
        <Container maxWidth="sm">
            <Formik 
                initialValues={{backDropImage: null, collectionName: "", domain: "", email: "", iconImage: null}} 
                onSubmit={Submit}
            >{({ values, setFieldValue }) => (
                <Form>
                    <Typography style={{display: 'block', marginTop: '20px'}}>Collection Name</Typography>
                    <TextField 
                        name='collectionName'
                        onChange={(event) => {
                            setFieldValue("collectionName", event.target.value);
                        }}
                        style={{display: 'block'}}
                    />
                    
                    <Typography style={{display: 'block', marginTop: '20px'}}>Select Icon</Typography>
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
                    <Typography style={{display: 'block', marginTop: '20px'}}>Select Backdrop</Typography>
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
                            style={{marginTop: '20px'}}
                        />
                    </Button>
                    
                    <Typography style={{display: 'block', marginTop: '20px'}}>Select Colour Scheme</Typography>
                    <div style={{display: 'inline-block'}}>
                        <Typography variant="caption" style={{display: 'block', marginTop: '20px'}}>Highlighted Socials Colour</Typography>
                        <div>
                            <ColorPicker 
                                value={highlightsColour} 
                                onChange={(newValue) => {
                                    console.log("change", newValue);
                                    // setColor(`#${newValue.hex}`);
                                    setHighlightsColour(newValue as Color);
                                    // action('changed')(newValue);
                                }}
                            />
                        </div>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <Typography variant="caption" style={{display: 'block', marginTop: '20px'}}>Social Links Colour</Typography>
                        <div>
                            <ColorPicker 
                            value={socialsColour} 
                            onChange={(newValue) => {
                                console.log("change", newValue);
                                // setColor(`#${newValue.hex}`);
                                setSocialsColour(newValue as Color);
                                // action('changed')(newValue);
                            }}
                        />
                        </div>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <Typography variant="caption" style={{display: 'block', marginTop: '20px'}}>Mint Colour</Typography>
                        <div>
                            <ColorPicker 
                                value={mintColour} 
                                onChange={(newValue) => {
                                    console.log("change", newValue);
                                    // setColor(`#${newValue.hex}`);
                                    setMintColour(newValue as Color);
                                    // action('changed')(newValue);
                                }}
                            />
                        </div>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <Typography variant="caption" style={{display: 'block', marginTop: '20px'}}>Mint Text Colour</Typography>
                        <div>
                            <ColorPicker 
                                value={mintTextColour} 
                                onChange={(newValue) => {
                                    console.log("change", newValue);
                                    // setColor(`#${newValue.hex}`);
                                    setMintTextColour(newValue as Color);
                                    // action('changed')(newValue);
                                }}
                            />
                        </div>
                    </div>

                    <Typography style={{display: 'block', marginTop: '20px'}}>Contact</Typography>
                    <TextField 
                            name='email'
                            onChange={(event) => {
                                setFieldValue("email", event.target.value);
                            }}
                            label="Email"
                            style={{display: 'block'}}
                        />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <TextField 
                            name='domain'
                            onChange={(event) => {
                                setFieldValue("domain", event.target.value);
                            }}
                            label="Your domain name"
                            defaultValue="yourawesomenft"
                            style={{display:'inline-block', marginTop:'20px'}}
                        />
                        <Typography style={{display: 'inline-block', marginLeft: '10px'}}>.heroku.com</Typography>
                    </div>
                    <Card hidden variant="outlined" style={{padding: '20px', marginTop: '10px'}}>
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
        </Container>
    )
}