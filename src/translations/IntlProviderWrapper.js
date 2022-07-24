import { IntlProvider } from "react-intl"

import Vietnam from "./vi.json"
import English from "./en.json"
import { useSelector } from "react-redux"

function IntlProviderWrapper({ children }) {
	let nationalLanguage = useSelector(state => state.translate.language)
	const local = navigator.language
	if (nationalLanguage === "vi") {
		nationalLanguage = Vietnam
	} else {
		nationalLanguage = English
	}
	return (
		<IntlProvider
			locale={local}
			messages={nationalLanguage}
			defaultLocale='vi'
		>
			{children}
		</IntlProvider>
	)
}

export default IntlProviderWrapper
