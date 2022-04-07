import React from "react";
import {Grid,Image,Text} from "../elements";
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList =(props)=>{
    const dispatch=useDispatch();
    const comment_list=useSelector(state=>state.comment.list);
    const {post_id} =props;
    React.useEffect(()=>{
        if(!comment_list[post_id]){
            dispatch(commentActions.getCommentFB(post_id));
        }
    },[]);

    if(!comment_list[post_id] || !post_id){
        return null;
    }
    return(
        <React.Fragment>
            <Grid width="80%" margin="0 auto">
                {comment_list[post_id].map(c=>{
                    return <CommentItem key={c.id}{...c}/>
                })}
            </Grid>
        </React.Fragment>
    )
}
CommentList.defaultProps ={
    post_id:null,
}

export default CommentList;

const CommentItem =(props)=>{
    const {user_id,user_profile,user_name,post_id,insert_dt,contents} =props
    return(
            <Grid is_flex>
                <Grid is_flex width="auto">
                    <Image shape="circle"/>
                    <Text bold>{user_name}</Text>
                </Grid>
                <Grid is_flex margin="0px 0px 0px 20px">
                    <Text>{contents}</Text>
                    <Text>{insert_dt}</Text>
                </Grid>
            </Grid>
    )
}

CommentItem.defaultProps={
    user_profile:"",
    user_name:"haewon",
    user_id:"",
    post_id:1,
    insert_dt:'2021-01-01 19:00:00',
    contents:"원우 이 날은 백번을 봐도 미친거같아",
}