import React from "react";
import {Text,Button,Grid, Input,Image} from "../elements";
import Upload from "../shared/Upload";
import { useSelector,useDispatch } from "react-redux";
import post, { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite =(props)=>{
    const editPost =()=>{
        dispatch(postActions.editPostFB(post_id,{contents:contents},selectNum));
    }
    const post_list =useSelector((state)=>state.post.list);
    const post_id = props.match.params.id;
    const is_edit = post_id? true : false;
    let _post = is_edit? post_list.find((p)=>p.id ===post_id):null;
    React.useEffect(()=>{
        if(is_edit && !_post){
            console.log("포스트 정보가 없어요");
            history.goBack();
            return;
        }
        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_url));
        }
    },[]);
    const preview =useSelector((state)=>state.image.preview);
    const dispatch =useDispatch();
    const is_login = useSelector((state)=>state.user.is_login);
    const [selectNum,changeSelect] =React.useState("first");
    const returnVal =(e)=>{
        changeSelect(e.target.value);
    }
    const [contents,setContents] =React.useState(_post? _post.contents :"");
    const changeContents =(e)=>{
        setContents(e.target.value);
    }

    const addPost =()=>{
        dispatch(postActions.addPostFB(contents,selectNum));
    }
    if(!is_login){
        return(
            <Grid>
                <Text bold size="16px">로그인 후에 글을 작성하실 수 있습니다</Text>
            </Grid>
        )
    }
    return(
        <React.Fragment>
            <div style={{margin:"100px auto", width:"80%"}}>
                <div>
                    <Text size="36px" bold>{is_edit ?"게시글 수정":"게시글 작성"}</Text>
                    <Upload/>
                    <input type='radio' name="select" value='first' onChange={returnVal}/>오른쪽에 이미지 왼쪽에 텍스트
                    <Grid is_flex bg="#f3f3f3">
                        <Grid>
                            <Image shape="rectangle" src={preview? preview : "http://file3.instiz.net/data/cached_img/upload/2018/11/08/19/fb91acb380f27fcd634a9d4e3e87c7f3.jpg"}/>
                        </Grid>
                        <Grid>
                            <Text>{props.contents}</Text>
                        </Grid>
                    </Grid>
                    <input type='radio' name="select" value='second' onChange={returnVal}/>오른쪽에 이미지 왼쪽에 텍스트
                    <Grid is_flex bg="#f3f3f3">
                        <Grid>
                            <Text>{props.contents}</Text>
                        </Grid>
                        <Grid>
                            <Image shape="rectangle" 
                            src={preview? preview : "http://file3.instiz.net/data/cached_img/upload/2018/11/08/19/fb91acb380f27fcd634a9d4e3e87c7f3.jpg"}/>
                        </Grid>
                    </Grid>
                    <input type='radio'  name="select" value='third' onChange={returnVal}/>상단에 이미지 하단에 텍스트
                    <Grid bg="#f3f3f3">
                        <Image shape="rectangle" width="100%"  src={preview? preview : "http://file3.instiz.net/data/cached_img/upload/2018/11/08/19/fb91acb380f27fcd634a9d4e3e87c7f3.jpg"}/>
                        <Text>{props.contents}</Text>
                    </Grid>
                    <Input 
                    value={contents}
    
                    placeholder="게시글작성" 
                    multiLine _onChange={changeContents}/>
                    {is_edit? (<Button text="게시글 수정" _onClick ={editPost}></Button>) :
                    (<Button text="게시글 작성" _onClick ={addPost}></Button>)}
                    
                </div>
            </div>
            
            
        </React.Fragment>
    )
}

PostWrite.defaultProps={
    image_url:"https://pbs.twimg.com/media/EfvkJNRUYAIl7GU.jpg:large",
    contents:"원우 이 날은 백번을 봐도 미친거같아",
    preview:"https://pbs.twimg.com/media/EfvkJNRUYAIl7GU.jpg:large"
}
export default PostWrite;
