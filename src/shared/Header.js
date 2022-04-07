import React from "react";
import {Grid,Text,Button,Image} from "../elements";
import HomeBtn from "./home-button.png";
import Alert from "../shared/alert.png"
import Signout from "../shared/signout.png"
import {useSelector, useDispatch} from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import {history} from"../redux/configureStore";
import { apiKey } from "./firebase";
import Permit from "./Permit";
const Header =(props)=>{
    const dispatch =useDispatch();
    const is_login =useSelector((state)=>state.user.is_login)
    const user_name = useSelector((state)=>state.user.user.user_name)
    const _session_key =`firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session=sessionStorage.getItem(_session_key)? true:false;
    const logout =()=>{
        dispatch(userActions.logoutFB({}));
    }
    let _reg =/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    if(is_login&&is_session){

        return(
            <Permit>
                    <React.Fragment>
                        <Grid is_flex width="80%" margin="30px auto">
                            <Grid width="10%">
                                <img src={HomeBtn} style={{width:"30px",height:"30px", marginLeft:"-90px"}}></img>
                            </Grid>
                        <Grid width="50%" is_flex>
                            <Grid is_flex>
                                <Grid>
                                    <Image/>
                                </Grid>
                                <Grid margin="0 80px 0 0">
                                    <Text bold>{user_name}</Text>
                                </Grid>
                            </Grid>
                            <Grid margin="0px 10px 0px 0px">
                                <Button _onClick={()=>{history.push("/noti")}}>
                                    <img src={Alert} style={{width:"15px",padding:"0px" }}></img>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button _onClick ={logout}>
                                    <img src={Signout} style={{width:"15px",padding:"0px" }}></img>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    </React.Fragment>
                </Permit>
            )
    }
            return(
            <React.Fragment>
                <Grid is_flex width="80%" margin="30px auto">
                    <Grid width="10%">
                        <img src={HomeBtn} style={{width:"30px",height:"30px", marginLeft:"-90px"}}></img>
                    </Grid>
                <Grid width="40%" is_flex>
                    <Grid margin="0px 10px 0px 0px">
                        <Button _onClick ={()=>{history.push("/signup")}}>회원가입</Button>
                    </Grid>
                    <Grid>
                        <Button _onClick ={()=>{history.push("/login")}}>로그인</Button>
                    </Grid>
                </Grid>
            </Grid>
            </React.Fragment>
            )
        }
Header.defaultProps ={
    position:"fixed",
}
export default Header;