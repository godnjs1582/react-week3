import React from "react";
import Post from "../components/Post";
import Post2 from "../components/Post2";
import Post3 from "../components/Post3";
import { useSelector ,useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";

const PostList =(props)=>{
    const user_info =useSelector((state)=>state.user.user);
    const dispatch =useDispatch();
    const post_list =useSelector((state)=>state.post.list);
    const is_loading = useSelector((state)=>state.post.is_loading);
    const paging = useSelector((state)=>state.post.paging);
    const {history} =props;
    console.log(post_list);
    React.useEffect(()=>{
        if(post_list.length<2){
            dispatch(postActions.getPostFB());
        }
    },[]);
    return(
        <React.Fragment>
            <InfinityScroll
                callNext={()=>{
                    dispatch(postActions.getPostFB(paging.next));
                }}
                is_next={paging.next?true:false}
                loading={is_loading}
            >
            {post_list.map((p,idx)=>{
                if(p.user_info.user_id === user_info?.uid){
                    if(p.select==="first"){
                        return (
                        <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                            <Post{...p} is_me/>
                        </Grid>
                        )
                    }
                    if(p.select==="second"){
                        return (
                            <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                                <Post2 {...p} is_me/>
                            </Grid>
                            )
                        }
                    if(p.select==="third"){
                        return (
                            <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                                <Post3 {...p} is_me/>
                            </Grid>
                            )
                        }
                }else{
                    if(p.select==="first"){
                        return (
                            <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                                <Post {...p} is_me/>
                            </Grid>
                            )
                        }
                    if(p.select==="second"){
                        return (
                            <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                                <Post2 {...p} is_me/>
                            </Grid>
                            )
                        }
                    if(p.select==="third"){
                        return (
                            <Grid  key={p.id} _onClick={()=>{history.push(`/post/${p.id}`)}}>
                                <Post3 {...p} is_me/>
                            </Grid>
                            )
                    }
                }
               
            })}
            </InfinityScroll>
        </React.Fragment>
    );

}

export default PostList;