import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../../../app/store";
import { useLoginMutation } from "../../../app/services/auth";
import { setCredentials } from "../authSlice";

import AuthGreeting from "./AuthGreeting";
import Input from "../../../components/Input";
import FormFooter from "../../../components/FormFooter";
import Button, { BtnType } from "../../../components/Button";

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
  } = useForm<IInput>();

  const [logIn] = useLoginMutation();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    try {
      const { user, token } = await logIn(data).unwrap();

      dispatch(setCredentials({ user, token }));

      navigate("/");
    } catch (error) {
      console.log(error);
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
          error={""}
          register={register}
          rules={{
            required: "This field is required",
          }}
        />
        <Input
          label="Password"
          name="password"
          fieldType="password"
          error={""}
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
