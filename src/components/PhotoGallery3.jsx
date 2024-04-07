import Image from "next/image";

const PhotoGallery3 = () => {
    const images = [
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
      ];

  return (
    <>
    <div className='pt-[160px] pb-[20px] text-left'>SHARE YOUR RADICAL EVOLUTION #LIVEITUP</div>
    <div className="flex flex-row gap-5 items-center pb-[20px] mx-auto">
    {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 989}`} height={300} width={300}/>
      ))}
    </div>
    </>
  )
}

export default PhotoGallery3