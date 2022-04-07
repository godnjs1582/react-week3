import React from "react";
import {Text,Grid,Image,Button} from "../elements/index.js"
import { history } from "../redux/configureStore.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post =(props) =>{
    const post_list=useSelector((state)=>state.post.list);
    console.log(post_list);
    const post_id=props.id
    const dispatch =useDispatch();
    const deletePost=()=>{
        dispatch(postActions.deletePostFB(post_id));
    }
    return(
    <Grid width="80%" margin="100px auto">
        <Grid is_flex>
            <Grid width="8%" is_flex>
                <Image shape="circle"/>
                <Text>{props.user_info.user_name}</Text>
            </Grid>
            <Grid  width="18%" is_flex>
                <Text>{props.insert_dt}</Text>
                {props.is_me && (<Button padding="4px" width="auto" backgroundColor="#868e96" 
                _onClick={deletePost}>삭제</Button>)}
                {props.is_me && (<Button padding="4px" width="auto" backgroundColor="#868e96" 
                _onClick={()=>{history.push(`/write/${props.id}`)}}>수정</Button>)}
            </Grid>
        </Grid>
        <Grid is_flex bg="#f3f3f3" margin="0px 0px 0px 0px">
            <Grid>
                <Image shape="rectangle" src={props.image_url}></Image>
            </Grid>
            <Grid >
                <Text>{props.contents}</Text>
            </Grid>
        </Grid>
        <Grid is_flex  width="13%">
            <Text bold>좋아요{props.like_cnt}개</Text>
            <Text bold>댓글{props.comment_cnt}개</Text>
        </Grid>
    </Grid>
)};

Post.defaultProps={
    user_info:{
        user_name:"haewon",
        user_profile:"https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png",
    },
    image_url:"https://pbs.twimg.com/media/EfvkJNRUYAIl7GU.jpg:large",
    contents:"원우 이 날은 백번을 봐도 미친거같아",
    like_cnt:0,
    comment_cnt:0,
    insert_dt:"2021-04-03 10:00:00",
    is_me:false,
    select:"",
}

export default Post;