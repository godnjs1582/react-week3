import React from "react";
import {Grid,Text,Image} from "../elements";
import Card from "../components/Card";

const Notification =(props)=>{
    let noti =[
        {user_name :"aaaa",post_id:"post1",image_url:""},
        {user_name :"aaaa",post_id:"post2",image_url:""},
        {user_name :"aaaa",post_id:"post3",image_url:""},
        {user_name :"aaaa",post_id:"post4",image_url:""},
        {user_name :"aaaa",post_id:"post5",image_url:""},
    ];
    return(
        <React.Fragment>
            <Grid margin="100px auto" width="80%" >
                {noti.map((n)=>{
                    return(
                    <Card key={n.post_id}{...n}></Card>
                    )
                    })
                }
            </Grid>
        </React.Fragment>
    )
}

export default Notification;