import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../../../app/store";
import { useLoginMutation } from "../../../app/services/auth";
import { setCredentials } from "../authSlice";

import useError from "../../../hooks/useError";

import AuthGreeting from "./AuthGreeting";
import Input from "../../../components/Input";
import FormFooter from "../../../components/FormFooter";
import Button, { BtnType } from "../../../components/Button";

import * as ls from "../../../localStorage";

interface IInput {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IInput>();

  const { handleServerError } = useError();

  const [logIn] = useLoginMutation();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    try {
      const { user, token } = await logIn(data).unwrap();

      ls.setToken(token);
      dispatch(setCredentials({ user }));

      navigate("/");
    } catch (error) {
      handleServerError(error, setError);
    }
  };

  return (
    <div className="login">
      <AuthGreeting>
        <h4>Welcome!</h4>
        <h4>Nice to see you!</h4>
      </AuthGreeting>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          error={errors.email?.message}
          register={register}
          rules={{
            required: "This field is required",
          }}
        />
        <Input
          label="Password"
          name="password"
          fieldType="password"
          error={errors.password?.message}
          register={register}
          rules={{
            required: "This field is required",
          }}
        />
        <FormFooter>
          <Button btnType={BtnType.Submit}>Log in</Button>
        </FormFooter>
      </form>
    </div>
  );
};

export default Login;
