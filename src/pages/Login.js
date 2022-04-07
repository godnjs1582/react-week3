import React from "react";
import { Text,Input,Grid,Button } from "../elements";
import { setCookie,getCookie } from "../shared/Cookie";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login =(props)=>{
    const dispatch=useDispatch();
    const [id,setId]=React.useState('');
    const [pwd,setPwd]=React.useState('');
    const login =()=>{
        let _reg =/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        if(id ==="" || pwd ===""){
            window.alert("아이디와 비밀번호를 입력해주세요");
            return ;
        }
        console.log(emailCheck(id));
        if(!emailCheck(id)){
            window.alert("이메일형식이 맞지 않습니다");
            return;
        }
        dispatch(userActions.loginFB(id,pwd));
    }
    const changeId =(e)=>{
        setId(e.target.value);
    }
    const changePwd =(e)=>{
        setPwd(e.target.value);
    }
    return(
        <React.Fragment>
            <Grid width="80%" margin="100px auto">
                <Text size ="32px" bold>Log in</Text>
                <p style={{float:"left"}}>Id</p>
                <Input value ={id} _onChange ={changeId} placeholder="아이디를 입력해주세요"/>
                <p style={{float:"left"}}>Password</p>
                <Input type ="password" value ={pwd} _onChange ={changePwd} placeholder="비밀번호를 입력해주세요"/>
                <Button margin="50px 0" _onClick={login}>로그인하기</Button>
            </Grid>
            
        </React.Fragment>
    )
}

export default Login;