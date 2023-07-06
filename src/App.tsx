import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import './styles.css';

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const [val, setVal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginForm>({
    mode: "onChange"
  });
  const onValid = (data: LoginForm) => {
    console.log("im valid bby");
    setVal(true);
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div className="bg-gray-500 flex w-full h-screen p-40 m-1  " >
    <form className=" " onSubmit={handleSubmit(onValid, onInvalid)}>
      <div className="">
      <div>
        <label htmlFor="name">name</label>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              message: "The username should be longer than 5 chars.",
              value: 5
            }
          })}
          type="text"
          placeholder="Username"
          autoComplete="off"
        />
        {errors?.username && <span>{errors?.username.message}</span>}
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              notGmail: (value) =>
                value.includes("@naver.com") || "Only @naver.com "
            }
          })}
          type="email"
          placeholder="Only @naver.com"
          autoComplete="off"
          className={`${
            Boolean(errors.email?.message) ? "border-red-500" : ""
          }`}
        />
        {errors?.email && <span>{errors?.email?.message}</span>}
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              message: "The password should be longer than 10 chars.",
              value: 10
            }
          })}
          type="password"
          placeholder="Min 10 characters"
        />
        {errors?.password && <span>{errors?.password.message}</span>}
      </div>
      <hr />
      <input type="submit" value="Create Account" />
      {val ? <h2>회원가입 성공!</h2> : null}
      </div>
    </form>
    </div>
      
     
  );
}
