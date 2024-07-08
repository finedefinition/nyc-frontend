import styles from '@/styles/typography.module.scss';

export default function CookiesPolicy() {
  return (
    <div className="info-page">
      <div className="info-page__top">
        <h1 className={styles.typo_h3_gray}>
          Cookies Policy of Norse Yacht Co.
        </h1>
        <h6 className={styles.typo_small_txt}>Last Updated: 25.01.2024</h6>
      </div>
      <p className="info-page__section">
        Welcome to Norse Yacht Co. This Cookies Policy explains how we use
        cookies and similar technologies on our website www.norseyacht.com. By
        using our website, you agree to the use of cookies and similar
        technologies as described in this policy.
      </p>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Cookies Policy</h3>
        <p className="info-page__section__text">
          This Cookie Policy (&quot;Policy&quot;) describes the use of cookies
          and related technologies on the Norse Yacht Co. website
          (&quot;Website&quot;) by Norse Yacht Co. (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;).
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">What are Cookies?</h3>
        <p className="info-page__section__text">
          Cookies are small text files that are placed on your computer or
          mobile device when you visit a website. They are widely used to
          improve the user experience of websites by storing your preferences
          and information about your browsing habits.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">How Do We Use Cookies?</h3>
        <h4 className="info-page__section__text">
          We use cookies on our Website to:
        </h4>
        <ul className="info-page__section__list">
          <li>
            Remember your preferences: We use cookies to remember your
            preferences, such as your language and location, so that we can
            provide you with a more personalized experience.
          </li>
          <li>
            Analyze website traffic: We use cookies to analyze website traffic
            to help us understand how people use our Website and to improve our
            services.
          </li>
          <li>
            Deliver targeted advertising: We use cookies to deliver targeted
            advertising to you based on your interests.
          </li>
          <li>
            Improve site security: We use cookies to help us improve the
            security of our Website.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Types of Cookies We Use?</h3>
        <h4 className="info-page__section__text">
          We use the following types of cookies on our Website:
        </h4>
        <ul className="info-page__section__list">
          <li>
            Essential cookies: These cookies are essential for the functioning
            of our Website and cannot be disabled. They include cookies that
            enable you to log in to your account, use a shopping cart, and make
            secure purchases.
          </li>
          <li>
            Performance cookies: These cookies collect information about how you
            use our Website, such as the pages you visit and the links you
            click. We use this information to improve the performance of our
            Website and to provide you with a better user experience.
          </li>
          <li>
            Functional cookies: These cookies allow us to remember your
            preferences, such as your language and location. This means that we
            do not need to ask you to re-enter this information each time you
            visit our Website.
          </li>
          <li>
            Targeting cookies: These cookies collect information about your
            browsing habits and interests. We use this information to show you
            targeted advertising that is relevant to you.
          </li>
        </ul>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">How to Control Cookies</h3>
        <p className="info-page__section__text">
          You can control your cookie preferences by using the settings on your
          browser. Most browsers allow you to block cookies, allow cookies for
          certain websites only, or delete cookies. Please note that if you
          block all cookies, you may not be able to use all the features of our
          Website.
        </p>
      </section>
      <p className="info-page__section">
        For more information about cookies and how to control them, please visit
        the following website:{' '}
        <a
          href="http://www.allaboutcookies.org"
          target="_blank"
          rel="noopener noreferrer"
          className="info-page__link"
        >
          allaboutcookies.org
        </a>
      </p>
      <section className="info-page__section">
        <h3 className="info-page__section__header">
          Changes to Our Cookie Policy
        </h3>
        <p className="info-page__section__text">
          We may update this Policy from time to time to reflect changes in our
          cookies practices. If we make any material changes, we will notify you
          by email or by posting a prominent notice on our Website.
        </p>
      </section>
      <section className="info-page__section">
        <h3 className="info-page__section__header">Contact Us</h3>
        <p className="info-page__section__text">
          If you have any questions about this Policy, please contact us at{' '}
          <a
            href="mailto:info@norseyacht.com"
            className="info-page__link"
          >
            info@norseyacht.com
          </a>
        </p>
      </section>
    </div>
  );
};
