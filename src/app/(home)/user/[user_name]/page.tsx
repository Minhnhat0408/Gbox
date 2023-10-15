import { AiOutlineUserAdd } from "react-icons/ai";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";

type UserProfileProps = { params: { user_name: string } };

function UserPage({ params }: UserProfileProps) {


  return (
    <div className="mx-8 !pt-20">
      <ProfileHeader params={params} />

      <ProfileBody params={params} />
    </div>
  )
}

export default UserPage;
