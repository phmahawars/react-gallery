import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import ToastMessage from "../../components/ToastMessage";

import { tokenEncode } from "../../functions/tokenGenerate";
import { login_api, register_api } from "../../store/ApiKey";
// import "./AuthForm.css"; // Import your CSS file for styling

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeBullet, setActiveBullet] = useState(1);

  const [loginMessage, setLoginMessage] = useState("");
  const [errorUpMessage, setErrorUpMessage] = useState({
    email: false,
    name: false,
    password: false,
  });
  const [errorInMessage, setErrorInMessage] = useState({
    email: false,
    password: false,
  });

  const handleInputFocus = (e) => {
    e.target.classList.add("active");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.classList.remove("active");
    }
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const moveSlider = (index) => {
    setActiveBullet(index);
  };
  useEffect(() => {
    let count = 1;
    setInterval(() => {
      setActiveBullet(count);
      count++;
      if (count === 4) {
        count = 1;
      }
    }, 3000);
  }, []);
  const signUpForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    fetch(register_api, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          toggleSignUpMode();
          setLoginMessage(data.message);
        } else if (data.status === 422) {
          let err = {};
          for (const [key, value] of Object.entries(data.error)) {
            err[key] = value[0];
          }
          setErrorUpMessage({ ...err });
        }
      });
  };
  const signInForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch(login_api, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          const toke_key = tokenEncode(data.expire);
          sessionStorage.setItem(toke_key, data.token);
          sessionStorage.setItem("token_gallery", toke_key);
          setLoginMessage(data.message);
          return location.reload();
        }
        return setLoginMessage(data.message);
      });
  };
  return (
    <main className={isSignUpMode ? "sign-up-mode" : ""}>
      {loginMessage != "" && (
        <ToastMessage message={loginMessage} state={setLoginMessage} />
      )}
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {/* Sign-In Form */}
            <form className="sign-in-form" onSubmit={(e) => signInForm(e)}>
              <div className="logo">
                <img
                  src="https://github.com/sefyudem/javascript-sliding-login-and-registration-form/blob/main/img/logo.png?raw=true"
                  alt="easyclass"
                />
                <h4>easyclass</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6 className="me-2">Not registered yet?</h6>
                <span
                  className="toggle"
                  style={{ cursor: "pointer" }}
                  onClick={toggleSignUpMode}
                >
                  Sign up
                </span>
              </div>

              <div className="actual-form">
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none"
                      placeholder="name@example.com"
                      name="email"
                    />
                    <label htmlFor="floatingInput" className="px-0">
                      Email address
                    </label>
                  </div>
                  {errorInMessage.email && (
                    <small className="text-danger">
                      {errorInMessage.email}
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none"
                      placeholder="********"
                      name="password"
                    />
                    <label htmlFor="floatingInput" className="px-0">
                      Password
                    </label>
                  </div>
                  {errorInMessage.password && (
                    <small className="text-danger">
                      {errorInMessage.password}
                    </small>
                  )}
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />

                <p className="text m-0">
                  Forgotten your password or your login details?{" "}
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>

            {/* Sign-Up Form */}
            <form
              onSubmit={(e) => signUpForm(e)}
              autoComplete="off"
              className="sign-up-form"
            >
              <div className="logo">
                <img
                  src="https://github.com/sefyudem/javascript-sliding-login-and-registration-form/blob/main/img/logo.png?raw=true"
                  alt="easyclass"
                />
                <h4>easyclass</h4>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6 className="me-2">Already have an account?</h6>
                <span
                  className="toggle"
                  style={{ cursor: "pointer" }}
                  onClick={toggleSignUpMode}
                >
                  Sign in
                </span>
              </div>

              <div className="actual-form">
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none"
                      placeholder="hello25"
                      name="name"
                    />
                    <label htmlFor="floatingInput" className="px-0">
                      Username
                    </label>
                  </div>
                  {errorUpMessage.name && (
                    <small className="text-danger">{errorUpMessage.name}</small>
                  )}
                </div>

                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none"
                      placeholder="name@example.com"
                      name="email"
                    />
                    <label htmlFor="floatingInput" className="px-0">
                      Email address
                    </label>
                  </div>
                  {errorUpMessage.email && (
                    <small className="text-danger">
                      {errorUpMessage.email}
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none"
                      placeholder="********"
                      name="password"
                    />
                    <label htmlFor="floatingInput" className="px-0">
                      Password
                    </label>
                  </div>
                  {errorUpMessage.password && (
                    <small className="text-danger">
                      {errorUpMessage.password}
                    </small>
                  )}
                </div>

                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the{" "}
                  <a href="#">Terms of Services</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          {/* Carousel */}
          <div className="carousel">
            <div className="images-wrapper">
              <img
                src="https://raw.githubusercontent.com/sefyudem/javascript-sliding-login-and-registration-form/main/img/image1.png"
                className={`image img-1 ${activeBullet === 1 ? "show" : ""}`}
                alt=""
              />
              <img
                src="https://raw.githubusercontent.com/sefyudem/javascript-sliding-login-and-registration-form/main/img/image2.png"
                className={`image img-2 ${activeBullet === 2 ? "show" : ""}`}
                alt=""
              />
              <img
                src="https://raw.githubusercontent.com/sefyudem/javascript-sliding-login-and-registration-form/main/img/image3.png"
                className={`image img-3 ${activeBullet === 3 ? "show" : ""}`}
                alt=""
              />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div
                  className="text-group"
                  style={{
                    transform: `translateY(${-(activeBullet - 1) * 2.5}rem)`,
                  }}
                >
                  <h2>Create your own courses</h2>
                  <h2>Customize as you like</h2>
                  <h2>Invite students to your class</h2>
                </div>
              </div>

              <div className="bullets">
                <span
                  className={activeBullet === 1 ? "active" : ""}
                  onClick={() => moveSlider(1)}
                ></span>
                <span
                  className={activeBullet === 2 ? "active" : ""}
                  onClick={() => moveSlider(2)}
                ></span>
                <span
                  className={activeBullet === 3 ? "active" : ""}
                  onClick={() => moveSlider(3)}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

        *,
        *::before,
        *::after {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        body,
        input {
          font-family: "Poppins", sans-serif;
        }

        main {
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background-color: #ff8c6b;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .box {
          position: relative;
          width: 100%;
          max-width: 1020px;
          height: 640px;
          background-color: #fff;
          border-radius: 3.3rem;
          box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
        }

        .inner-box {
          position: absolute;
          width: calc(100% - 4.1rem);
          height: calc(100% - 4.1rem);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .forms-wrap {
          position: absolute;
          height: 100%;
          width: 45%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          transition: 0.8s ease-in-out;
        }

        form {
          max-width: 260px;
          width: 100%;
          margin: 0 auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transition: opacity 0.02s 0.4s;
        }

        form.sign-up-form {
          opacity: 0;
          pointer-events: none;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          width: 27px;
          margin-right: 0.3rem;
        }

        .logo h4 {
          font-size: 1.1rem;
          margin-top: -9px;
          letter-spacing: -0.5px;
          color: #151111;
        }

        .heading h2 {
          font-size: 2.1rem;
          font-weight: 600;
          color: #151111;
        }

        .heading h6 {
          color: #bababa;
          font-weight: 400;
          font-size: 0.75rem;
          display: inline;
        }

        .toggle {
          color: #151111;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          transition: 0.3s;
        }

        .toggle:hover {
          color: #8371fd;
        }

        .sign-btn {
          display: inline-block;
          width: 100%;
          height: 43px;
          background-color: #151111;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 0.8rem;
          font-size: 0.8rem;
          margin-bottom: 2rem;
          transition: 0.3s;
        }

        .sign-btn:hover {
          background-color: #8371fd;
        }

        .text {
          color: #bbb;
          font-size: 0.7rem;
        }

        .text a {
          color: #bbb;
          transition: 0.3s;
        }

        .text a:hover {
          color: #8371fd;
        }

        main.sign-up-mode form.sign-in-form {
          opacity: 0;
          pointer-events: none;
        }

        main.sign-up-mode form.sign-up-form {
          opacity: 1;
          pointer-events: all;
        }

        main.sign-up-mode .forms-wrap {
          left: 55%;
        }

        main.sign-up-mode .carousel {
          left: 0%;
        }

        .carousel {
          position: absolute;
          height: 100%;
          width: 55%;
          left: 45%;
          top: 0;
          background-color: #ffe0d2;
          border-radius: 2rem;
          display: grid;
          grid-template-rows: auto 1fr;
          padding-bottom: 2rem;
          overflow: hidden;
          transition: 0.8s ease-in-out;
        }

        .images-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
        }

        .image {
          width: 100%;
          grid-column: 1/2;
          grid-row: 1/2;
          opacity: 0;
          transition: opacity 0.3s, transform 0.5s;
        }

        .img-1 {
          transform: translate(0, -50px);
        }

        .img-2 {
          transform: scale(0.4, 0.5);
        }

        .img-3 {
          transform: scale(0.3) rotate(-20deg);
        }

        .image.show {
          opacity: 1;
          transform: none;
        }

        .text-slider {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .text-wrap {
          max-height: 2.2rem;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }

        .text-group {
          display: flex;
          flex-direction: column;
          text-align: center;
          transform: translateY(0);
          transition: 0.5s;
        }

        .text-group h2 {
          line-height: 2.2rem;
          font-weight: 600;
          font-size: 1.6rem;
        }

        .bullets {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bullets span {
          display: block;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #aaa;
          margin: 0 0.25rem;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.3s;
        }

        .bullets span.active {
          width: 1.1rem;
          background-color: #151111;
          border-radius: 1rem;
        }

        @media (max-width: 850px) {
          .box {
            height: auto;
            max-width: 550px;
            overflow: hidden;
          }

          .inner-box {
            position: static;
            transform: none;
            width: revert;
            height: revert;
            padding: 2rem;
          }

          .forms-wrap {
            position: revert;
            width: 100%;
            height: auto;
          }

          form {
            max-width: revert;
            padding: 1.5rem 2.5rem 2rem;
            transition: transform 0.8s ease-in-out, opacity 0.45s linear;
          }

          form.sign-up-form {
            transform: translateX(100%);
          }

          main.sign-up-mode form.sign-in-form {
            transform: translateX(-100%);
          }

          main.sign-up-mode form.sign-up-form {
            transform: translateX(0%);
          }

          .carousel {
            position: revert;
            height: auto;
            width: 100%;
            padding: 3rem 2rem;
            display: flex;
          }

          .images-wrapper {
            display: none;
          }

          .text-slider {
            width: 100%;
          }
        }

        @media (max-width: 530px) {
          main {
            padding: 1rem;
          }

          .box {
            border-radius: 2rem;
          }

          .inner-box {
            padding: 1rem;
          }

          .carousel {
            padding: 1.5rem 1rem;
            border-radius: 1.6rem;
          }

          .text-wrap {
            margin-bottom: 1rem;
          }

          .text-group h2 {
            font-size: 1.2rem;
          }

          form {
            padding: 1rem 2rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

export default Login;
