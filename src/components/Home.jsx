import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { DotSpinner } from '@uiball/loaders';

function Home() {
  const navigate = useNavigate();

  const startChat = () => {
    navigate('/login');
  }


  return (
    
    <>
      <div className='homeBackground'>
        <label className='buttomLabel'>WelCome !</label>
        <div id='SpinnerStyle'>
          <DotSpinner size={200} speed={1.3} color={'#dfb8b8'}  />
          <label className='titleName'>글랜챗</label>
        </div>

        <button className='startButton' onClick={startChat}>시작하기</button>
      </div>
    </>
    
  )
}

export default Home
