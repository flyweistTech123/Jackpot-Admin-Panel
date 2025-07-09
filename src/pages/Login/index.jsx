import React, { useEffect, useState } from 'react';
import img from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';
import { toast } from 'sonner';


const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Fill all the fields");
      return;
    }

    setLoading(true);
    const formData = { email, password, };

    postApi(endPoints.loginAdmin, formData, {
      setResponse: (response) => {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        sessionStorage.setItem("token", response?.accessToken);
        navigate('/dashboard');
      },
      setLoading,
      successMsg: "Login Successfully!",
      errorMsg: "Invalid credentials",
    });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-primary min-h-screen  flex items-center justify-center px-4 py-2">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full max-w-6xl">
        {/* Logo */}
        <div className="bg-white flex items-center justify-center  w-[150px] h-[150px] sm:w-[348px] sm:h-[348px] p-1 rounded-full overflow-hidden flex-shrink-0">
          <img src={img} alt="Logo" className="w-[156px] h-[50px] object-center" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[10px] p-6 sm:p-10 w-full max-w-xl shadow-md">
          <h6 className="font-urbanist font-semibold text-[20px] lg:text-[24px] text-primary mb-5">
            Welcome Back
          </h6>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block font-poppins font-[500] text-[14px] text-[#666666] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="hannah.green@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#66666659] bg-[#FAFAFA] px-3 py-3 rounded-[12px] placeholder:text-[#828282] font-open-sans text-[16px]  focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
              />
            </div>

            <div>
              <label className="block font-poppins font-[500] text-[14px] text-[#666666] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password123@"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#66666659] bg-[#FAFAFA] px-3 py-3 rounded-[12px] placeholder:text-[#828282] font-open-sans text-[16px] focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <label className="flex items-center gap-2 font-open-sans text-[14px] text-[#666666]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me on this computer
              </label>
              <p className="font-open-sans text-[14px] text-[#666666] cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#FFB000] w-full rounded-[5px] py-3 font-open-sans font-semibold text-[16px] text-white leading-[24px] tracking-[0.15px] uppercase text-center transition-all duration-300 hover:bg-[#e69c00] ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {loading ? "Logging in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
