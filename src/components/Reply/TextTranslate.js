import React, { useEffect, useState } from "react";
import { authheader } from "../../service/ApiService";
import axios from "axios";

const TextTranslate = (text) => {
  authheader()
  const [langCode, setLangCode] = useState('');
  const [result, setResult] = useState('');

  const trText = text.text;
  //타겟이 되는 텍스트의 국가 코드 뽑기
  useEffect(()=>{
    setLangCode(
      axios.get('/detect/check', {
      params : {
        text : trText  
      }
    })
    .then( function (res) {
      console.log(res);
      setLangCode(res.data.langCode)
    })
    .catch (function (res) {
      console.log(res)
    }))
  },[])
  

  const Translate = () => {
    //번역하기
    axios.get('/translate/check',
      {
        params: {
          text: trText,
          source: langCode,
        }
      })
      .then(
        function (res) {
          console.log(res)
          setResult(res.data.message.result.translatedText)
        })
      .catch(res => console.log(res))

  }

  return (
    <>
      <button onClick={() => Translate()} > 번역 </button>
      {result !== null && <div>{result}</div> }
    </>
  )
}

export default TextTranslate;