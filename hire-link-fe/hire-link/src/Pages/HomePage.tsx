
import Companies from "../Components/LandingPage/Companies";
import DreamJob from "../Components/LandingPage/DreamJob";
import JobCategory from "../Components/LandingPage/JobCaterogy";
import Subscribe from "../Components/LandingPage/Subscribe";
import Testimonials from "../Components/LandingPage/Testimonial";
import Working from "../Components/LandingPage/Working";

const HomePage = () => {

    return (
        <div className="min-h-[100vh] bg-shakespeare-100 font-['poppins']">
            <DreamJob />
            <Companies />
            <JobCategory />
            <Working />
            <Testimonials />
            <Subscribe />
        </div>
    )
}
export default HomePage;