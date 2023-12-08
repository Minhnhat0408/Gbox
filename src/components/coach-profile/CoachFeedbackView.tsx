"use client";

import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const CoachFeedbackView = () => {
  const [canFeedback, setCanFeedback] = useState(false);

  const { data } = useCoachProfile();

  const { userDetails } = useUser();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {}, []);

  return <div className="w-full my-5">1</div>;
};

export default CoachFeedbackView;
