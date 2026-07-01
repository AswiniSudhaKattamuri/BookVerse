function UPIModal({
  total,
  onClose,
  onSelect,
}) {

  const apps = [
    "Google Pay",
    "PhonePe",
    "Paytm",
    "BHIM",
  ];

  return (

    <div className="bank-modal">

      <div className="bank-card">

        <h2>Choose UPI App</h2>

        <p>Total Amount</p>

        <h1>₹{total}</h1>

        <div className="upi-apps">

          {apps.map((app) => (

            <button
              key={app}
              onClick={() => onSelect(app)}
            >
              {app}
            </button>

          ))}

        </div>

        <button
          className="close-modal"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default UPIModal;