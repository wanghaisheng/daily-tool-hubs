import React, { useEffect } from "react";
import CookiConsent, {
	Cookies,
	getCookieConsentValue,
} from "react-cookie-consent";
import ReactGA from "react-ga4";
import usePageTitle from "components/Hoc/withPageTitle/utils/hooks";
import {
	BUTTON_STYLES,
	COOKIE_CONSENT_STYLES,
	GOOGLE_ANALYTICS_COOKIES,
	GOOGLE_ANALYTICS_ID,
	HIT_TYPE,
} from "./utils/constants";
import CookieConsentText from "./components/CookieConsentText";

const CookieConsent: React.FC = () => {
	const { title, url } = usePageTitle();

	const handleAcceptCookie = () => {
		ReactGA.initialize(GOOGLE_ANALYTICS_ID);
		ReactGA.send({
			hitType: HIT_TYPE,
			page: url,
			title,
		});
	};

	const handleDeclineCookie = () => {
		GOOGLE_ANALYTICS_COOKIES.forEach((cookie) => Cookies.remove(cookie));
	};

	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === "true") {
			handleAcceptCookie();
		}
	}, []);

	return (
		<CookiConsent
			onAccept={handleAcceptCookie}
			onDecline={handleDeclineCookie}
			enableDeclineButton
			flipButtons={true}
			style={COOKIE_CONSENT_STYLES}
			buttonStyle={BUTTON_STYLES}
			declineButtonStyle={BUTTON_STYLES}
			declineButtonClasses=""
			declineButtonText="Decline"
			buttonText="Accept"
		>
			<CookieConsentText />
		</CookiConsent>
	);
};

export default CookieConsent;
