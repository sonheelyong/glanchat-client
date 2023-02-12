import './friendsCSS/Friends.css';
import FriendsList from './FriendsList';
import RequestFriendList from './RequestFriendList';
import RequireFriendsList from './RequireFriendList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Friends = () => {

  const [frinedList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [requireList, setRequireList] = useState([]);
  const [isRequest, setIsRequest] = useState(false);

  //친구 목록
  useEffect(() => {
    axios.get("/friendlist/consent")
      .then((res) => {
        setFriendList(res.data);
      })
  }, []);

  //보낸 요청 목록
  useEffect(() => {
    axios.get(`/friendlist/request`)
      .then((res) => {
        setRequestList(res.data);
        setIsRequest(true);
      })
  }, []);

  //받은 요청 목록
  useEffect(() => {
    axios.get(`/friendlist/require`)
      .then((res) => {
        setRequireList(res.data);
      })
  }, []);

  return (
    <>
      <div className="tabs">
        <input
          type="radio"
          defaultChecked
          name="tabs_item"
          id="friendsList"
        />
        <label
          className="tabs_item"
          htmlFor="friendsList"
        >
          친구 목록
        </label>

        <input
          type="radio"
          name="tabs_item"
          id="follower"
        />
        <label
          className="tabs_item"
          htmlFor="follower"
        >
          친구 요청
        </label>

        <div className='tab_con' id="friendsList_con">
          <div>
            {frinedList.length === 0 &&
              requestList.length === 0 ?
              (
                <div className='labelState'>친구를 찾아보세요!</div>
              )
              :
              null
            }
            {frinedList.map((item) => (
              <FriendsList key={item.id} {...item} />
            ))}
            {requestList.map((item) => (
              <RequestFriendList
                key={item.id}
                {...item}
                isRequest={isRequest}
              />
            ))}
          </div>
        </div>
        <div className='tab_con' id="follower_con">
          <div>
            {requireList.length === 0 ?
              (
                <div className='labelState'>아직 요청이 없습니다.</div>
              )
              :
              null
            }
            {requireList.map((item) => (
              <RequireFriendsList key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default Friends;