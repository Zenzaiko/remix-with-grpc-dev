export const getImage = (fileName: string): string => {
	const imagePath = new URL("~/assets/", import.meta.url).href;
	console.log(imagePath);
	console.log(`${imagePath}/${fileName}.png`);
	return `${imagePath}/${fileName}.png`;
};
