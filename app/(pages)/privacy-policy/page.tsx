import styles from '@/styles/typography.module.scss';

export default function PivacyPolicy() {
  return (
    <div className="info-page">
      <div className="info-page__top">
        <h1 className={styles.typo_h3_gray}>
          Privacy Policy of Norse Yacht Co.
        </h1>
      </div>
      <p className="info-page__section">
        At Norse Yacht Co., we are dedicated to safeguarding your privacy and
        ensuring the security of any personal information you provide to us.
        This Privacy Policy outlines our practices regarding the collection,
        use, disclosure, and protection of your information when you visit our
        website or make a purchase.
      </p>
      <section className="info-page__section">
        <h5 className="info-page__section__header">Information We Collect:</h5>
        <ul className="info-page__section__list">
          <li>
            Personal Information: When you place an order, we collect details
            such as your name, email address, shipping address, and payment
            information to process and fulfill your order.
          </li>
          <li>
            Communication Information: If you contact us through email or other
            communication methods, we may collect and store information
            pertaining to those communications.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Use of Information:</h3>
        <ul className="info-page__section__list">
          <li>
            Order Processing: Your information is utilized to process and
            fulfill your order in an accurate and efficient manner.
          </li>
          <li>
            Customer Support: We may use your information to respond to your
            inquiries, offer assistance, and address any issues you might
            encounter.
          </li>
          <li>
            Website Enhancement: We analyze non-identifiable data to improve the
            functionality, user experience, and effectiveness of our website.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Information Sharing:</h3>
        <ul className="info-page__section__list">
          <li>
            Service Providers: Your information may be shared with reliable
            third-party service providers to facilitate order processing,
            shipping, payment handling, and marketing activities on behalf of
            Norse Yacht Co.
          </li>
          <li>
            Legal Obligations: Your information may be disclosed when necessary
            to comply with legal requirements, enforce our website policies, or
            protect our rights or the rights of others.
          </li>
          <li>
            With Consent: We will not share your personal information with other
            third parties without your explicit consent.
          </li>
        </ul>
      </section>

      <section className="info-page__section">
        <h3 className="info-page__section__header">Data Security:</h3>
        <ul className="info-page__section__list">
          <li>
            We prioritize the security of your information and implement
            suitable measures to protect it against unauthorized access or
            disclosure. However, no internet-based or electronic storage method
            is completely secure, and we cannot guarantee absolute security of
            your data.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Cookies and Tracking Technologies:
        </h3>
        <ul className="info-page__section__list">
          <li>
            Our website utilizes cookies and similar tracking technologies to
            enhance your browsing experience and offer personalized content and
            advertisements. You can change your browser settings to disable
            cookies, but this may impact your overall experience on our website.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Changes to the Privacy Policy:
        </h3>
        <ul className="info-page__section__list">
          <li>
            We reserve the right to modify or update this Privacy Policy at any
            time. Changes will be effective immediately upon posting the updated
            policy on our website. By using our website, you consent to this
            Privacy Policy and agree to its terms. For any queries or concerns
            about our privacy practices or your personal information, please
            contact us.
          </li>
        </ul>
      </section>
    </div>
  );
};
