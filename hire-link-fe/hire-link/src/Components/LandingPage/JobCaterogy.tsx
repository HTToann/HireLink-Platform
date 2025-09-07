import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { jobCategory } from "../../Data/Data";

const JobCategory = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center font-semibold mb-3 text-fountain-blue-400">
                Browse <span className="text-shakespeare-800">Job</span> Category
            </div>

            <div className="text-lg mt-7 mx-auto text-fountain-blue-300 text-center w-1/2">
                Explore diverse job opportunities tailored to your skills. Start your career journey today!
            </div>
            <Carousel slideSize="22%" slideGap="md" emblaOptions={{
                loop: true,
                dragFree: false,
                align: 'center'
            }}
                className="focus-visible:[&_button]:!outline-none 
             [&_button]:bg-fountain-blue-400
             [&_button]:border-none 
             [&_button]:hover:opacity-75 
             [&_button]:opacity-0 
             hover:[&_button]:opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {
                    jobCategory.map((category, index) => (
                        <Carousel.Slide key={index}>
                            <div className="flex flex-col items-center w-64 gap-2 border border-shakespeare-700
                            p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out
                             !shadow-fountain-blue-500">
                                <div className="p-2 bg-shakespeare-600 rounded-full">
                                    <img className="h-8 w-8" src={`/Category/${category.name}.png`} alt={category.name} />
                                </div>
                                <div className="text-shakespeare-600 text-xl font-semibold"> {category.name} </div>
                                <div className="text-sm text-center text-fountain-blue-300">{category.desc} </div>
                                <div className="text-shakespeare-700 text-lg">{category.jobs}+ new job posted   </div>
                            </div>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </div>
    );
}
export default JobCategory;