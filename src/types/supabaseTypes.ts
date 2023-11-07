export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type timeplay = {
  time: string;
  type: string;
};

export interface Database {
  public: {
    Tables: {
      achievement_obtainers: {
        Row: {
          achievement_id: string | null;
          id: string;
          obtained_at: string;
          profile_id: string | null;
        };
        Insert: {
          achievement_id?: string | null;
          id?: string;
          obtained_at?: string;
          profile_id?: string | null;
        };
        Update: {
          achievement_id?: string | null;
          id?: string;
          obtained_at?: string;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "achievement_obtainers_achievement_id_fkey";
            columns: ["achievement_id"];
            isOneToOne: false;
            referencedRelation: "achievements";
            referencedColumns: ["id"];
          }
        ];
      };
      achievements: {
        Row: {
          created_at: string;
          description: string | null;
          game_id: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          game_id?: string | null;
          id?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          game_id?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          appoinment_date: string;
          course_student_id: string;
          id: string;
          note: string | null;
        };
        Insert: {
          appoinment_date: string;
          course_student_id: string;
          id?: string;
          note?: string | null;
        };
        Update: {
          appoinment_date?: string;
          course_student_id?: string;
          id?: string;
          note?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_course_student_id_fkey";
            columns: ["course_student_id"];
            isOneToOne: false;
            referencedRelation: "course_students";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          created_at: string;
          id: string;
          media: Json | null;
          modified_at: string;
          post_id: string;
          reply_comment_id: string | null;
          text: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          media?: Json | null;
          modified_at?: string;
          post_id: string;
          reply_comment_id?: string | null;
          text?: string | null;
          type?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          media?: Json | null;
          modified_at?: string;
          post_id?: string;
          reply_comment_id?: string | null;
          text?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      course_students: {
        Row: {
          course_id: string | null;
          created_at: string;
          id: string;
          joined_date: string | null;
          user_id: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          joined_date?: string | null;
          user_id?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          id?: string;
          joined_date?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "course_students_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_students_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      courses: {
        Row: {
          created_at: string;
          description: string;
          email_verified_date: string | null;
          id: string;
          price: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          email_verified_date?: string | null;
          id?: string;
          price: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          email_verified_date?: string | null;
          id?: string;
          price?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "courses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      demands: {
        Row: {
          created_at: string;
          game_id: string | null;
          id: string;
          is_active: boolean | null;
          nums_of_player: number | null;
          room_id: string;
        };
        Insert: {
          created_at?: string;
          game_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          nums_of_player?: number | null;
          room_id: string;
        };
        Update: {
          created_at?: string;
          game_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          nums_of_player?: number | null;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "demands_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          }
        ];
      };
      event_participations: {
        Row: {
          event_id: string | null;
          id: string;
          is_sended_reminder_one_day: boolean | null;
          is_sended_reminder_one_hour: boolean | null;
          is_sended_reminder_three_days: boolean | null;
          joined_date: string;
          participation_id: string | null;
        };
        Insert: {
          event_id?: string | null;
          id?: string;
          is_sended_reminder_one_day?: boolean | null;
          is_sended_reminder_one_hour?: boolean | null;
          is_sended_reminder_three_days?: boolean | null;
          joined_date?: string;
          participation_id?: string | null;
        };
        Update: {
          event_id?: string | null;
          id?: string;
          is_sended_reminder_one_day?: boolean | null;
          is_sended_reminder_one_hour?: boolean | null;
          is_sended_reminder_three_days?: boolean | null;
          joined_date?: string;
          participation_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_participations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_participations_participation_id_fkey";
            columns: ["participation_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          cover_image: string;
          description: string;
          end_date: string | null;
          event_name: string;
          game_meta_data: Json | null;
          game_name: string | null;
          id: string;
          is_instance: boolean | null;
          rules: string[] | null;
          start_date: string;
          tags: string[] | null;
          total_people: string | null;
          user_id: string | null;
        };
        Insert: {
          cover_image: string;
          description: string;
          end_date?: string | null;
          event_name: string;
          game_meta_data?: Json | null;
          game_name?: string | null;
          id?: string;
          is_instance?: boolean | null;
          rules?: string[] | null;
          start_date: string;
          tags?: string[] | null;
          total_people?: string | null;
          user_id?: string | null;
        };
        Update: {
          cover_image?: string;
          description?: string;
          end_date?: string | null;
          event_name?: string;
          game_meta_data?: Json | null;
          game_name?: string | null;
          id?: string;
          is_instance?: boolean | null;
          rules?: string[] | null;
          start_date?: string;
          tags?: string[] | null;
          total_people?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          application: Json | null;
          content: string | null;
          created_at: string | null;
          id: string;
          is_seen: boolean;
          media: Json[] | null;
          receiver_id: string | null;
          room_id: string | null;
          sender_id: string | null;
        };
        Insert: {
          application?: Json | null;
          content?: string | null;
          created_at?: string | null;
          id?: string;
          is_seen?: boolean;
          media?: Json[] | null;
          receiver_id?: string | null;
          room_id?: string | null;
          sender_id?: string | null;
        };
        Update: {
          application?: Json | null;
          content?: string | null;
          created_at?: string | null;
          id?: string;
          is_seen?: boolean;
          media?: Json[] | null;
          receiver_id?: string | null;
          room_id?: string | null;
          sender_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          link_to: string | null;
          notification_meta_data: Json | null;
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id: string | null;
          sender_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id: string;
          link_to?: string | null;
          notification_meta_data?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id?: string | null;
          sender_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          link_to?: string | null;
          notification_meta_data?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id?: string | null;
          sender_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      play_historys: {
        Row: {
          created_at: string;
          demand_id: string | null;
          end_date: string | null;
          id: string | null;
        };
        Insert: {
          created_at?: string;
          demand_id?: string | null;
          end_date?: string | null;
          id?: string | null;
        };
        Update: {
          created_at?: string;
          demand_id?: string | null;
          end_date?: string | null;
          id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "play_historys_demand_id_fkey";
            columns: ["demand_id"];
            isOneToOne: false;
            referencedRelation: "demands";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          content: string;
          created_at: string;
          event_id: string | null;
          game_meta_data: Json | null;
          game_name: string | null;
          game_progress: string | null;
          id: string;
          is_event_post: boolean | null;
          media: Json | null;
          newsURL: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          event_id?: string | null;
          game_meta_data?: Json | null;
          game_name?: string | null;
          game_progress?: string | null;
          id: string;
          is_event_post?: boolean | null;
          media?: Json | null;
          newsURL?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          event_id?: string | null;
          game_meta_data?: Json | null;
          game_name?: string | null;
          game_progress?: string | null;
          id?: string;
          is_event_post?: boolean | null;
          media?: Json | null;
          newsURL?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar: string;
          bio: string | null;
          created_at: string;
          dob: string | null;
          gaming_platform: Json[] | null;
          gender: string | null;
          id: string;
          location: string | null;
          modified_at: string | null;
          name: string | null;
          play_time: Json[] | null;
          role: string | null;
        };
        Insert: {
          avatar: string;
          bio?: string | null;
          created_at?: string;
          dob?: string | null;
          gaming_platform?: Json[] | null;
          gender?: string | null;
          id?: string;
          location?: string | null;
          modified_at?: string | null;
          name?: string | null;
          play_time?: Json[] | null;
          role?: string | null;
        };
        Update: {
          avatar?: string;
          bio?: string | null;
          created_at?: string;
          dob?: string | null;
          gaming_platform?: Json[] | null;
          gender?: string | null;
          id?: string;
          location?: string | null;
          modified_at?: string | null;
          name?: string | null;
          play_time?: Json[] | null;
          role?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      rate_for_lesson: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          score: number;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id: string;
          score: number;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rate_for_lesson_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "course_students";
            referencedColumns: ["id"];
          }
        ];
      };
      rates: {
        Row: {
          content: string | null;
          id: string | null;
          modified_at: string | null;
          score: number | null;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          id?: string | null;
          modified_at?: string | null;
          score?: number | null;
          user_id: string;
        };
        Update: {
          content?: string | null;
          id?: string | null;
          modified_at?: string | null;
          score?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      reactions: {
        Row: {
          comment_id: string | null;
          id: string;
          modified_at: string;
          post_id: string;
          reaction_type: string;
          user_id: string;
        };
        Insert: {
          comment_id?: string | null;
          id?: string;
          modified_at?: string;
          post_id: string;
          reaction_type: string;
          user_id: string;
        };
        Update: {
          comment_id?: string | null;
          id?: string;
          modified_at?: string;
          post_id?: string;
          reaction_type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reactions_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      room_users: {
        Row: {
          created_at: string;
          id: string;
          is_host: boolean | null;
          joined_date: string | null;
          outed_date: string | null;
          room_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_host?: boolean | null;
          joined_date?: string | null;
          outed_date?: string | null;
          room_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_host?: boolean | null;
          joined_date?: string | null;
          outed_date?: string | null;
          room_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "room_users_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "room_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      schedule: {
        Row: {
          content: string | null;
          id: string;
        };
        Insert: {
          content?: string | null;
          id?: string;
        };
        Update: {
          content?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      sender_receivers: {
        Row: {
          accepted_date: string | null;
          id: string;
          is_accepted: boolean | null;
          receiver_id: string;
          send_date: string | null;
          sender_id: string;
        };
        Insert: {
          accepted_date?: string | null;
          id?: string;
          is_accepted?: boolean | null;
          receiver_id: string;
          send_date?: string | null;
          sender_id: string;
        };
        Update: {
          accepted_date?: string | null;
          id?: string;
          is_accepted?: boolean | null;
          receiver_id?: string;
          send_date?: string | null;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sender_receivers_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sender_receivers_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      user_game_data: {
        Row: {
          comment: string | null;
          finish_date: string | null;
          game_meta_data: Json | null;
          id: string;
          is_favourite: boolean | null;
          modified_date: string | null;
          progress: number | null;
          replay_times: number | null;
          score_rate: number | null;
          start_date: string | null;
          status: string | null;
          user_id: string;
        };
        Insert: {
          comment?: string | null;
          finish_date?: string | null;
          game_meta_data?: Json | null;
          id: string;
          is_favourite?: boolean | null;
          modified_date?: string | null;
          progress?: number | null;
          replay_times?: number | null;
          score_rate?: number | null;
          start_date?: string | null;
          status?: string | null;
          user_id: string;
        };
        Update: {
          comment?: string | null;
          finish_date?: string | null;
          game_meta_data?: Json | null;
          id?: string;
          is_favourite?: boolean | null;
          modified_date?: string | null;
          progress?: number | null;
          replay_times?: number | null;
          score_rate?: number | null;
          start_date?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_game_data_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_people_status: {
        Args: {
          currentuserid: string;
        };
        Returns: {
          id: string;
          created_at: string;
          name: string;
          bio: string;
          role: string;
          modified_at: string;
          dob: string;
          gender: string;
          play_time: Json[];
          location: string;
          avatar: string;
          gaming_platform: Json[];
          friend_request_status: string;
        }[];
      };
      get_friend_request_status: {
        Args: {
          currentuserid: string;
          searchword: string;
        };
        Returns: {
          id: string;
          created_at: string;
          name: string;
          bio: string;
          role: string;
          modified_at: string;
          dob: string;
          gender: string;
          play_time: Json[];
          location: string;
          avatar: string;
          gaming_platform: Json[];
          friend_request_status: string;
        }[];
      };
      get_latest_message_heads: {
        Args: {
          user_id: string;
        };
        Returns: {
          id: string;
          created_at: string;
          name: string;
          bio: string;
          role: string;
          modified_at: string;
          dob: string;
          gender: string;
          play_time: Json[];
          location: string;
          avatar: string;
          gaming_platform: Json[];
          friend_request_status: string;
          content: string;
          is_seen: boolean;
          sender_id: string;
          message_time: string;
        }[];
      };
      get_list_friends: {
        Args: {
          user_id: string;
        };
        Returns: {
          id: string;
          created_at: string;
          name: string;
          bio: string;
          role: string;
          modified_at: string;
          dob: string;
          gender: string;
          play_time: Json[];
          location: string;
          avatar: string;
          gaming_platform: Json[];
          friend_request_status: string;
        }[];
      };
      get_two_people_status: {
        Args: {
          currentuserid: string;
          guestid: string;
        };
        Returns: {
          id: string;
          created_at: string;
          name: string;
          bio: string;
          role: string;
          modified_at: string;
          dob: string;
          gender: string;
          play_time: Json[];
          location: string;
          avatar: string;
          gaming_platform: Json[];
          friend_request_status: string;
        }[];
      };
      send_upcoming_event_notifications: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      notification_type:
        | "add_friend"
        | "accepted_friend"
        | "like_post"
        | "reply_comment"
        | "like_comment"
        | "event_invite"
        | "event_notify"
        | "event_remind"
        | "event_created"
        | "event_post_notify";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
