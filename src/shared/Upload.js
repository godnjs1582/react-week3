import React from "react";
import styled from "styled-components";
import { Button } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload =(props)=>{
    const is_uploading = useSelector(state=>state.image.uploading);
    const dispatch =useDispatch();
    const fileInput =React.useRef();
    const selectFile =(e)=>{
        const reader =new FileReader();
        const file =fileInput.current.files[0];
        reader.readAsDataURL(file);
        reader.onloadend =()=>{
            dispatch(imageActions.setPreview(reader.result));
        }
    }
    const uploadFB =()=>{
        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    }
    return(
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled ={is_uploading}></input>
            <Button _onClick={uploadFB}>파일업로드</Button>
        </React.Fragment>
    )

}

export default Upload;