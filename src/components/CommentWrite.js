import React from "react";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Input,Button} from "../elements";

const CommentWrite =(props)=>{
    const {post_id} =props;
    const dispatch =useDispatch();
    const [comment_text,setCommentText]=React.useState();
    const onChange =(e)=>{
        setCommentText(e.target.value);
    }
    const write =()=>{
        console.log(comment_text);
        setCommentText("");
        dispatch(commentActions.addCommentFB(post_id,comment_text))
    }
    
    return(
        <React.Fragment>
            <Grid margin="0 auto" width="80%" is_flex>
                <Input placeholder="댓글내용을 입력해주세요" 
                _onChange={onChange} 
                value={comment_text}
                onSubmit={write}
                is_submit/>
                <Button _onClick={write} width="80px">작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;