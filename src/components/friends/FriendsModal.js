import './friendsCSS/FriendsModal.css';


const Friends = (props) => {
  const { open, close, header } = props;

  return (
    <div className={open ? "openFriendsModal Friendsmodal" : "Friendsmodal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};

export default Friends;