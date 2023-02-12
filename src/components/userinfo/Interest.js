import React, { useState } from "react";
import { authheader } from "../../service/ApiService";
import axios from "axios";

export default function Interest() {

  authheader()

  // 관심사 리스트 데이터
  const formData = [
    { id: 1, name: 'game' },
    { id: 2, name: 'music' },
    { id: 3, name: 'movie' },
    { id: 4, name: 'travel' },
    { id: 5, name: 'sports' },
    { id: 6, name: 'food' },
  ]

  // 체크하고 나면 저장하는 set
  const [checkedItems, setCheckedItems] = useState(new Set());

  //체크했을 때 불려지는 함수
  const checkHandler = ({ target }) => {
    //총 3개만 체크 되도록
    if (checkedItems.size < 3) {
      checkedItemHandler(target.parentNode, target.value, target.checked);
    } else if (checkedItems.size === 3) {
      target.checked = false
      checkedItemHandler(target.parentNode, target.value, target.checked);
    }
  };

  //checkedItems에 저장하는 함수
  const checkedItemHandler = (box, id, isChecked) => {
    if (checkedItems.size < 3) {
      if (isChecked) {
        checkedItems.add(id);
        setCheckedItems(checkedItems);
        box.style.backgroundeColor = '#F6CB44';
      } else if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
        setCheckedItems(checkedItems);
        box.style.backgroundeColor = '#fff';
      }

      //checkedItems의 길이가 3이 되는 순간 삭제만 되도록
    } else if (checkedItems.size === 3) {
      if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
        setCheckedItems(checkedItems);
        box.style.backgroundeColor = '#fff';
      }
    }

    return checkedItems;
  }

  // checkedItems를 백으로 보내는 함수
  function SubmitCheckedItems(e) {
    //리스트 변수 생성
    const submitItems = []
    e.preventDefault();
    
    //반복문을 활용해서 데이터 저장
    for (let key of checkedItems) {
      submitItems.push(key)
    }
    
    //fetch를 활용해서 백으로 데이터 전송
    authheader()
    axios.put(`/favoriteList/plus${window.location.search}`, 
      {
        a: submitItems[0],
        b: submitItems[1],
        c: submitItems[2],
      }
      )
        window.location.href = `/login`
      
  }



  return (
    <div>
      <h1>관심 있는 주제를 최대 3개까지 선택해주세요</h1>
      {formData.map((item) => (
        <label key={item.id}> {item.name}
          <input type="checkbox" value={item.name} onChange={(e) => checkHandler(e)} />
        </label>
      ))}
      <div>
        <button onClick={SubmitCheckedItems}>선택</button>
      </div>
    </div>
  );
};