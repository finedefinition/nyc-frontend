export const AddressSection = ({ address }: { address: string }) => {
  return (
    <div>
      <h4 className="text-2xl">Address</h4>
      <span className="break-words whitespace-pre-wrap">{address}</span>
    </div>
  );
};

