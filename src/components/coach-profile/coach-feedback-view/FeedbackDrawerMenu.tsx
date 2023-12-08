import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { useCoachProfile } from "@/hooks/useCoachDetail";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { FeedbackWithStudentProfiles } from "@/types/supabaseTableType";
import { toast } from "sonner";
import LoadingAnimation from "@/components/loading-components/LoadingAnimation";
import FeedbackDrawerItem from "./FeedbackDrawerItem";

const FeedbackDrawerMenu = () => {
  const [loading, setLoading] = useState(true);

  const [feedBack, setFeedback] = useState<FeedbackWithStudentProfiles[]>([]);

  const [open, setOpen] = useState(false);

  const { data } = useCoachProfile();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchFulLFeedback = async () => {
      try {
        const { data: feedBack, error } = await supabaseClient
          .from("feedback")
          .select("*, course_session(*), profiles!feedback_student_id_fkey(*)")
          .eq("coach_id", data.profiles.id)
          .order("rate", { ascending: false });

        if (error) throw error;
        setFeedback(feedBack as FeedbackWithStudentProfiles[]);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (!data || !supabaseClient) return;

    if (open) {
      fetchFulLFeedback();
    }
  }, [data, open, supabaseClient]);

  return (
    <Sheet
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);
        if (open) {
          setLoading(true);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button onClick={() => {}} className="mt-10 shine">
          View Detail
        </Button>
      </SheetTrigger>
      <SheetContent className="remove-button bg-home !p-0 !max-w-[550px]">
        {loading ? (
          <div className="center h-[300px]">
            <LoadingAnimation
              className="w-16 h-16 mt-20 text-primary"
              fill="#00F0FF"
            />
          </div>
        ) : (
          <div className="p-6 h-screen overflow-y-auto">
            <SheetHeader className="pt-6  mb-6">
              <SheetTitle className="text-2xl">
                Feedback ({feedBack.length})
              </SheetTitle>
            </SheetHeader>
            <div className="pb-6 space-y-4">
              {feedBack.map((item, index) => (
                <FeedbackDrawerItem key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FeedbackDrawerMenu;
