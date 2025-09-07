import { companies } from "../../Data/Data";

import Marquee from "react-fast-marquee";

const Companies = () => {
    return <div className="mt-20 pb-5">
        <div className="text-4xl text-center font-semibold text-fountain-blue-400">Trusted By
            <span className="text-shakespeare-800"> 1000+</span> Companies</div>
        <Marquee pauseOnHover={true}>
            {
                companies.map((company, index) => <div key={index}
                    className="mx-7 mt-4 px-2 py-1 bg-fountain-blue-200 hover:bg-shakespeare-800 rounded-xl cursor-pointer">
                    <img className="h-14" src={`/Companies/${company}.png`} alt={company} />
                </div>)
            }
        </Marquee>
    </div>
}
export default Companies;