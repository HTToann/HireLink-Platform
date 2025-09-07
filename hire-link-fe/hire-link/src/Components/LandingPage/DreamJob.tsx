import { Avatar, AvatarGroup, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        <div className="flex items-center px-16">
            {/* Bên trái: Text + Search */}
            <div className="flex flex-col w-[45%] gap-3">
                <div className="text-6xl font-bold leading-tight text-fountain-blue-400 [&>span]:text-shakespeare-800">
                    Find your <span>dream</span> <span>job</span> with us
                </div>
                <div className="text-lg text-fountain-blue-300">
                    Good life begins with a good company. Start explore thousands of jobs in one place.
                </div>
                <div className="flex gap-3 mt-5">
                    <TextInput
                        className="bg-shakespeare-900 rounded-lg p-1 px-2 text-fountain-blue-300 [&_input]:!text-shakespeare-500"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                    />
                    <TextInput
                        className="bg-shakespeare-900 rounded-lg p-1 px-2 text-fountain-blue-300 [&_input]:!text-shakespeare-500"
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Fulltime"
                    />
                    <div className="flex items-center justify-center h-full w-20 bg-fountain-blue-600 
                    text-shakespeare-400 rounded-lg p-2 hover:bg-shakespeare-900 cursor-pointer">
                        <IconSearch className="h-[85%] w-[85%]" />
                    </div>
                </div>
            </div>

            {/* Bên phải: Hình minh họa + overlay */}
            <div className="w-[55%] flex items-center justify-center">
                <div className="w-[30rem] relative">
                    <img
                        src="/findJob.jpg"
                        alt="job"
                        className="rounded-2xl shadow-lg object-cover"
                    />

                    {/* Overlay bên phải */}
                    <div className="absolute -right-10 top-[50%] translate-y-[-50%] bg-white/60
                     border border-blue-700 rounded-xl p-4 shadow-md backdrop-blur-md">
                        <div className="text-center text-sm font-medium text-gray-800 mb-2">
                            10K+ got job
                        </div>
                        <Avatar.Group>
                            <Avatar src="/toan1.jpg" />
                            <Avatar src="/toan2.jpg" />
                            <Avatar src="/toan3.jpg" />
                            <Avatar style={{
                                backgroundColor: '#245c66',
                                color: '#245c66',
                                fontWeight: 'bold'
                            }}>
                                +9K
                            </Avatar>
                        </Avatar.Group>
                    </div>

                    {/* Overlay bên trái */}
                    <div className="absolute -left-6 top-[28%] bg-white/60 border border-blue-700 rounded-xl p-4 shadow-md backdrop-blur-md flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 p-1 bg-gray-800 rounded-lg">
                                <img src="/Google.png" alt="google" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-sm text-gray-900">
                                <div className="font-semibold">Software Engineer</div>
                                <div className="text-xs text-gray-600">Viet Nam</div>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                            <span>1 day ago</span>
                            <span>120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DreamJob;