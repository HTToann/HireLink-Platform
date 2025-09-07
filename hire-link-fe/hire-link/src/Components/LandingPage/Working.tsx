import { Avatar } from "@mantine/core";
import { work } from "../../Data/Data";

const Working = () => {
    return <div className="mt-20 pb-5">
        <div className="text-4xl text-center font-semibold mb-3 text-fountain-blue-400">
            How it <span className="text-shakespeare-800">Works</span>
        </div>

        <div className="text-lg mt-7 mb-4 mx-auto text-fountain-blue-300 text-center w-1/2">
            Effortlessly navigate your job search with our intuitive platform.
        </div>
        <div className="flex px-16 justify-between items-center">
            <div className="relative">
                <img className="w-[30rem] rounded-xl" src="/Working/womanWork.png" alt="girl" />

            </div>
            <div className="flex flex-col gap-10">
                {
                    work.map((item, index) => <div key={index} className="flex items-center gap-4">
                        <div className="p-2.5 bg-shakespeare-600 rounded-full">
                            <img className="h-12 w-12" src={`/Working/${item.name}.png`} alt={item.name} />
                        </div>
                        <div>
                            <div className="text-shakespeare-600 text-xl font-semibold">{item.name}</div>
                            <div className="text-fountain-blue-300">{item.desc}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div >
}
export default Working;