import { Fragment } from "react";
import MeetupDetails from "../components/meetups/MeetupDetails";
import { MongoClient,ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetail=(props)=>{
return(
    <Fragment>
        <Head>
      <title>{props.meetupData.title}</title>
      <meta name="decription" content='browse a huge list of highly active react'></meta>
      </Head>
        <MeetupDetails  
         image={props.meetupData.image}
         title={props.meetupData.title}
         address={props.meetupData.address}
         description={props.meetupData.description}
      
        />
    </Fragment>
);
}
export async function getStaticPaths(){

    const client= await MongoClient.connect('mongodb+srv://sarvani:xyzxyzxyz@cluster0.aydwn.mongodb.net/meetups?retryWrites=true&w=majority');
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
   const meetups= await  meetupsCollection.find({},{_id:1}).toArray();
   
     
    client.close();
    return{
        fallback:false,
        paths:meetups.map((id)=>({params:{meetupId:id._id.toString()}}))
        
      /*   [{
       params:{
           meetupId:'m1'
       },
       params:{
        meetupId:'m2'
    }
        }] */
    }
}
export async function getStaticProps(context){
   const meetupId= context.params.meetupId;

   const client= await MongoClient.connect('mongodb+srv://sarvani:xyzxyzxyz@cluster0.aydwn.mongodb.net/meetups?retryWrites=true&w=majority');
   const db=client.db();
   const meetupsCollection=db.collection('meetups');
  const selectedMeetupps= await  meetupsCollection.findOne({_id:ObjectId(meetupId)});
  
    
   client.close();
    return{
        props:{
 meetupData:{
     id:selectedMeetupps._id.toString(),
     title:selectedMeetupps.address,
     image:selectedMeetupps.image,
     description:selectedMeetupps.description
 }
        }
    }
}
export default MeetupDetail;