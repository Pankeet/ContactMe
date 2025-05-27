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
            const response = await axios.post('http://localhost:3000/api/sendmail', data);
            console.log("Server Response :" , response.data.message);
            setloading(prev => !prev);
            toast.success("Thank You ! Mail Received Successfully");
        }
        catch(error) {
                console.error('Error message :', error );
                setloading(prev => !prev);
                toast.error("OOps ! Something Went Wrong ");
        }   
    }
    return (
        <div className="font-serif overflow-auto">
            <div className="text-5xl font-light pl-10 pt-3 pb-3 bg-[url('/banner.png')] bg-cover bg-no-repeat ">
                <div>Contact</div>
            </div>
            <div className="pt-10 pl-10 flex">
                <span className="text-5xl">Helpful <br />Information</span>
                <span className="text-5xl pl-60">General <br />Inquiries</span>
                <span className="text-md pl-52 pt-10"> For general inquiries please , please <i><u className="cursor-pointer" onClick={fillform}> <br /> fill out this form to reach me</u> </i>
                </span> 
            </div>
            <div className="flex pt-20 pl-10">
                <span className="text-2xl">Phone <br />
                <span className="text-xl cursor-pointer" onClick={() => CopyText('9875142251', true)}>+91 9875142251</span>
                </span>
                <span className="pl-[23rem] pt-4 text-xl">First name* <br />
                <input required type="text" ref={formRef} className={`pt-1 outline-none ${ focusoninp ? 'border-2 border-red-500 rounded-md': 'border-gray-600 border-b'}`}></input>
                </span>
                <span className="pl-48 pt-3.5 text-xl">Last name* <br />
                <input required type="text" ref={lname} className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
            </div>
            <div className="flex pt-10 pl-10">
            <span className="text-2xl">Email <br />
                <span className="text-xl cursor-pointer" onClick={() => CopyText('pankeet04@gmail.com' , false)}>pankeet04@gmail.com</span>
                </span>
                <span className='pl-[307px] pt-4 text-xl'>Email* <br />
                <input required type="email" ref={user} className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
                <span className='pl-48 pt-3.5 text-xl'>Subject* <br />
                <input required type="text" ref={sub} className="border-gray-600 overflow-none border-b-1 pt-1 outline-none w-2xs"></input>
                </span>
            </div>
            <div className="flex pt-10 pl-10">
                <span className="text-2xl">Location <br /> <span className="text-xl">Vadodara, Gujarat, India</span></span>
                <span className="pl-[290px] pt-4 text-xl">Message* <br />
                <input required type="text" ref={msg} className="border-gray-600 border-b-1 pt-1 outline-none w-2xl"></input>
                </span>
            </div>

            <button type="submit" disabled={loading} onClick={sendMail} className="mt-10 ml-[51rem] px-6 py-2 bg-black text-white text-lg rounded hover:bg-white transition-colors duration-300 hover:text-black">{loading ? "Sending Mail..." : "Send Mail"}</button>
            
            <ToastContainer position="top-center" autoClose={2000} transition={Slide} pauseOnHover={false}/>
        </div>
    )
}
