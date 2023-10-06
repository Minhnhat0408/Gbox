type UserProfileProps = { params: { user_name: string } };

function UserPage({ params }: UserProfileProps) {
  return <div>{params.user_name}</div>;
}

export default UserPage;
