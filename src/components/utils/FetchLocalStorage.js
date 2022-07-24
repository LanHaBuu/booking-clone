export const fetchUserGg = () => {
	const userInfoGg =
		localStorage.getItem("userGg") !== undefined
			? JSON.parse(localStorage.getItem("userGg"))
			: localStorage.clear()
	return userInfoGg
}

export const fetchUserFb = () => {
	const userInfoFb =
		localStorage.getItem("userFb") !== undefined
			? JSON.parse(localStorage.getItem("userFb"))
			: localStorage.clear()
	return userInfoFb
}

export const saveLanguage = () => {
	const language =
		localStorage.getItem("language") !== undefined
			? JSON.parse(localStorage.getItem("language"))
			: localStorage.clear()
	return language
}
