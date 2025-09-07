import { Button, TextInput } from "@mantine/core";

const Subscribe = () => {
    return <div className="mt-20 flex items-center bg-shakespeare-600 mx-20 py-3 rounded-xl justify-around">
        <div className="text-4xl w-2/5 text-center font-semibold text-fountain-blue-400">
            Never Wants to miss Any <span className="text-shakespeare-800">Job News?</span>   </div>
        <div className="flex gap-4 rounded-xl bg-fountain-blue-200 px-3 py-2 items-center">
            <TextInput
                className="[&_input]:text-fountain-blue-300 font-semibold"
                variant="unstyled"
                placeholder="Your@gmail.com"
                size="xl"
            />
            <Button className="!rounded-lg" size="lg" color="shakeSpeare.6" variant="filled"> Subscribe </Button>
        </div>
    </div>
}
export default Subscribe;