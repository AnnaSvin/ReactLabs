import CookieConsent, { Cookies } from "react-cookie-consent";

const PRIVACY_POLICY_URL =
  "https://github.com/AnnaSvin/ReactLabs/blob/main/PRIVACY_POLICY.md";

/**
 * GDPR-сумісний банер згоди на використання cookie та LocalStorage.
 *
 * Відображається в нижній частині екрану до моменту, поки користувач не
 * натисне «Прийняти» або «Відхилити». Згода зберігається у cookie
 * `ttt-cookie-consent` на 180 днів. При відмові видаляються будь-які
 * необов'язкові cookie, залишаються тільки технічно необхідні.
 */
function CookieBanner() {
  const handleDecline = () => {
    // На випадок, якщо в проєкті колись з'являться аналітичні cookie —
    // видаляємо їх при відмові від згоди.
    Cookies.remove("_ga");
    Cookies.remove("_gid");
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Прийняти"
      declineButtonText="Відхилити"
      enableDeclineButton
      cookieName="ttt-cookie-consent"
      expires={180}
      onDecline={handleDecline}
      ariaAcceptLabel="Прийняти використання cookie"
      ariaDeclineLabel="Відхилити використання cookie"
      style={{
        background: "#1f2937",
        fontSize: "14px",
        alignItems: "center",
        padding: "8px 16px",
      }}
      buttonStyle={{
        background: "#0078d7",
        color: "white",
        borderRadius: "8px",
        padding: "8px 16px",
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
      }}
      declineButtonStyle={{
        background: "#6c757d",
        color: "white",
        borderRadius: "8px",
        padding: "8px 16px",
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
      }}
      contentStyle={{
        flex: "1 1 300px",
        margin: "8px 16px",
      }}
    >
      Цей сайт використовує LocalStorage та технічно необхідні cookie для
      збереження ваших налаштувань гри та історії результатів (ст. 6(1)(a)
      GDPR — згода).{" "}
      <a
        href={PRIVACY_POLICY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#93c5fd", textDecoration: "underline" }}
      >
        Детальніше у Політиці конфіденційності
      </a>
      .
    </CookieConsent>
  );
}

export default CookieBanner;
