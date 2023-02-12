import React, { useState, useCallback } from "react";
import axios from "axios";
import SearchList from "./SearchList";
import "./boardCSS/BoardList.css";
import { authheader } from "../../service/ApiService";
import useIntersection from "../../hooks/useIntersection";

const BoardList = () => {

  authheader();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios.get(`/board/list/${page}`)
      .then((res) => {
        if (res.data.length !== 0) {
          setItems((prevState) => [...prevState, ...res.data]);
        }
      });
    setLoading(false);
  }, [page]);

  const setObservationTarget = useIntersection(getItems);

  return (
    <div className="boardList">
      <div className="content">
        {!loading &&
          items.length === 0 &&
          page === 0 ?
          (<div className="boardLabelState">새로운 게시글을 작성해보세요!</div>)
          : null}
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <SearchList key={item.bno} {...item} />
          </React.Fragment>
        ))}
        {!loading && <div ref={setObservationTarget}></div>}
      </div>
    </div>
  );
};

export default BoardList;
