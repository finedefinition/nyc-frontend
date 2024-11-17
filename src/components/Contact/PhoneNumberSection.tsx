const PhoneNumberSection = ({ phoneNumber }: { phoneNumber: string }) => {
  return (
    <div>
      <h4 className="text-2xl">Phone number</h4>
      {phoneNumber}
    </div>
  );
};

export default PhoneNumberSection;
