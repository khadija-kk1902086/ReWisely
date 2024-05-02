import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'

import 'swiper/css'


import './Carousel.css'

const slider = [
    {
        title: "Mind map",
        description: "Generate a Mind Map from your notes! Convert your notes to a beautiful mind map that will make you understand your lectures more.",
        url:  '/mind-map'
      },
      {
        title: "Summary",
        description: "Simplify your notes through a summary.",
        url: "/text-summary"
      },
      {
        title: "Flash cards",
        description: "Customize flash cards to your notes.",
        url: "/flash-cards"
      },
    
      {
        title: "Q & A",
        description: "Test yourself with your information.",
        url: "/questions-answers"
      },
 
      {
        title: "Feynman technique",
        description: "Explore the Feynman Technique.",
        url: "/learning-technique"
      },
   
]


const Carousel = () => {

    const handleClick = (route) => {
        window.location.href = route;
      };

  return (
    <div className='</div>'>
    <div className='carousel'>
        <div>
            <div className='carousel-content'>
                {/* <span>AI-POWERD REVISION WEBSITE</span> */}
                <h1>ReWisely</h1>
                <h3 className='slogan'>Revise Wisely.. Trust ReWisely!</h3>
                <hr />
                <p> A comprehensive revision tool supported by AI helping in creating
          personalized material on your cognitive needs</p>
                <a href="/all-features" className='slider-btn' >Explore features</a>
            </div>
        </div>

        <Swiper 
        className='myswiper'
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true
        }}
        loop={true}
        pagination={{clickable: true}}

        autoplay={{
            delay: 5000,
            disableOnInteraction: false
        }}
        breakpoints={{
            640: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1
            },
            1024: {
                slidesPerView: 2
            },
            1560: {
                slidesPerView: 3
            },
        }}
        
        >
            
               <SwiperSlide className="myswiper-slider" id='firstSlide' >
                        <div >
                            <h2>{slider[0].title}</h2>
                            <p>{slider[0].description}</p>
                            <a href={`${slider[0].url}`} target="_blank" className='slider-btn'  onClick={() => handleClick("/mind-map")}>explore</a>
                        </div>
                </SwiperSlide>


<SwiperSlide className="myswiper-slider" id='secondSlide'>
                        <div className='secondSlide'>
                            <h2>{slider[1].title}</h2>
                            <p>{slider[1].description}</p>
                            <a href={`${slider[1].url}`} target="_blank" className='slider-btn' onClick={() => handleClick("/text-summary")}>explore</a>
                        </div>
                </SwiperSlide>


 <SwiperSlide className="myswiper-slider" id='thirdSlide'>
                        <div className='thirdSlide'>
                            <h2>{slider[2].title}</h2>
                            <p>{slider[2].description}</p>
                            <a href={`${slider[2].url}`} target="_blank" className='slider-btn' onClick={() => handleClick("/flash-cards")}>explore</a>
                        </div>
                </SwiperSlide>


 <SwiperSlide className="myswiper-slider" id='fourthSlide'>
                        <div  className='fourthSlide'>
                            <h2>{slider[3].title}</h2>
                            <p>{slider[3].description}</p>
                            <a href={`${slider[3].url}`} target="_blank" className='slider-btn'  onClick={() => handleClick("/questions-answers")}>explore</a>
                        </div>
                </SwiperSlide>


 <SwiperSlide className="myswiper-slider" id='fifthSlide'>
                        <div >
                            <h2>{slider[4].title}</h2>
                            <p>{slider[4].description}</p>
                            <a href={`${slider[4].url}`} target="_blank" className='slider-btn' onClick={() => handleClick("/learning-technique")}>explore</a>
                        </div>
                </SwiperSlide>

        </Swiper>

      
    </div>
    </div>
  )
}

export default Carousel