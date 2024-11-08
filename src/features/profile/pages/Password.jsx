import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const Password = () => {
  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const confirmpassword = useRef(null);
  const [showPassword, setShowPassword] = useState(true);

const  handleSubmit = (e) => {
    e.preventDefault()
    const old_Password = oldPassword.current.value;
    const new_Password = newPassword.current.value;
    const confirm_password = confirmpassword.current.value;
    
    if(new_Password === old_Password){
      toast.error("the old and new password is the same")
      return
    }
    if (new_Password !== confirm_password) {
      toast.error("Passwords does not match!");
      return
    }
    console.log({old_Password,new_Password,confirm_password})    
  }
  return (
    <main className="max-w-full mx-auto lg:px-16 md:px-8 px-4">
      <h2 className="text-3xl text-gray-800 font-bold mb-8 border-b border-gray-600 py-2">Set Password</h2>

      <form onSubmit={handleSubmit}>
        <p>A password has not been set for your account </p>
        <div>
        <span className="grid gap-2 w-full relative">
            <label htmlFor="oldPassword">
            <span>old Password</span>
            </label>
            <input
              className="w-full border border-gray-500 outline-none rounded-md p-3 text-center md:text-start"
              type={!showPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
            <div
            className="absolute right-2 bottom-3 p-1 text-gray-600 text-lg"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {!showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </div>
          </span>
        <span className="grid gap-2 w-full relative">
            <label htmlFor="newPassword">
            <span>new Password</span>
            </label>
            <input
              className="w-full border border-gray-500 outline-none rounded-md p-3 text-center md:text-start"
              type={!showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
            <div
            className="absolute right-2 bottom-3 p-1 text-gray-600 text-lg"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {!showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </div>
          </span>
          <span className="grid gap-2 w-full relative">
            <label htmlFor="confirmPassword">
              <span>confirm Password</span>
            </label>
            <input
              className="w-full border border-gray-500 outline-none rounded-md p-3 text-center md:text-start"
              type={!showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              onChange={handleChange}
            />
            <div
               className="absolute right-2 bottom-3 p-1 text-gray-600 text-lg"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {!showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </div>
          </span>
        </div>
        <div className="formBtn max-w-[500px] mx-auto my-8 text-left">
          <button className="bg-[#3557C2]/90 text-white px-8 hover:bg-[#3557C2] transition-all duration-400 py-3 rounded-[8px]">Set Password</button>
        </div>
      </form>
    </main>
  )
}

export default Password;