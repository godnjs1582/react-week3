import React from "react";
import {Grid,Text,Input,Button} from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";


const Signup =(props)=>{
    const dispatch=useDispatch();
    const [id,setId]=React.useState('');
    const [pwd,setPwd]=React.useState('');
    const [user_name,setUserName]=React.useState('');
    const [pwd_check,setPwdCheck]=React.useState('');
    console.log(id,pwd,user_name,pwd_check);

    const signup=()=>{
        if(id===""||pwd ==""||user_name===""){
            window.alert("아이디와 비밀번호를 입력해주세요")
            return;
        }
        if(pwd!==pwd_check){
            window.alert("비밀번호가 일치하지 않습니다")
            return;
        }
        if(!emailCheck(id)){
            window.alert("이메일형식이 맞지 않습니다");
            return;
        }
        dispatch(userActions.signupFB(id,pwd,user_name));
    };
    return(
        <Grid width="80%" margin="100px auto">
                <Text size ="32px" bold>회원가입</Text>
                <p style={{float:"left"}}>Id</p>
                <Input _onChange ={(e)=>{setId(e.target.value);}}placeholder="아이디를 입력해주세요"></Input>
                <p style={{float:"left"}}>닉네임</p>
                <Input _onChange ={(e)=>{setUserName(e.target.value);}} placeholder="닉네임을 입력해주세요"></Input>
                <p style={{float:"left"}}>Password</p>
                <Input type ="password" _onChange ={(e)=>{setPwd(e.target.value);}} placeholder="비밀번호를 입력해주세요"></Input>
                <p style={{float:"left"}}>Password Check</p>
                <Input type ="password" _onChange ={(e)=>{setPwdCheck(e.target.value);}} placeholder="비밀번호를 다시 입력해주세요"></Input>
                <Button margin="50px 0" _onClick={signup} >회원가입하기</Button>
        </Grid>
    )
}

export default Signup;