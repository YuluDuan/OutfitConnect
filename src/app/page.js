import PhotoGallery3 from "@/components/PhotoGallery3"
import BrowseActivities from "@/components/BrowseActivities"
import LandingPageHeader from "@/components/LandingPageHeader";


export default function LandingPage () {
  
  return (
    <section className="flex flex-col w-full h-full items-center">
      <LandingPageHeader/>
      <PhotoGallery3/>
      <BrowseActivities/>
    </section>
  );
};



