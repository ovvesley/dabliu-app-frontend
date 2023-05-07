import Alert from "components/Alerts/Alert";
import { LoginContextProvider } from "contexts/DabliuContextProvider";
import authController from "controllers/authController";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const history = useHistory();
  const initialStateForm = {
    email: "",
    password: "",
  };

  const initialStateFeedbackError = {
    type: null,
    message: null,
  };

  const [form, setForm] = useState(initialStateForm);

  const [feedback, setFeedback] = useState(initialStateFeedbackError);

  const loginContext = useContext(LoginContextProvider)

  const { login } = authController();

  const handleChangeForm = (event) => {
    if (!form.hasOwnProperty(event.target.name)) return;
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    console.log("data to send", form);
    try {
      const response = await login(form.email, form.password);
      if (response.error) {
        setFeedback({
          type: "error",
          message: response.message,
        });
        return;
      }

      setFeedback({
        type: "success",
        message: "Login realizado com sucesso!",
      });
      loginContext.setLoginState({isLogged: true, token: response.data.token, user: response.data});
      history.push("/admin/dashboard");
    } catch (error) {
      setFeedback({
        type: "error",
        message: 'Ocorreu um erro ao realizar o login, tente novamente mais tarde!',
      });
      return;
    }finally{
      setForm(initialStateForm);
    }
  };

  console.log(loginContext)

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                <form onSubmit={handleSubmitForm}>
                  {feedback.type && (
                    <Alert type={feedback.type} message={feedback.message} />
                  )}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChangeForm}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      value={form.password}
                      onChange={handleChangeForm}
                    />
                  </div>
                  <div>
                    
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  {/* <small>Forgot password?</small> */}
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
