import Alert from "components/Alerts/Alert";
import authController from "controllers/authController";
import { useState } from "react";


const initialStateErrors = {
  name: null,
  email: null,
  password: null,
};

const initialStateForm = {
  name: '',
  email: '',
  password: '',
};

const initialStateFeedbackError = {
  type: null,
  message: null,
};


export default function Register() {
  const [form, setForm] = useState(initialStateForm);

  const [feedback, setFeedback] = useState(initialStateFeedbackError);

  const [errors, setErrors] = useState(initialStateErrors);

  const { register } = authController();


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
      const response = await register(
        form.name,
        form.email,
        form.password,
        "00000000000"
      );

      if (response.error) {
        setFeedback({
          type: "error",
          message: response.message,
        });
        setErrors(response.errors);
        return;
      }    
      setFeedback({
        type: "success",
        message: "User created successfully. You can now login. Click <a href='/auth/login'>here to Login</a>",
      });
      setErrors(initialStateErrors);
      
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Error creating user",
      });
    }finally{
      setForm(initialStateForm);

    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                {feedback.type && (
                  <Alert type={feedback.type} message={feedback.message} />
                )}
                <form  onSubmit={handleSubmitForm}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChangeForm}
                    />
                    <span className="text-red-500 text-xs italic">
                      {errors.name? errors.name[0] : null}
                    </span>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChangeForm}
                    />
                    <span className="text-red-500 text-xs italic">
                      {errors.email? errors.email[0] : null}
                    </span>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChangeForm}
                    />
                    <span className="text-red-500 text-xs italic">
                      {errors.password? errors.password[0] : null}
                    </span>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
