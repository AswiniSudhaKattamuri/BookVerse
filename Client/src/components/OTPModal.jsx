import { useState } from "react";
import "./OTPModal.css";
import toast from "react-hot-toast"
function OTPModal({

  title,

  onVerify,

  onCancel,

}) {

  const [otp, setOtp] = useState("");

  return (

    <div className="bank-modal">

      <div className="bank-card">

        <h2>{title}</h2>


        <input

          placeholder="Enter OTP"

          value={otp}

          onChange={(e)=>setOtp(e.target.value)}

        />

        <button
  onClick={() => {

    if (!otp.trim()) {
  toast.error("Please enter the OTP.");
  return;
}

if (otp.length !== 6) {
  toast.error("OTP must be 6 digits.");
  return;
}

if (otp !== "123456") {
  toast.error("Invalid OTP.");
  return;
}

    onVerify();

  }}
>
  Verify
</button>

        <button

          className="close-modal"

          onClick={onCancel}

        >

          Cancel

        </button>

      </div>

    </div>

  );

}

export default OTPModal;