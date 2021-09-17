import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';


const NewMeetup=()=>{
   const router= useRouter();
    async function AddMeetUpHandler(entereddata){
  const response=await fetch('/api/new-meetup',{
      method:'POST',
      body:JSON.stringify(entereddata),
      headers:{
          'Content-type':'application/json'
      }
  });
  const data=await response.json();
  console.log(data);
  router.push('/');
    }
return(
<React.Fragment>
    <Head>
      <title>Add New Meetups</title>
      <meta name="decription" content='browse a huge list of highly active react'></meta></Head>
    <NewMeetupForm  onAddMeetup={AddMeetUpHandler}/>
    </React.Fragment>
);
}
export default NewMeetup;