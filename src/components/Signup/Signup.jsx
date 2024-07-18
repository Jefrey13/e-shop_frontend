import {React, useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import styles from '../../styles/styles'
import {Link, useNavigate} from 'react-router-dom'
import {RxAvatar} from 'react-icons/rx'
import axios from 'axios'
import { server } from '../../server'
import {toast} from 'react-toastify'

const Signup = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isvisble, setIsvisble] = useState(false);
    const [isconfirmPassword, setIsConfirmPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    // const handlerAvatar=()=>{
    //     console.log("object")
    // }
    
    const handleFileInputChange=(e)=>{
        const file=e.target.files[0];
        setAvatar(file);
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const config = {headers: {"Content-Type": "multipart/form-data"}};

        const newForm = new FormData()

        newForm.append("file", avatar);
        newForm.append("name", fullName);
        newForm.append("email", email);
        newForm.append("password", password);

        if(password !== confirmPassword){
            toast.error("Password don't match. Please, try again.");
            return;
        }

        axios.post(`${server}/user/create-user`, newForm, config).then((res) => {
            toast.success(res.data.message);
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAvatar();
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
    }

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col justify-center py-1 sm:px-6 lg:px-8'>
        
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-1 text-center text-3xl font-extrabold text-gray-900'>Create an account</h2>
        </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 shadow sm:rounded-lg sm:px-10'>
        
        <form className='space-y-3' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fullName"
                className='block text-sm font-medium text-gray-700'>
                   Full Name
                </label>
                <input type="text"
                name='fullName'
                autoComplete='fullName'
                required
                value={fullName} 
                onChange={(e)=> setFullName(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400
                focus:outline-none
                focus:ring-blue-500
                focus:border-blue-500
                sm:text-sm'
                />
            </div>
            <div>
                <label htmlFor="email"
                className='block text-sm font-medium text-gray-700'>
                    Email Address
                </label>
                <input type="email"
                name='email'
                autoComplete='email'
                required
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400
                focus:outline-none
                focus:ring-blue-500
                focus:border-blue-500
                sm:text-sm'
                />
            </div>
            <div className='mt-1 relative'>
                <label htmlFor="password"
                className='block text-sm font-medium text-gray-700'>
                    Password
                </label>
                <div className='mt-1 relative'>
                <input type={isvisble ? "text" : "password"}
                name='password'
                autoComplete='current-password'
                required
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400
                focus:outline-none
                focus:ring-blue-500
                focus:border-blue-500
                sm:text-sm'
                />
                {
                    isvisble ?(
                        <AiOutlineEye className='absolute right-2 top-2 cursor-pointer'
                        size={25}
                        onClick={()=> setIsvisble(!isvisble)}/>
                    ):(
                        <AiOutlineEyeInvisible
                        className='absolute right-2 top-2 cursor-pointer'
                        size={25}
                        onClick={()=>setIsvisble(!isvisble)}
                        />
                    )
                }
                </div>
            </div>
            <div>
                <label htmlFor="confirmPassword"
                className='block text-sm font-medium text-gray-700'>
                    Confirm Password
                </label>
                <div className='mt-1 relative'>
                <input type={isconfirmPassword ? "text" : "password"}
                name='confirmPassword'
                autoComplete='confirm-Password'
                required
                value={confirmPassword} 
                onChange={(e)=> setConfirmPassword(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400
                focus:outline-none
                focus:ring-blue-500
                focus:border-blue-500
                sm:text-sm'
                />
                {
                    isconfirmPassword ? (
                        <AiOutlineEye className='absolute right-2 top-2 cursor-pointer'
                        size={25}
                        onClick={()=> setIsConfirmPassword(!isconfirmPassword)}/>
                    ):(
                        <AiOutlineEyeInvisible
                        className='absolute right-2 top-2 cursor-pointer'
                        size={25}
                        onClick={()=>setIsConfirmPassword(!isconfirmPassword)}
                        />
                    )
                }
                </div>
            </div>
            <div>
                <label htmlFor='avatar'
                className='block text-sm font-medium text-gray-700'>
                </label>
                <div className='mt-2 flex items-center'>
                    <span className='inline-block h-6 w-6 rounded-full overflow-hidden'>
                        {avatar?(
                            <img src={URL.createObjectURL(avatar)} 
                            alt="avatar" className="h-full w-full object-cover rounded-full"/>
                        ):(
                            <RxAvatar className='h-6 w-6'/>
                        )}
                    </span>
                    <label htmlFor="file-input"
                    className='ml-5 flex items-center justify-center px-4 py-2 border border-x-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-slate-200'>
                        <span>Upload a file</span>
                        <input type="file" 
                        name='avatar'
                        id='file-input'
                        accept='.jpg,.jpeg,.png'
                        onChange={handleFileInputChange}
                        className='sr-only'/>
                    </label>

                </div>

            </div>
            <div>                
                <button type='submit' className='group
                relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-500'>Submit</button>
            </div>
            <div className={`${styles.normalFlex} justify-center w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/login"
                className='text-blue-600 hover:text-blue-500 pl-2'>Sign In</Link>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;