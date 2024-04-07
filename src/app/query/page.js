import ImageCard from "@/app/components/imageCard";
import testImage from './query_img.png';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h2>Query youCode</h2>
			<ImageCard imageURL={testImage} widht='300' height='300' />
		</main>
	);
}