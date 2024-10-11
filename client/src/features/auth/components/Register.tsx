import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../../../app/store";
import { useRegisterMutation } from "../../../app/services/auth";
import { setCredentials } from "../authSlice";

import useError from "../../../hooks/useError";

import AuthGreeting from "./AuthGreeting";
import Input from "../../../components/Input";
import FormFooter from "../../../components/FormFooter";
import Button, { BtnType } from "../../../components/Button";

import * as ls from "../../../localStorage";

interface IInput {
  nickname: string;
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IInput>();

  const { handleServerError } = useError();

  const [signUp] = useRegisterMutation();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    try {
      const { user, token } = await signUp(data).unwrap();

      ls.setToken(token);
      dispatch(setCredentials({ user }));

      navigate("/");
    } catch (error) {
      handleServerError(error, setError);
    }
  };

  return (
    <div className="register">
      <AuthGreeting>
        <h4>Create Account</h4>
        <h4>to get started now!</h4>
      </AuthGreeting>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nickname"
          name="nickname"
          error={errors.nickname?.message}
          register={register}
          rules={{
            required: "This field is required",
          }}
        />
        <Input
          label="Name"
          name="name"
          error={errors.name?.message}
          register={register}
          rules={{
            required: "This field is required",
          }}
        />
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
          <Button btnType={BtnType.Submit}>Register</Button>
        </FormFooter>
      </form>
    </div>
  );
};

export default Register;
