import React from "react"
import countryList from "react-select-country-list";
import Local from "./Local";
import Email from "./Email";
import UserName from "./UserName";
import Passwd from "./Passwd";
import PhoneNumber from "./PhoneNumber";
import VerificationCoden from "./VerificationCoden";
import "./Registry.css";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";




export default class registry extends React.Component {

  constructor() {
    super()
     
    this.state = {
      local: "",
      options: countryList().getData(),
      phoneNumber: "",
      email: "",
      username: "",
      passwd: "",
      verificationCoden: "",
      authck:0,
      passck:0,
      emailck:0,
      usernameck:0,
      usernamecoment:"",
      emailcoment:"",
      passwdcoment:"",
    }
   
  }
 

  LocalChangeInput(local) {
    this.setState({
      local,
    })
  }

  phoneNumberChangeInput(phoneNumber) {
    this.setState({
      phoneNumber,
    })
  }

 

  emailChangeInput(email) {
    let regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (regex.test(email) === false) {
      this.setState({ emailcoment: "올바른 이메일 형식을 입력해주세요" });
    }else{

    axios.get('/auth/byemail', {
      params:{email:email }
    })
    .then((response) => {
     
        console.log(response.data)     
        this.setState({ emailcoment: "사용 가능한 이메일 입니다" });
        // this.setState({ passwdcoment:'',usernamecoment:''})
        this.changeemailck("1")
     }) 
    .catch((error) => {
    console.log(error)
    this.setState({ emailcoment: "이미 등록된 이메일 입니다" });
    this.changeemailck("0")
    })
  }

    this.setState({
      email,
    })
  }
  
  UsernameChangeInput(username) {
    if(username.length < 2){
      this.setState({ usernamecoment: "닉네임을 2글자 이상 입력해주세요" });
      this.changeusernameck("0")
     }else{
     
    axios.get('/auth/byusername', {
      params:{username:username }
    })
    .then((response) => {
     
        console.log(response.data)     
        this.setState({ usernamecoment: "사용 가능한 닉네임 입니다" });
        // this.setState({ passwdcoment:'',emailcoment:''})
        this.changeusernameck("1")
     }) 
    .catch((error) => {
    console.log(error)
    this.setState({ usernamecoment: "이미 등록된 닉네임 입니다" });
    this.changeusernameck("0")
    })
  }
    this.setState({
      username,
    })
  }

  

  
  passwdChangeInput(passwd) {

    let regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (regex1.test(passwd) === false) {
      this.setState({ passwdcoment: "6자리 이상,영문,숫자조합의 비밀번호를 입력해주세요" });
      this.changepassck("0")
    }else{
      this.setState({ passwdcoment: "사용가능한 비밀번호 입니다" });
      this.changepassck("1")
      // this.setState({ usernamecoment:'',emailcoment:''})
    }
    this.setState({
      passwd,
    })
  }

  verificationCodenInput(verificationCoden) {
    this.setState({
      verificationCoden,
    })
  }

  changeauthck(authck){
    this.setState({
      authck,
    })
  }

  changepassck(passck){
    this.setState({
      passck,
    })
  }

  changeemailck(emailck){
    this.setState({
      emailck,
    })
  }

  changeusernameck(usernameck){
    this.setState({
      usernameck,
    })
  }

  

  sendVerificationCoden = (event) => {
    event.preventDefault();
    const { verificationCoden, phoneNumber } = this.state;
    console.log(verificationCoden, phoneNumber);

    axios.get('auth/byphone', {
      params:{phonenumber:phoneNumber }
    })
    .then(function (response) {
        console.log(response.data)

        axios.post('auth/sendauth', 
    {
           phonenumber : phoneNumber
    }
    )
    .then(function (response) {
        console.log(response)
        alert("인증번호 보냄")
    })
    .catch(function (response) {
        alert("인증번호 전송 실패")
    })


    })
    .catch(function (error) {
        console.log(error)
        alert("이미 등록된 핸드폰 번호 입니다.");
    })

  }
  

