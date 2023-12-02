import { CoachApplicationType } from "@/types/supabaseTableType";

export default function convertCoachProfileData(data: CoachApplicationType) {
  return {
    created_at: new Date(),
    user_id: data.profiles.id,
    full_name: data.first_name + " " + data.last_name,
    description: data.description,
    country: data.country,
    game_role_and_characters: data.game_role_and_characters
      ? data.game_role_and_characters.reduce((acc, prev, index) => {
          if (index === 0) {
            return prev;
          }
          return acc + ", " + prev;
        })
      : "",
    coach_games: data.coach_games,
    coach_time: data.coach_time,
    contact_email: data.contact_email,
    social_links: data.social_links,
    preview_images: data.support_images,
    updated_at: new Date(),
  };
}
