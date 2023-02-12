/* eslint-disable */

import React, { useEffect, useState } from 'react';
import './GoogleLoginCss.css';
import jwt_decode from 'jwt-decode';
// 111
export default function GoogleLoginButton() {

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log('Encoded JWT id token' + response.credential);
        // let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        setUser(response.credential);
        document.getElementById('googleSignInDiv').hidden = true;
        
    }

    function handleSignOut(e) {
        setUser({});
        document.getElementById('googleSignInDiv').hidden = false;
    }


    useEffect(() => {
 
        google.accounts.id.initialize({
            client_id: "662818922452-8evkfn0vqon57a3vbcrmk30qgkutj4qf.apps.googleusercontent.com",
            callback: handleCallbackResponse
            
        });

        google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            {theme: 'outline', size: 'large'}
        );
        
        // google.accounts.id.prompt();

    }, [] );

    function onSignIn(e){
        e.preventDefault();
        fetch('/googleToken', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                token:user
                
            }),
        })
        .then(res => {
            alert("success")
            
        })
    }


    return (
        <>
        <div id='googleSignInDiv' style={{margin: 'auto', borderRadius: '3rem'}}></div>
        { Object.keys(user).length != 0 &&
         <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
        }

        
        {user && 
            <div>
                <img src={user.picture}></img>
                <h3>{user.name}</h3>
                
            </div>
        }
        <button onClick={onSignIn}>Check</button>
        </>
    );
}

