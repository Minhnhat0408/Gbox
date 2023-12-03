const CoachProfile = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name } = params;

  // TODO: coach have to fill in availabel time in a week

  return <div className="mx-8 !pt-[72px] px-14">{name}</div>;
};

export default CoachProfile;
