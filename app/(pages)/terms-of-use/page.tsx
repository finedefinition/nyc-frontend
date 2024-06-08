import Link from 'next/link';
import styles from '@/styles/typography.module.scss';

export default function TermsOfUse() {
  return (
    <div className="info-page">
      <div className="info-page__top">
        <h1 className={styles.typo_h3_gray}>
          Terms of Service for Norse Yacht Co.
        </h1>
      </div>
      <p className="info-page__section">
        Please read the following Terms of Service (&quot;Terms&quot;) carefully
        before using the Norse Yacht Co. website (&quot;Website&quot;). By
        accessing or using our Website, you agree to comply with and be bound by
        these terms. If you do not agree with any part of these terms, please do
        not access or use our Website.
      </p>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Intellectual Property Rights:
        </h3>
        <p className="info-page__section__text">
          The services, software, tools, features, functionality, text,
          graphics, audio, video, and images made available by Norse Yacht Co.
          are protected by copyright, trademark, and other intellectual property
          laws. You may not reproduce, modify, distribute, or exploit any
          content without obtaining permission from Norse Yacht Co. We also
          respect the intellectual property rights of others and expect our
          users to do the same.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Product Information and Pricing:
        </h3>
        <p className="info-page__section__text">
          Norse Yacht Co. makes every effort to ensure the accuracy of product
          information, descriptions, and prices on our Website. However, we do
          not guarantee that all information is accurate, complete, or current.
          Norse Yacht Co. reserves the right to modify or update product
          information, prices, or availability without prior notice. Users are
          responsible for verifying the accuracy of product information before
          making any purchase decisions.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Online Purchases:</h3>
        <p className="info-page__section__text">
          By making a purchase on the Norse Yacht Co. Website, you agree to
          provide accurate, complete, and current information about yourself. We
          accept payments through secure payment gateways, and your payment and
          personal information will be handled according to our Privacy Policy.
          Please refer to our refund and return policy for details on returning
          products or receiving refunds.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Website Usage:</h3>
        <p className="info-page__section__text">
          You agree not to use the Norse Yacht Co. Website for any illegal or
          unauthorized purposes. You must not engage in any activity that may
          disrupt or interfere with the proper functioning of the Website or
          infringe upon the rights of other users. Norse Yacht Co. reserves the
          right to terminate or restrict access to our Website for any user
          engaging in prohibited activities. Our Website uses cookies and data
          tracking to enhance user experience, as detailed in our Privacy
          Policy.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Eligibility:</h3>
        <p className="info-page__section__text">
          The services on Norse Yacht Co. are intended solely for persons who
          are 18 or older. Any access to or use of the services by anyone under
          18 is expressly prohibited. By accessing or using the services you
          represent and warrant that you are 18 or older and that you are
          responsible for complying with your local laws regarding online
          conduct and acceptable content.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">General Prohibitions:</h3>
        <p className="info-page__section__text">
          Post, upload, publish, submit or transmit any text, graphics, images,
          software, music, audio, video, information or other material that: (I)
          infringes, misappropriates or violates a third party&apos;s patent,
          copyright, trademark, trade secret, moral rights or other intellectual
          property rights, or rights of publicity or privacy, intellectual
          property rights or other third party rights; (II) violates, or
          encourages any conduct that would violate, any applicable law or
          regulation or would give rise to civil liability; (III) is fraudulent,
          false, misleading or deceptive; (IV) is defamatory, obscene,
          pornographic, vulgar or offensive; (V) promotes discrimination,
          bigotry, racism, hatred, harassment or harm against any individual or
          group; (VI) is violent or threatening or promotes violence or actions
          that are threatening to any other person; (VII) harms minors in any
          way; or (VIII) promotes illegal or harmful activities, products or
          substances.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Links to Third-Party Websites:
        </h3>
        <p className="info-page__section__text">
          Our website may contain links to third-party websites for your
          convenience. Norse Yacht Co. is not responsible for the content,
          services, or privacy practices of these third-party sites. We
          encourage you to review the terms and policies of such websites before
          accessing or using them.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Disclaimer of Warranties and Limitation of Liability:
        </h3>
        <p className="info-page__section__text">
          Norse Yacht Co. provides its Website on an &apos;as is&apos; and
          &apos;as available&apos; basis. We make no representations or
          warranties of any kind, express or implied, regarding the operation or
          availability of the Website. Norse Yacht Co. shall not be liable for
          any damages arising from your use of or inability to use our Website,
          within the maximum extent permitted by law.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Governing Law:</h3>
        <p className="info-page__section__text">
          These Terms of Service shall be governed by and construed in
          accordance with the laws of Ireland, without regard to its conflict of
          law provisions.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Changes to the Terms of Service:
        </h3>
        <p className="info-page__section__text">
          Norse Yacht Co. reserves the right to modify or update these Terms of
          Service at any time. Any changes will be effective immediately upon
          posting the updated terms on our Website. If you have any questions or
          concerns about these Terms of Service, please contact us.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Dispute Resolution:</h3>
        <p className="info-page__section__text">
          In the event of a dispute arising from the use of the Norse Yacht Co.
          Website or services, users agree to seek resolution through Irish
          Court.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Specific Services Terms:</h3>
        <p className="info-page__section__text">
          When using Norse Yacht Co.&apos;s yacht survey, selection, and
          contract-making services, users agree to specific terms and conditions
          related to these services, which are outlined in{' '}
          <Link
            href="/terms-of-use"
            className="info-page__link"
          >
            Specific Services Terms
          </Link>
          .
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Privacy Policy:</h3>
        <p className="info-page__section__text">
          For information about how we collect, use, and protect your personal
          data, please refer to our{' '}
          <Link
            href="/privacy-policy"
            className="info-page__link"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
};
