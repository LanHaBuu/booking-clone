export const buildFormData = data => {
	const newArr = []
	if (data && data.length > 0) {
		data.map(item => {
			const obj = {}
			obj.value = item.id
			obj.label = item.name || item.value
			newArr.push(obj)
		})
	}
	return newArr
}
