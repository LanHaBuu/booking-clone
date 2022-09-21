function Test() {
	const arr1 = ["Java", "PHP", "Mongo"]
	const arr2 = ["ReactJs", "PHP", "Python"]

	const arr3 = arr1.filter(item => arr2.includes(item))
	console.log(arr3)

	return <div></div>
}

export default Test
