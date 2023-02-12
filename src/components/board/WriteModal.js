import { useState, useEffect } from "react";
import axios from "axios";
import "./boardCSS/Modal.css";

const WriteModal = (props) => {
  const { open, close, header } = props;

  const [value, setValue] = useState("");
  const [languageSelect, setLanguageSelect] = useState("");
  const languageSelectFocus = document.getElementById("languageSelect");


  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const languageSelectChange = (e) => {
    setLanguageSelect(e.target.value);
  };

  const handleSubmit = () => {
    if (languageSelect !== "" && value !== "") {
      axios.post("/board/write", {
        boardContent: value,
        boardCategory: languageSelect,
      })
        .then((res) => {
          setValue(res.data);
          window.location.reload();
        })
    } else {
      languageSelectFocus.focus();
    }
  };

  //외부 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);


  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="modalInfo">
              <select
                id="languageSelect"
                className="languageSelect"
                defaultValue={languageSelect}
                onChange={languageSelectChange}
              >
                <option value="" disabled>
                  언어를 선택해주세요.
                </option>
                <option value="🇰🇷 Korean">Korean</option>
                <option value="🇺🇸 English">English</option>
                <option value="🇯🇵 Japan">Japanese</option>
              </select>
              <textarea
                className="modalContent"
                defaultValue={value}
                onChange={handleChange}
              />
            </div>
          </main>
          <footer>
            <button className="saveBtn" onClick={handleSubmit}>
              저장
            </button>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default WriteModal;
