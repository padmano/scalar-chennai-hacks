import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import {Web3Provider} from "@ethersproject/providers";
import {InjectedConnector} from "@web3-react/injected-connector";
import {formatEther} from "@ethersproject/units";
import {Web3ReactProvider,useWeb3React} from "@web3-react/core";


function Login(props) {
  var classes = useStyles();
  var [nonceKey,setnonceKey] = useState(); 
  const {active ,account,activate,chainId , library } = useWeb3React();
  const blockNumber = useBlockNumber();
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Block Chain Based EBidding System</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    onClick={ () =>{
                      activate(new InjectedConnector({}));
                      fetch('http://10.1.126.123:3333/nonce', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            'walletAddress': account
                          })
                        }).then(res => res.json()).then(response => {console.log(response)
                           setnonceKey(response.message); 
                        })}
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Connect Meta Mask
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick = {async () => {
                    const message = nonceKey;
                      const signature = await library.getSigner(account)
                      .signMessage(message).catch(error => console.error(error));
                      console.log(signature);
                      console.log(nonceKey);

                      if(signature!=null){
                        loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      );
                         fetch('http://10.1.126.123:3333/login', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            'walletAddress': account,
                            'signedMessage': signature
                          })
                        }).then(res => res.json()).then(response => {console.log(response)
                            console.log(response);
                        })
                      }
                  }}
                >
                  SIGN IN
                </Button>
              </div>
            </React.Fragment>

          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
   function useBlockNumber(){
   const {library} = useWeb3React();
   const [blockNumber,setBlockNumber] = useState();
   // useEffect(()=> { if(library) {
   //  library.on("block",val => setBlockNumber(val))
   // }},{library})
   return blockNumber;
 }
   function setnonceKey(key){

        nonceKey = key;
   }

}


export default withRouter(Login);
