import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import React from 'react';
import Head from 'next/head';





const HomePage=(props)=>{
    
return(
    <React.Fragment>
  <Head>
      <title>React Meetups</title>
      <meta name="decription" content='browse a huge list of highly active react'></meta>
  </Head>
    <MeetupList meetups={props.meetups}/>
    </React.Fragment>
);
}

 export async function getStaticProps(){
    const client= await MongoClient.connect('mongodb+srv://sarvani:xyzxyzxyz@cluster0.aydwn.mongodb.net/meetups?retryWrites=true&w=majority');
 const db=client.db();
 const meetupsCollection=db.collection('meetups');
const meetups= await  meetupsCollection.find().toArray();

  
  client.close();
    return{
        props:{
  meetups:meetups.map((meetup)=>({
      title:meetup.title,
      address:meetup.address,
      image:meetup.image,
      id:meetup._id.toString()

  }))
        },
        revalidate:10
    }
} 
/* export async function getServerSideProps(context){
    const req=context.req;
    const res=context.res;
return {
    props:{
        meetups:DUMMY_MEETUPS 
    }
}
} */
export default HomePage;