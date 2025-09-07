import { Icon24Hours, IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { Divider } from "@mantine/core";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return location.pathname != "/sign-up" &&
        location.pathname != "/login" ? <>
        <div className="pt-20 pb-5 flex gap-5 
    justify-around
    bg-shakespeare-100 font-['poppins']">
            <div className="w-1/4 flex flex-col gap-4">
                <div className="flex gap-1 items-center text-fountain-blue-800">
                    <Icon24Hours className="h-6 w-6" stroke={2.5} />
                    <div className="text-xl font-semibold ">HireLink</div>
                </div>
                <div className="text-sm text-fountain-blue-300 font-semibold">
                    HireLink with user profiles, skill updates, certifications, work experience and admin job posting.</div>

                <div className="flex gap-3 text-fountain-blue-400 
        [&>div]:bg-shakespeare-600
        [&>div]:p-2 
        [&>div]:rounded-full 
        [&>div]:cursor-pointer 
        hover:[&>div]:bg-shakespeare-800">
                    <div><IconBrandFacebook /></div>
                    <div><IconBrandInstagram /></div>
                    <div><IconBrandX /></div>
                </div>
            </div>
            {
                footerLinks.map((item, index) => <div key={index}>
                    <div className="text-lg font-semibold mb-4 text-shakespeare-600">{item.title}</div>
                    {
                        item.links.map((link, linkIndex) => (
                            <div key={linkIndex} className="text-sm text-fountain-blue-300 font-semibold
                         hover:text-shakespeare-700 cursor-pointer mb-1
                         hover:translate-x-2 
                         transition duration-300 ease-in-out">
                                {link}
                            </div>
                        ))
                    }

                </div>)
            }
        </div>
        <Divider size="xs" mx="md" />
        <div className="bg-shakespeare-100 text-fountain-blue-300  font-semibold font-medium text-center p-5 aos-init aos-animate">
            Desgined & Developed By
            <a className="text-shakespeare-600 hover:underline font-semibold " href="https://github.com/HTToann"> Troy Hoang </a>
        </div>
    </> : <></>
}
export default Footer;