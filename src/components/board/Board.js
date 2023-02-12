import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import { authheader } from '../../service/ApiService';
import SearchBoardList from './SearchBoardList';
import BoardList from './BoardList';
import Header from '../Header/Header';
import './boardCSS/Board.css';
import RecommendFriends from '../friends/RecommendFriends';

const Board = () => {

    authheader();

    const [searchItem, setSearchItem] = useState("");
    const [searchDataList, setSearchDataList] = useState([]);

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    };

    const handleClick = (e) => {
        if (searchItem !== '') {
            axios.get(`/board/search/${searchItem}`)
                .then((res) => {
                    setSearchDataList(res.data);
                })
        } else {
        }
    };

    const activeEnter = (e) => {
        if (e.key === 'Enter') {
            if (searchItem !== '') {
                handleClick();
            } else {
                alert('검색어를 입력해주세요.');
            }
        }
    };

    return (
        <div className="Board">
            <header>
                <Header>
                    <SearchInput
                        value={searchItem}
                        onChange={handleChange}
                        activeEnter={activeEnter}
                        handleClick={handleClick}
                    />
                </Header>
            </header>

            <RecommendFriends />

            {/* 게시글 목록 */}
            <div className='showList'>
                {searchDataList.length > 0 ?
                    <SearchBoardList
                        searchDataList={searchDataList} />
                    :
                    <BoardList />}
            </div>
        </div>
    );
}

export default Board;
