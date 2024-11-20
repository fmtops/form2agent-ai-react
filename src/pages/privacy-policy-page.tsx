import { Container, ListItem, Typography } from "@mui/material";
import StyledUnorderedList from "../components/common/mui-styled/styled-unordered-list";

const PrivacyPolicy = () => {
  return (
    <Container className="my-8 !px-0">
      <section className="flex flex-col gap-8">
        <section
          id="privacy-policy-info-section"
          className="flex flex-col gap-2"
        >
          <Typography variant="h3" component="h1" className="text-gray-800">
            Privacy Policy
          </Typography>
          <div className="flex flex-col gap-1 text-gray-600">
            <p>Last updated: August 14, 2024</p>
            <p>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the{" "}
              <a
                href="https://www.termsfeed.com/privacy-policy-generator/"
                className="text-text-brand-light"
                target="_blank"
              >
                Privacy Policy Generator
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="interpretation-definitions-section"
          className="flex flex-col gap-4"
        >
          <Typography variant="h4" component="h2" className="text-gray-700">
            Interpretation and Definitions
          </Typography>
          <section id="interpretation-section" className="flex flex-col gap-2">
            <Typography variant="h5" component="h3" className="text-gray-700">
              Interpretation
            </Typography>
            <p className="text-gray-600">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
          </section>
          <section id="definitions-section" className="flex flex-col gap-2">
            <Typography variant="h5" component="h3" className="text-gray-700">
              Definitions
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>For the purposes of this Privacy Policy:</p>
              <StyledUnorderedList className="flex flex-col gap-1">
                <ListItem>
                  <span className="font-semibold">Account</span> means a unique
                  account created for You to access our Service or parts of our
                  Service.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Affiliate</span> means an
                  entity that controls, is controlled by or is under common
                  control with a party, where "control" means ownership of 50%
                  or more of the shares, equity interest or other securities
                  entitled to vote for election of directors or other managing
                  authority. Application refers to Form2Agent AI demo, the
                  software program provided by the Company.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Company</span> (referred to as
                  either "the Company", "We", "Us" or "Our" in this Agreement)
                  refers to Freeport Metrics, Inc., 254 Commercial Street Suite
                  245 Portland, Maine. 04101.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Cookies</span> are small files
                  that are placed on Your computer, mobile device or any other
                  device by a website, containing the details of Your browsing
                  history on that website among its many uses.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Country</span> refers to:
                  Maine, United States Device means any device that can access
                  the Service such as a computer, a cellphone or a digital
                  tablet.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Personal Data</span> is any
                  information that relates to an identified or identifiable
                  individual.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Service</span> refers to the
                  Application or the Website or both.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Service Provider</span> means
                  any natural or legal person who processes the data on behalf
                  of the Company. It refers to third-party companies or
                  individuals employed by the Company to facilitate the Service,
                  to provide the Service on behalf of the Company, to perform
                  services related to the Service or to assist the Company in
                  analyzing how the Service is used.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Usage Data</span> refers to
                  data collected automatically, either generated by the use of
                  the Service or from the Service infrastructure itself (for
                  example, the duration of a page visit).
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Website</span> refers to
                  Form2Agent AI, accessible from{" "}
                  <a
                    href="https://form2agent-demo.freeportmetrics.com/"
                    className="text-text-brand-light"
                    target="_blank"
                  >
                    https://form2agent-demo.freeportmetrics.com/
                  </a>
                  .
                </ListItem>
                <ListItem>
                  <span className="font-semibold">You</span> means the
                  individual accessing or using the Service, or the company, or
                  other legal entity on behalf of which such individual is
                  accessing or using the Service, as applicable.
                </ListItem>
              </StyledUnorderedList>
            </div>
          </section>
        </section>

        <section
          id="data-collection-usage-section"
          className="flex flex-col gap-4"
        >
          <Typography variant="h4" component="h2" className="text-gray-700">
            Collecting and Using Your Personal Data
          </Typography>
          <section id="data-types-section" className="flex flex-col gap-3">
            <Typography variant="h5" component="h3" className="text-gray-700">
              Types of Data Collected
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <Typography variant="h6" component="h4" className="text-gray-700">
                Personal Data
              </Typography>
              <p>
                While using Our Service, We may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
              </p>
              <StyledUnorderedList className="flex flex-col gap-1">
                <ListItem>Usage Data</ListItem>
              </StyledUnorderedList>
            </div>
            <div className="flex flex-col gap-1 text-gray-600">
              <Typography variant="h6" component="h4" className="text-gray-700">
                Usage Data
              </Typography>
              <p>
                Usage Data is collected automatically when using the Service.
              </p>
              <p>
                Usage Data may include information such as content of the
                message with a bot, Your Device's Internet Protocol address
                (e.g. IP address), browser type, browser version, the pages of
                our Service that You visit, the time and date of Your visit, the
                time spent on those pages, unique device identifiers and other
                diagnostic data.
              </p>
              <p>
                When You access the Service by or through a mobile device, We
                may collect certain information automatically, including, but
                not limited to, the type of mobile device You use, Your mobile
                device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You
                use, unique device identifiers and other diagnostic data.
              </p>
              <p>
                We may also collect information that Your browser sends whenever
                You visit our Service or when You access the Service by or
                through a mobile device.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-gray-600">
              <Typography variant="h6" component="h4" className="text-gray-700">
                Tracking Technologies and Cookies
              </Typography>
              <p>
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p>
              <StyledUnorderedList className="flex flex-col gap-1">
                <ListItem>
                  <span className="font-semibold">
                    Cookies or Browser Cookies.
                  </span>{" "}
                  A cookie is a small file placed on Your Device. You can
                  instruct Your browser to refuse all Cookies or to indicate
                  when a Cookie is being sent. However, if You do not accept
                  Cookies, You may not be able to use some parts of our Service.
                  Unless you have adjusted Your browser setting so that it will
                  refuse Cookies, our Service may use Cookies.
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Web Beacons.</span> Certain
                  sections of our Service and our emails may contain small
                  electronic files known as web beacons (also referred to as
                  clear gifs, pixel tags, and single-pixel gifs) that permit the
                  Company, for example, to count users who have visited those
                  pages or opened an email and for other related website
                  statistics (for example, recording the popularity of a certain
                  section and verifying system and server integrity).
                </ListItem>
              </StyledUnorderedList>
              <p>
                Cookies can be "Persistent" or "Session" Cookies. Persistent
                Cookies remain on Your personal computer or mobile device when
                You go offline, while Session Cookies are deleted as soon as You
                close Your web browser. You can learn more about cookies on
                TermsFeed website article.
              </p>
              <p>
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p>
              <div>
                <StyledUnorderedList className="flex flex-col gap-1">
                  <ListItem>
                    <p className="font-semibold">
                      Necessary / Essential Cookies
                    </p>
                    <p>Type: Session Cookies</p>
                    <p>Administered by: Us</p>
                    <p>
                      Purpose: These Cookies are essential to provide You with
                      services available through the Website and to enable You
                      to use some of its features. They help to authenticate
                      users and prevent fraudulent use of user accounts. Without
                      these Cookies, the services that You have asked for cannot
                      be provided, and We only use these Cookies to provide You
                      with those services.
                    </p>
                  </ListItem>
                  <ListItem>
                    <p className="font-semibold">
                      Cookies Policy / Notice Acceptance Cookies
                    </p>
                    <p>Type: Persistent</p>
                    <p>Cookies Administered by: Us</p>
                    <p>
                      Purpose: These Cookies identify if users have accepted the
                      use of cookies on the Website.
                    </p>
                  </ListItem>
                  <ListItem>
                    <p className="font-semibold">Functionality Cookies</p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>
                      Purpose: These Cookies allow us to remember choices You
                      make when You use the Website, such as remembering your
                      login details or language preference. The purpose of these
                      Cookies is to provide You with a more personal experience
                      and to avoid You having to re-enter your preferences every
                      time You use the Website. For more information about the
                      cookies we use and your choices regarding cookies, please
                      visit our Cookies Policy or the Cookies section of our
                      Privacy Policy.
                    </p>
                  </ListItem>
                </StyledUnorderedList>
                <p>
                  For more information about the cookies we use and your choices
                  regarding cookies, please visit our Cookies Policy or the
                  Cookies section of our Privacy Policy.
                </p>
              </div>
            </div>
          </section>
          <section id="use-of-data-section" className="flex flex-col gap-2">
            <Typography variant="h5" component="h3" className="text-gray-700">
              Use of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex flex-col gap-1">
                <p>
                  The Company may use Personal Data for the following purposes:
                </p>
                <StyledUnorderedList className="flex flex-col gap-1">
                  <ListItem>
                    <span className="font-semibold">
                      To provide and maintain our Service
                    </span>
                    , including to monitor the usage of our Service.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      To manage Your Account:
                    </span>{" "}
                    to manage Your registration as a user of the Service. The
                    Personal Data You provide can give You access to different
                    functionalities of the Service that are available to You as
                    a registered user.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      For the performance of a contract:
                    </span>{" "}
                    the development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">To contact You:</span> To
                    contact You by email, telephone calls, SMS, or other
                    equivalent forms of electronic communication, such as a
                    mobile application's push notifications regarding updates or
                    informative communications related to the functionalities,
                    products or contracted services, including the security
                    updates, when necessary or reasonable for their
                    implementation.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">To provide You</span> with
                    news, special offers and general information about other
                    goods, services and events which we offer that are similar
                    to those that you have already purchased or enquired about
                    unless You have opted not to receive such information.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      To manage Your requests:
                    </span>{" "}
                    To attend and manage Your requests to Us.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      For business transfers:
                    </span>{" "}
                    We may use Your information to evaluate or conduct a merger,
                    divestiture, restructuring, reorganization, dissolution, or
                    other sale or transfer of some or all of Our assets, whether
                    as a going concern or as part of bankruptcy, liquidation, or
                    similar proceeding, in which Personal Data held by Us about
                    our Service users is among the assets transferred.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">For other purposes:</span>{" "}
                    We may use Your information for other purposes, such as data
                    analysis, identifying usage trends, determining the
                    effectiveness of our promotional campaigns and to evaluate
                    and improve our Service, products, services, marketing and
                    your experience.
                  </ListItem>
                </StyledUnorderedList>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  We may share Your personal information in the following
                  situations:
                </p>
                <StyledUnorderedList className="flex flex-col gap-1">
                  <ListItem>
                    <span className="font-semibold">
                      With Service Providers:
                    </span>{" "}
                    We may share Your personal information with Service
                    Providers to monitor and analyze the use of our Service, to
                    contact You.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      For business transfers:
                    </span>{" "}
                    We may share or transfer Your personal information in
                    connection with, or during negotiations of, any merger, sale
                    of Company assets, financing, or acquisition of all or a
                    portion of Our business to another company.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">With Affiliates:</span> We
                    may share Your information with Our affiliates, in which
                    case we will require those affiliates to honor this Privacy
                    Policy. Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">
                      With business partners:
                    </span>{" "}
                    We may share Your information with Our business partners to
                    offer You certain products, services or promotions.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">With other users:</span>{" "}
                    when You share personal information or otherwise interact in
                    the public areas with other users, such information may be
                    viewed by all users and may be publicly distributed outside.
                  </ListItem>
                  <ListItem>
                    <span className="font-semibold">With Your consent:</span> We
                    may disclose Your personal information for any other purpose
                    with Your consent.
                  </ListItem>
                </StyledUnorderedList>
              </div>
            </div>
          </section>
          <section
            id="retention-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Retention of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of Our Service, or We
                are legally obligated to retain this data for longer time
                periods.
              </p>
            </div>
          </section>
          <section
            id="transfer-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Transfer of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>
                Your information, including Personal Data, is processed in the
                United States of America and, within the European Economic Area
                (EEA), at the Company's operating offices and in any other
                places where the parties involved in the processing are located.
                This may include processing in the cloud environment using
                services provided by reputable third-party cloud service
                providers. It means that this information may be transferred to
                — and maintained on — computers located outside of Your state,
                province, country or other governmental jurisdiction where the
                data protection laws may differ than those from Your
                jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission
                of such information represents Your agreement to that transfer.
              </p>
              <p>
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
              </p>
            </div>
          </section>
          <section
            id="deletion-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Deletion of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>
                You have the right to delete or request that We assist in
                deleting the Personal Data that We have collected about You.
              </p>
              <p>
                Our Service may give You the ability to delete certain
                information about You from within the Service.
              </p>
              <p>
                You may update, amend, or delete Your information at any time by
                signing in to Your Account, if you have one, and visiting the
                account settings section that allows you to manage Your personal
                information. You may also contact Us to request access to,
                correct, or delete any personal information that You have
                provided to Us.
              </p>
              <p>
                Please note, however, that We may need to retain certain
                information when we have a legal obligation or lawful basis to
                do so.
              </p>
            </div>
          </section>
          <section
            id="disclosure-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Disclosure of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Business Transactions</p>
                <p>
                  If the Company is involved in a merger, acquisition or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Law enforcement</p>
                <p>
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Other legal requirements</p>
                <p>
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                </p>
                <StyledUnorderedList className="flex flex-col gap-1">
                  <ListItem>Comply with a legal obligation</ListItem>
                  <ListItem>
                    Protect and defend the rights or property of the Company
                  </ListItem>
                  <ListItem>
                    Prevent or investigate possible wrongdoing in connection
                    with the Service
                  </ListItem>
                  <ListItem>
                    Protect the personal safety of Users of the Service or the
                    public
                  </ListItem>
                  <ListItem>Protect against legal liability</ListItem>
                </StyledUnorderedList>
              </div>
            </div>
          </section>
          <section
            id="security-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Security of Your Personal Data
            </Typography>
            <p className="text-gray-600">
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </p>
          </section>
          <section
            id="processing-of-data-section"
            className="flex flex-col gap-2"
          >
            <Typography variant="h5" component="h3" className="text-gray-700">
              Detailed Information on the Processing of Your Personal Data
            </Typography>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>
                The Service Providers We use may have access to Your Personal
                Data. These third-party vendors collect, store, use, process and
                transfer information about Your activity on Our Service in
                accordance with their Privacy Policies.
              </p>
              <p>
                Analytics We may use third-party Service providers to monitor
                and analyze the use of our Service.
              </p>
              <StyledUnorderedList className="flex flex-col gap-1">
                <ListItem>Google Analytics</ListItem>
              </StyledUnorderedList>
              <div className="flex flex-col gap-1">
                <p>
                  Google Analytics is a web analytics service offered by Google
                  that tracks and reports website traffic. Google uses the data
                  collected to track and monitor the use of our Service. This
                  data is shared with other Google services. Google may use the
                  collected data to contextualize and personalize the ads of its
                  own advertising network.
                </p>
                <p>
                  You can opt-out of having made your activity on the Service
                  available to Google Analytics by installing the Google
                  Analytics opt-out browser add-on. The add-on prevents the
                  Google Analytics JavaScript (ga.js, analytics.js and dc.js)
                  from sharing information with Google Analytics about visits
                  activity.
                </p>
                <p>
                  For more information on the privacy practices of Google,
                  please visit the Google Privacy &amp; Terms web page:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-text-brand-light"
                    target="_blank"
                  >
                    https://policies.google.com/privacy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </section>
        <section id="childrens-section" className="flex flex-col gap-2">
          <Typography variant="h4" component="h2" className="text-gray-700">
            Children's Privacy
          </Typography>
          <div className="flex flex-col gap-1 text-gray-600">
            <p>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </p>
            <p>
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent's consent before We collect and use that
              information.
            </p>
          </div>
        </section>
        <section
          id="links-to-other-websites-section"
          className="flex flex-col gap-2"
        >
          <Typography variant="h4" component="h2" className="text-gray-700">
            Links to Other Websites
          </Typography>
          <div className="flex flex-col gap-1 text-gray-600">
            <p>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </p>
          </div>
        </section>
        <section id="changes-to-policy-section" className="flex flex-col gap-2">
          <Typography variant="h4" component="h2" className="text-gray-700">
            Changes to this Privacy Policy
          </Typography>
          <div className="flex flex-col gap-1 text-gray-600">
            <p>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p>
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
        </section>
        <section id="changes-to-policy-section" className="flex flex-col gap-2">
          <Typography variant="h4" component="h2" className="text-gray-700">
            Contact Us
          </Typography>
          <div className="flex flex-col gap-1 text-gray-600">
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <p>
              By email:{" "}
              <a
                href="mailto:info@freeportmetrics.com"
                className="text-text-brand-light"
                target="_blank"
              >
                info@freeportmetrics.com
              </a>
            </p>
            <p>
              By visiting this page on our website:{" "}
              <a
                href="https://form2agent.freeportmetrics.com/"
                className="text-text-brand-light"
                target="_blank"
              >
                https://form2agent.freeportmetrics.com/
              </a>
            </p>
          </div>
        </section>
      </section>
    </Container>
  );
};

export default PrivacyPolicy;
