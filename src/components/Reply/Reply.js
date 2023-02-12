import { Height } from "@material-ui/icons";
import React, { useState } from "react";
import usefetch from "../../hooks/useAxios";
import UserImg from "./UserImg";
import "./reply.css"
import TextTranslate from "./TextTranslate";
import axios from "axios";

// 댓글은 보드넘버가 필요
export default function Reply({ bno, check, user_email }) {
  const [update, setUpdate] = useState('none')
  const [replyContent, setReplyContent] = useState('')
  const [replyid, setReplyId] = useState('')
  const [email, setEmail] = useState('')

  const reply = usefetch(`http://localhost:8080/reply/request/${bno}`)

  const handleChange = (e) => {
    setReplyContent(e.target.value)
  }

  const handleUpdate = () => {
    if (email != user_email) {
      console.log(email, user_email)
      alert("작성한 사람 이외는 수정할 수 없습니다.")
    } else {
      axios.put(`/reply/replyupdate/${replyid}`,
        {
          replyContent: replyContent,
          email: email
        })
        .then(res => {
          alert("댓글이 수정되었습니다.")
          window.location.reload();
        })
    }
  }

  const updateReply = (content, id, email) => {
    if (email != user_email) {
      alert("작성한 사람 이외는 수정할 수 없습니다.")
    } else {
      setUpdate('on')
      setReplyContent(content)
      setReplyId(id)
      setEmail(email)
    }
  }

  const deleteReply = (id, email) => {
    if (email != user_email) {
      alert("작성한 사람 이외는 삭제할 수 없습니다.")
    } else {
      if (window.confirm("진짜 삭제하시겠습니까?")) {
        axios.delete(`/reply/delete/${id}`,
        )
          .then(res => {
            alert("댓글이 삭제되었습니다.")
            window.location.reload();
          })
      }
    }
  }



  return (
    <>
      {check === "1" &&
        reply.length !== 0 && reply.data.map((reply, idx) => (
          <div className="replyForm" key={idx}>
            <div className="box">
              <UserImg
                email={reply.email} />
            </div>
            {update === 'none' &&
              <div className="reply-content">
                <div>
                  <div>{reply.email}</div>
                  <div>{reply.indate}</div>
                  <div>{reply.replyContent}</div>
                </div>
                <div>
                  <button onClick={() => updateReply(reply.replyContent, reply.id, reply.email)}>댓글 수정</button>
                  <button onClick={() => deleteReply(reply.id, reply.email)}>댓글 삭제</button>
                </div>
                <TextTranslate text={reply.replyContent} />
              </div>
            }
            {update === 'on' &&
              <div>
                <textarea defaultValue={reply.replyContent} onChange={handleChange}></textarea>
                <button className="saveBtn" onClick={handleUpdate}>
                  수정
                </button>
              </div>
            }
          </div>
        ))}
      {check === "2" &&
        reply.length !== 0 && reply.data.reverse().map((reply, idx) => (
          idx === 0 &&
          <div className="replyForm" key={idx}>
            <div className="box">
              <UserImg
                email={reply.email} />
            </div>
            <div>{reply.email}</div>
            <div>{reply.indate}</div>
            <div>{reply.replyContent}</div>
            <TextTranslate text={reply.replyContent} />
          </div>
        ))
      }

    </>
  )


}