  CheckVerificationCoden = (event) => {
    event.preventDefault();
    const { verificationCoden,authck } = this.state;
    console.log(verificationCoden);
    
    axios.post('/auth/check', 
    {
        cknum:verificationCoden
    }
    )
    .then((response) => {
        console.log(response)

        alert("인증완료")
        this.changeauthck("1")
        console.log("체크카운트"+authck)
    })
    .catch((error) => {
        console.log(error)
        this.changeauthck("0")
        alert("인증번호를 다시 확인해주세요.")
        // console.log("ck"+inputCknum)
    })
  }

   



  
  registry_submit = (event) => {
    event.preventDefault();
    const { local, phoneNumber, email, username, passwd, authck, passck, usernameck, emailck } = this.state;
    console.log(local, phoneNumber, email, username, passwd, authck, passck, usernameck, emailck );

    if (authck === 0) {
      alert("핸드폰 인증을 완료해 주세요.");
      return false;
    }

    if (emailck === 0) {
      alert("올바른 이메일을 입력해 주세요.");
      return false;
    }

    if (usernameck === 0) {
      alert("올바른 닉네임을 입력해 주세요.");
      return false;
    }

    if (passck === 0) {
      alert("올바른 비밀번호를 입력해 주세요.");
      return false;
    }
    
  
    if (email.length === 0) {
      alert("이메일을 입력하지 않았습니다.");
      return false;
    }

    let regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (regex.test(email) === false) {
      alert("이메일 형식이 올바르지 않습니다.");
      this.setState({
        email: "",
      });
      return false;
    }

    if (username.length === 0) {
      alert("닉네임을 입력하지 않았습니다.");
      return false;
    }
    
    // let regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    // if (regex.test(passwd) === false) {
    //   alert("비밀번호 형식이 올바르지 않습니다.");
    //   this.setState({
    //     passwd: "",
    //   });
    //   return false;
    // }


    if (passwd.length === 0) {
      alert("비밀번호를 입력하지 않았습니다.");
      return false;
    }
   
    axios.post('auth/signup', 
    {
        email: email,
        local: local,
        phonenumber : phoneNumber,
        password: passwd,
        username: username
    }
    )
    .then((response) => {
        console.log(response)
        
        alert("회원가입 완료.")
        window.location.href = `/interest?email=${email}`;
        this.changeauthck("0")
        this.changepassck("0")
        this.changeemailck("0")
        this.changeusernameck("0")
    })
    .catch((error) => {
        console.log(error)
        alert("가입실패.");
    })

    axios.post('/favoriteList/create',
    {email : email}
    )
  }




  render() {
    const { local, phoneNumber, email, username, passwd, verificationCoden, usernamecoment,
            emailcoment, passwdcoment } = this.state

    return (
      <>
        <div className="registryDiv">
          <h1 className="h1">글랜챗</h1>
          <div className="registryForm">
            <Container component="main" maxWidth="xs" style={{ marginTop: "4%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    회원가입
                  </Typography>
                </Grid>
              </Grid>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Local
                      value={local}
                      onChange={(value) => this.LocalChangeInput(value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <PhoneNumber
                      value={phoneNumber}
                      onChange={(value) => this.phoneNumberChangeInput(value)} />
                    <Button
                      className="Send-verification-coden"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: '#dfb8b8', width: '25%', height: '80%',
                        borderRadius: '1rem',
                      }}
                      onClick={this.sendVerificationCoden}
                    >
                      인증번호 보내기
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                  <VerificationCoden
                      value={verificationCoden}
                      onChange={(value) => this.verificationCodenInput(value)} />
                    <Button
                      className="Check-verification-coden"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: '#dfb8b8', width: '25%', height: '80%',
                        borderRadius: '1rem',
                      }}
                      onClick={this.CheckVerificationCoden}
                    >
                      인증번호 확인
                      </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Email
                      value={email}
                      onChange={(value) => this.emailChangeInput(value)}
                      id="email" />
                      <div>
                        {emailcoment}
                      </div>
                  </Grid>
                  <Grid item xs={12}>
                    <UserName
                      value={username}
                      onChange={(value) => this.UsernameChangeInput(value)} />
                      <div>
                        {usernamecoment}
                      </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Passwd
                      value={passwd}
                      onChange={(value) => this.passwdChangeInput(value)} />
                      <div>
                        {passwdcoment}
                      </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className="registrybtn"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: '#dfb8b8', width: '80%',
                        borderRadius: '3rem'
                      }}
                      onClick={this.registry_submit}
                    >
                      회원가입
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        </div>
      </>
    )
  }

}