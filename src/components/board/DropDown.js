import React, { useState, useEffect } from "react";
import './boardCSS/DropDown.css';

const DropDown = props => {
    const [visibilityAnimation, setVisibilityAnimation] = useState(false);
    const [repeat, setRepeat] = useState(null);

    useEffect(() => {
        if (props.visibility) {
            clearTimeout(repeat);
            setRepeat(null);
            setVisibilityAnimation(true);
        } else {
            setRepeat(
                setTimeout(() => {
                    setVisibilityAnimation(false);
                }, 400)
            );
        }
    }, [props.visibility]);

    return (
        <article
            className={`components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
            {visibilityAnimation && props.children}
        </article>
    )
};

export default DropDown;
