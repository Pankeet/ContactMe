import { useRef, useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Contact(){
    const formRef = useRef(null);
    const [focusoninp , setfocus ] = useState(false);

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
                <input required type="text" className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
            </div>
            <div className="flex pt-10 pl-10">
            <span className="text-2xl">Email <br />
                <span className="text-xl cursor-pointer" onClick={() => CopyText('pankeet04@gmail.com' , false)}>pankeet04@gmail.com</span>
                </span>
                <span className='pl-[307px] pt-4 text-xl'>Email* <br />
                <input required type="email" className="border-gray-600 border-b-1 pt-1 outline-none"></input>
                </span>
                <span className='pl-48 pt-3.5 text-xl'>Subject* <br />
                <input required type="text" className="border-gray-600 overflow-none border-b-1 pt-1 outline-none w-2xs"></input>
                </span>
            </div>
            <div className="flex pt-10 pl-10">
                <span className="text-2xl">Location <br /> <span className="text-xl">Vadodara, Gujarat, India</span></span>
                <span className="pl-[290px] pt-4 text-xl">Message* <br />
                <input required type="text" className="border-gray-600 border-b-1 pt-1 outline-none w-2xl"></input>
                </span>
            </div>

            <button type="submit"  className="mt-10 ml-[51rem] px-6 py-2 bg-black text-white text-lg rounded hover:bg-white transition-colors duration-300 hover:text-black">Send Mail</button>
            
            <ToastContainer position="top-center" autoClose={2000} transition={Slide} pauseOnHover={false}/>
        </div>
    )
}



