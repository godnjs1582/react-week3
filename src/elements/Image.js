import styled from 'styled-components';
import React from 'react';

const Image =(props)=>{
    const{shape,src,size,width,marginLeft} = props;
    const styles={
        src:src,
        size:size,
        width:width,
        marginLeft:marginLeft,
    }

    if(shape==="circle"){
        return(
            <ImageCircle {...styles}></ImageCircle>
        )
    }
    if(shape==="rectangle"){
        return(
            <AspectOutter {...styles}>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }
    return(
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}
Image.defaultProps={
    shape:"circle",
    src:"https://pbs.twimg.com/media/EfvkJNRUYAIl7GU.jpg:large",
    size:36,
    width:"100%",
    marginLeft:false,
};

const ImageDefault =styled.div`
--size:${(props)=>props.size}px;
width:var(--size);
height:var(--size);
background-image:url("${(props)=>props.src}");
background-size:cover;
`
const ImageCircle =styled.div`
--size:${(props)=>props.size}px;
width:var(--size);
height:var(--size);
border-radius:50%;
background-image:url("${(props)=>props.src}");
background-size:cover;
margin:4px;
`;
const AspectOutter =styled.div`
width:${(props)=>props.width};
min-width:350px;
margin-left:${(props)=>props.marginLeft};
`;
const AspectInner=styled.div`
position:relative;
padding-top:75%;
over-flow:hidden;
background-image:url("${(props)=>props.src}");
background-size:cover;
`;
export default Image;