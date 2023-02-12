import React from "react";
import { signin } from "../../service/ApiService";
import {
  Link,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import "./Login.css";
import GoogleLoginButton from "./GoogleLoginButton";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");


    // ApiService의 signin 메서드를 사용 해 로그인.
    signin({ email: email, password: password });
  }




  render() {


    return (
      <>
        <div className="loginDiv">
          <h1 className="h1">글랜챗</h1>
          <div className="loginForm">

            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    로그인
                  </Typography>
                </Grid>
              </Grid>
              <form noValidate onSubmit={this.handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="이메일 주소"
                      name="email"
                      autoComplete="email"
                      style={{ width: '80%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="패스워드"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      style={{ width: '80%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="/signup" variant="body2" style={{ color: '#dfb8b8' }}>
                      <Button
                        className="loginBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#dfb8b8', width: '80%' }}
                      >
                        로그인
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={5}>
                    <Link href="/findId" variant="body2" style={{ color: '#dfb8b8' }}>
                      <label className="findIdBtn" style={{ margin: 'auto' }}>아이디 찾기</label>
                    </Link>
                  </Grid>


                  <Grid item xs={5}>
                    <Link href="/findPw" variant="body2" style={{ color: '#dfb8b8' }}>
                      <label className="findPwBtn" style={{ margin: 'auto' }}>비밀번호 찾기</label>
                    </Link>
                  </Grid>


                  <Grid item xs={12}>
                    <Link href="/registry" variant="body2" style={{ color: '#dfb8b8' }}>
                      <Button
                        className="signupBtn"
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: '#dfb8b8', width: '80%',
                          borderRadius: '3rem', marginTop: '2rem'
                        }}
                      >
                        회원가입
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    {/* <GoogleLoginButton /> */}
                  </Grid>

                </Grid>

              </form>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Login;