import './App.css';
import React from 'react';
import {Route}from "react-router-dom";
import PostList from '../pages/PostList';
import {Grid,Image,Text,Button} from "../elements";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from './Header';
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configureStore";
import {actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from"react-redux";
import {apiKey} from"./firebase";
import Permit from './Permit';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Notification from '../pages/Notification';
function App() {
  const dispatch =useDispatch();
  const _session_key =`firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session=sessionStorage.getItem(_session_key)? true:false;
  React.useEffect(()=>{
    if(is_session){
        dispatch(userActions.loginCheckFB());
    }
  },[]);
  return (
    <div className="App">
      <Grid>
        <div style={{position:'fixed',top:'0',left:'0', width:"100%",background:"rgba(255,255,255,0.6)",zIndex:"5"}}>
          <Header/>
        </div>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component ={PostWrite}/>
          <Route path="/write/:id" exact component ={PostWrite}/>
          <Route path="/post/:id" exact component ={PostDetail}/>
          <Route path="/noti" exact component ={Notification}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
      <Button is_float text="+" _onClick={()=>{history.push("/write")}}></Button>
      </Permit>
    </div>
  );
}

export default App;
