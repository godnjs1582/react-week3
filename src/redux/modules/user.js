import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import {auth} from "../../shared/firebase";
import firebase from "firebase/app";

//1)액션 타입을 만든다
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const GET_USER ="GET_USER";

//2)액션 생성 함수를 만든다
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT,(user)=>({user}));
const getUser = createAction(GET_USER,(user)=>({user}));

//3)initialState 만든다
const initialState ={
    user:{user_name:"",user_profile:"https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"},
    is_login:false,
};

//6)user의 initial값 만들기
// const user_initial={
//     user_name:'mean0',
// }

//5) 페이지 이동을 위해 미들웨어를 만듦


const loginCheckFB =()=>{
    return function(dispatch,getState,{history}){
        auth.onAuthStateChanged((user)=>{
            if(user){
                dispatch(setUser({
                    user_name :user.displayName,
                    user_profile:"",
                    id:user.email,
                    uid:user.uid,
                })
            );
        }else{
            dispatch(logOut());
        }
    })
  }
}
const loginFB =(id,pwd)=>{
    return function(dispatch,getState,{history}){
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res)=>{
        auth
       .signInWithEmailAndPassword(id,pwd)
       .then((user)=>{
           dispatch(setUser({
               user_name:user.user.displayName,
               id:id,
               user_profile:"",
               uid:user.user.uid,
           })
       );
       history.push("/");
    }).catch((error)=>{
        var errorCode =error.code;
        var errorMessage=error.message;
        console.log(errorCode,errorMessage);
    });
    });
       
  };
};
const logoutFB =()=>{
    return function(dispatch,getState,{history}){
        auth.signOut().then(()=>{
            dispatch(logOut());
            history.replace("/")
        })
    }
}

const signupFB=(id,pwd,user_name)=>{
    return function(dispatch,getState,{history}){
        auth
        .createUserWithEmailAndPassword(id,pwd)
        .then((user)=>{
            auth.currentUser.updateProfile({
                displayName:user_name,
            }).then(()=>{
                dispatch(setUser({user_name:user_name, id:id, user_profile:"",uid:user.user.uid}));
                history.push("/");
            }).catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            var errorCode =error.code;
            var errorMessage=error.message;
            console.log(errorCode,errorMessage);
        });
    }
}

//4)리듀서 만든다(feat.immer)
export default handleActions(
    {
        [SET_USER]:(state,action)=>
        produce(state,(draft)=>{
            setCookie("is_login","success")
            draft.user=action.payload.user;
            draft.is_login=true;
        }),
        [LOG_OUT]:(state,action)=>
        produce(state,(draft)=>{
           deleteCookie("is_login");
           draft.user=null;
           draft.is_login=false;
        }),
        [GET_USER]:(state,action)=>
        produce(state,(draft)=>{
        }),
    },initialState
);

const actionCreators={
    setUser,
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export {actionCreators};
