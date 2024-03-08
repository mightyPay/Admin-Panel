import React from "react";
import { Button, PlainInputText } from "../../components";
import banner from "../../assets/backgrounds/auth-bg.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <div className="h-full w-full bg-white">
      <div
        className="auth-container h-full w-10/12 grid mx-auto gap-x-7"
        style={{
          gridTemplateColumns: "1fr max-content",
        }}
      >
        <div className="h-full hidden md:flex md:flex-col md:justify-center gap-y-8">
          {/* <div className="flex flex-col gap-y-4">
            <h3 className="text-6xl font-medium">Sign in to</h3>
            <p className="text-2xl">Lorem Ipsum is simply</p>
          </div>
          <div>
            <p>
              If you don't have an account register <br />
              You can Register here
            </p>
          </div> */}
          <img src={banner} />
        </div>
        <div className="form-container h-full flex flex-col justify-center gap-y-4">
          <h3 className="font-medium text-4xl">Sign Up</h3>
          <PlainInputText
            classNames="md:w-96"
            type="email"
            placeholder="Enter email or username"
            value={undefined}
            onChange={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <PlainInputText
            classNames="md:w-96"
            type="password"
            placeholder="Password"
            value={undefined}
            onChange={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <PlainInputText
            classNames="md:w-96"
            type="password"
            placeholder="Confirm Password"
            value={undefined}
            onChange={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className="flex justify-end">
            <span className="cursor-pointer text-gray-400">
              Already have an account?&nbsp;
              <Link to="/" className="text-rose-800">
                login
              </Link>
            </span>
          </div>
          <div className="flex flex-col justify-center gap-y-8">
            <Button
              title="Register"
              className="flex items-center justify-center h-14"
              loading={false}
              onClick={function (e: any): void {
                throw new Error("Function not implemented.");
              }}
            />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
