import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindJobs/SearchBar";
import Jobs from "../Components/FindJobs/Jobs";

const FindJobsPage = () => {
    return (
        <div className="min-h-[100vh] bg-shakespeare-100 font-['poppins']">
            <SearchBar />
            <Divider size="xs" mx="md" />
            <Jobs />
        </div>
    )
}
export default FindJobsPage;