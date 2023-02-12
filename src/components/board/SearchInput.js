import { useState } from "react";
import { authheader } from "../../service/ApiService";
import "./boardCSS/SearchInput.css";
import { BsSearch } from "react-icons/bs";

const BoardForm = ({ value, onChange, activeEnter, handleClick }) => {
  authheader();

  const [modalOpen, setModalOpen] = useState(false);

  const isModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="BoardForm">
      <div className="inputBox">
        <input
          className="searchInput"
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={activeEnter}
        />
        <BsSearch
          onClick={handleClick}
          className="btn"
          size={20}
          style={{ color: '#aaa' }}
        />
      </div>
    </div>
  );
};

export default BoardForm;
