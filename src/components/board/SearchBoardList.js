import SearchList from "./SearchList";
import { authheader } from "../../service/ApiService";
import React from "react";
import './boardCSS/SearchBoardList.css';

const SearchBoardList = ({ searchDataList }) => {
  authheader();

  return (
    <div className="searchItem">
      <div className="content">
        {searchDataList.length === 0 ?
          (<div className="boardLabelState">새로운 게시글을 작성해보세요!</div>) : null}
        {searchDataList.map((item, idx) => (
          <React.Fragment key={idx}>
            <SearchList key={item.bno} {...item} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SearchBoardList;