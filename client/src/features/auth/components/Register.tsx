import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../../../app/store";
import { useRegisterMutation } from "../../../app/services/auth";
import { setCredentials } from "../authSlice";

import AuthGreeting from "./AuthGreeting";
import Input from "../../../components/Input";
import FormFooter from "../../../components/FormFooter";
import Button, { BtnType } from "../../../components/Button";

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
  } = useForm<IInput>();

  const [signUp] = useRegisterMutation();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    try {
      const { user, token } = await signUp(data).unwrap();

      dispatch(setCredentials({ user, token }));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <AuthGreeting>
        <h4>Create Account</h4>
        <h4>to get started now!</h4>
      </AuthGreeting>
      <form onSubmit={handleSubmit(onSubmit)}>
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
