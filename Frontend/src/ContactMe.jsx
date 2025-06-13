import { useRef, useState } from 'react';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Contact(){

    const [focusoninp , setfocus ] = useState(false);
    const [loading , setloading ] = useState(false);
    const formRef = useRef(null);
    const lname = useRef(null) 
    const user = useRef(null) 
    const sub = useRef(null) 
    const msg  = useRef(null);

    const CopyText = (text , bool) => {
        navigator.clipboard.writeText(text).then(() => {
            if(bool) {toast.success("Phone Number Copied")}
            else {toast.success("Email Copied")};
        });
      };

    const fillform = () => {
        setfocus(true);
        formRef.current.focus();
        setTimeout(()=>{
            setfocus(false);
        }, 500);
    };
    
    async function sendMail(){
        const firstname = formRef.current.value;
        const lastname = lname.current.value; 
        const email = user.current.value; 
        const subject = sub.current.value; 
        const message  = msg.current.value; 
        const data = {firstname , lastname ,email ,  subject , message }
        try{
            setloading(prev => !prev);
            if(data.firstname === '' || data.lastname === '' || data.email === '' || data.message === ''){
                setloading(prev => !prev);
                toast.error("Please Fill the details before sending Mail !");
            }
            else{
                let response = await axios.post('https://contact-page-0b9c.onrender.com/api/sendmail', data);
                if(response){
                    console.log("Server Response :" , response.data.message);
                    setloading(prev => !prev);
                    toast.success("Thank You ! Mail Received Successfully");
                }
            }
        }
        catch(err) {
                console.error('Error message :', err );
                toast.error(err.response.data.message);
                setloading(prev => !prev);
        }   
    }
    return (
        <div className="font-serif ">
            <div className="sm:text-2xl md:text-3xl lg:text-5xl font-light px-5 py-3 bg-[url('/banner.png')] bg-cover bg-no-repeat w-full text-xl">
                <div>Contact</div>
            </div>
            <div className="pt-10 sm:pl-10 sm:flex">
                <div className="sm:text-2xl md:text-3xl md:font-medium lg:text-5xl">Helpful <br />Information</div>
                <div className="sm:text-2xl md:text-3xl md:font-medium lg:text-5xl sm:pl-60 pt-3">General <br />Inquiries</div>
                <div className="text-md sm:pl-52 sm:pt-10 pt-3"> For general inquiries please , please <i><u className="cursor-pointer" onClick={fillform}> <br /> fill out this form to reach me</u> </i>
                </div> 
            </div>
            <div className="sm:flex sm:pt-20 pt-4 sm:pl-10 ">
                <span className="sm:text-lg md:text-xl lg:text-2xl ">Phone <br />
                <span className="sm:text-md md:text-lg lg:text-xl cursor-pointer" onClick={() => CopyText('9875142251', true)}>+91 9875142251</span>
                </span>
                <span className="sm:pl-[23rem] pt-4 md:text-xl text-lg flex sm:block">First name<span className='text-red-900'>*</span> <br />
                <input type="text" ref={formRef} className={`pt-1 outline-none ${ focusoninp ? 'border-2 border-red-500 rounded-md': 'border-gray-600 border-b'}`}></input>
                </span>
                <span className="sm:pl-48 pt-3.5 md:text-xl text-lg flex sm:block">Last name<span className='text-red-900'>*</span> <br />
                <input type="text" ref={lname} className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
            </div>
            <div className="sm:flex pt-10 sm:pl-10">
            <span className="sm:text-lg md:text-xl lg:text-2xl">Email <br />
                <span className="sm:text-md md:text-lg lg:text-xl cursor-pointer" onClick={() => CopyText('pankeet04@gmail.com' , false)}>pankeet04@gmail.com</span>
                </span>
                <span className='sm:pl-[307px] pt-4 md:text-xl text-lg flex sm:block'>Email<span className='text-red-900'>*</span> <br />
                <input type="email" ref={user} className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
                <span className='sm:pl-48 pt-3.5 md:text-xl text-lg flex sm:block'>Subject<span className='text-red-900'>*</span> <br />
                <input type="text" ref={sub} className="border-gray-600 overflow-none border-b-1 pt-1 outline-none w-2xs"></input>
                </span>
            </div>
            <div className="sm:flex pt-10 sm:pl-10">
                <span className="sm:text-lg md:text-xl lg:text-2xl">Location <br /> <span className="md:text-xl text-md">Vadodara, Gujarat, India</span></span>
                <span className="sm:pl-[290px] pt-4 md:text-xl text-lg flex sm:block">Message<span className='text-red-900'>*</span> <br />
                <input type="text" ref={msg} className="border-gray-600 border-b-1 pt-1 outline-none w-2xl"></input>
                </span>
            </div>

            <button type="submit" disabled={loading} onClick={sendMail} className="ml-48 mt-10 sm:ml-[51rem] px-6 py-2 mb-5 bg-black text-white text-lg rounded hover:bg-white transition-colors duration-300 hover:text-black">{loading ? "Sending Mail..." : "Send Mail"}</button>
            
            <ToastContainer position="top-center" autoClose={2000} transition={Slide} pauseOnHover={false}/>
        </div>
    )
}
