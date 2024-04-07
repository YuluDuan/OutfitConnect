import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function ImageCard({ imageURL, width, height }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<Image src={imageURL} alt="Image" width={width} height={height} className="rounded-md object-cover" />
			</CardContent>
			<div className="flex justify-between">
				<div>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</div>
				<div className="self-end">
					<div style={{ margin: '10px 10px' }}> {/* Add margin */}
						<Button variant="outline" className="flex items-center">
							<FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem' }} />
							Like
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}