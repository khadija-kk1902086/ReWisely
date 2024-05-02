import Link from 'next/link'
import React from 'react'

function AllFeatures() {
  return (

    <div>
       <p className="container-title">Here are the features<br/>we’re proud of</p>

        <div className="featureContainer">
 
  <div className="gradient-cards">
    <div className="featureCard">
      <div className="container-card bg-green-box">
 
        <p className="card-title"> <Link href="/mind-map">Mind Map</Link></p>
        <p className="card-description"> </p>
       
      </div>
    </div>

    <div className="featureCard">
      <div className="container-card bg-white-box">
 
        <p className="card-title"> <Link href="/flash-cards">Flash Cards</Link></p>
        <p className="card-description"> </p>
       
      </div>
    </div>

    <div className="featureCard">
      <div className="container-card bg-yellow-box">
  
        <p className="card-title"> <Link href="/questions-answers">Q and A</Link></p>
        <p className="card-description"> </p>
       
      </div>
    </div>

    <div className="featureCard">
      <div className="container-card bg-blue-box">
   
        <p className="card-title"> <Link href="/learning-technique">Learning Technique</Link></p>
        <p className="card-description"></p>
       
      </div>
    </div>

    <div className="featureCard">
      <div className="container-card bg-blue-box">
 
        <p className="card-title"> <Link href="/text-summary">Summary</Link></p>
        <p className="card-description"> </p>
       
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AllFeatures