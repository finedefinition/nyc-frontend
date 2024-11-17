import ClickableComponent from '../ClickableComponent/ClickableComponent';

const EmailAddressSection = ({ emailAddress }: { emailAddress: string }) => {
  return (
    <div>
      <h4 className="text-2xl">E-mail address</h4>
      <ClickableComponent
        href="mailto:sales@norseyacht.com"
        className="underline"
      >
        {emailAddress}
      </ClickableComponent>
    </div>
  );
};

export default EmailAddressSection;
