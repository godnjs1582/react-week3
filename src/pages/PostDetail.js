import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommnetList";
import CommentWrite from "../components/CommentWrite";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";

const PostDetail =(props)=>{
    const dispatch =useDispatch();
    const user_info =useSelector((state)=>state.user.user);
    const id = props.match.params.id;
    const post_list = useSelector(store=>store.post.list);
    const post_idx=post_list.findIndex(p=>p.id===id);
    const post=post_list[post_idx];
    // const [post,setPost] = React.useState(post_data? post_data:null);
    console.log(post);
    React.useEffect(()=>{
        if(post){
            return;
        }
        dispatch(postActions.getOnePostFB(id));
    },[])

    return(
        <React.Fragment>
            <Grid >
                {post && <Post {...post} is_me ={post.user_info.user_id===user_info?.uid}/>}
            </Grid>
            <Grid margin="-100px 0px 0px 0px">
                <Permit>
                    <CommentWrite post_id={id}/>
                </Permit>
            </Grid>
                
                <Grid >
                    <CommentList post_id={id}/>
                </Grid>
        </React.Fragment>
    )
}

export default PostDetail;
