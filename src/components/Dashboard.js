import React, { useRef } from "react";
import { Line, Bar } from "react-chartjs-2";

function Dashboard({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  if (price === "0.00") {
    return (
        <>
       
          <div className="selectcoin">Select Coin</div>
         
           <div className="dash">
            <div class="gallery">
                  <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQhReM3agpH8u4BM1GgfRHdYM50M9ufGr8A&usqp=CAU"/>
                  <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRTucXos5INGlT2bTLWxFKqsm8PmHHJq-fA&usqp=CAU"/>
                  <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvXR8kWxDug3xGS8h3N-kxKr8Pt1M78bKAQ&usqp=CAU"/>
                  <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9a73UyA4NB2pLt0Wn9Ve2XwJmkSYOEMs6Hw&usqp=CAU"/>
            </div>
              <div class="waviy">
                  <span >N</span>
                  <span >E</span>
                  <span >X</span>
                  <span >T</span><br/> <br/>
                  <span >G</span>
                  <span >E</span>
                  <span >N</span>
                  <br/><br/>
                  <span >C</span>
                  <span >O</span>
                  <span >I</span>
                  <span >N</span>
                  <span >S</span>
                  <span >.</span>
              </div>
           
           </div>
           
       
        
        </>
    
    )
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Bar data={data} options={opts} />
      </div>
    </div>
  );
}

export default Dashboard;