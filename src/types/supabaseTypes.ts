export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      appointment: {
        Row: {
          appointment_request_id: string;
          appointment_time: string;
          coach_id: string;
          coach_profile_id: string;
          coach_verify: boolean;
          course_id: string;
          created_at: string;
          end_date: string | null;
          have_send_notification: boolean | null;
          id: string;
          modified_at: string;
          money_hold: number;
          student_id: string;
          student_verify: boolean;
        };
        Insert: {
          appointment_request_id: string;
          appointment_time: string;
          coach_id: string;
          coach_profile_id: string;
          coach_verify?: boolean;
          course_id: string;
          created_at?: string;
          end_date?: string | null;
          have_send_notification?: boolean | null;
          id?: string;
          modified_at?: string;
          money_hold: number;
          student_id: string;
          student_verify?: boolean;
        };
        Update: {
          appointment_request_id?: string;
          appointment_time?: string;
          coach_id?: string;
          coach_profile_id?: string;
          coach_verify?: boolean;
          course_id?: string;
          created_at?: string;
          end_date?: string | null;
          have_send_notification?: boolean | null;
          id?: string;
          modified_at?: string;
          money_hold?: number;
          student_id?: string;
          student_verify?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_appointment_request_id_fkey";
            columns: ["appointment_request_id"];
            isOneToOne: false;
            referencedRelation: "appointment_request";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_coach_id_fkey";
            columns: ["coach_id"];
            isOneToOne: false;
            referencedRelation: "coach_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_coach_profile_id_fkey";
            columns: ["coach_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course_session";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      appointment_request: {
        Row: {
          coach_id: string;
          coach_profile_id: string;
          course_id: string;
          created_at: string;
          id: string;
          modified_at: string;
          money_hold: number;
          request_user_id: string;
          sessions: string;
          status: Database["public"]["Enums"]["request_status"];
        };
        Insert: {
          coach_id: string;
          coach_profile_id: string;
          course_id: string;
          created_at?: string;
          id?: string;
          modified_at?: string;
          money_hold: number;
          request_user_id: string;
          sessions: string;
          status?: Database["public"]["Enums"]["request_status"];
        };
        Update: {
          coach_id?: string;
          coach_profile_id?: string;
          course_id?: string;
          created_at?: string;
          id?: string;
          modified_at?: string;
          money_hold?: number;
          request_user_id?: string;
          sessions?: string;
          status?: Database["public"]["Enums"]["request_status"];
        };
        Relationships: [
          {
            foreignKeyName: "appointment_request_coach_id_fkey";
            columns: ["coach_id"];
            isOneToOne: false;
            referencedRelation: "coach_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_request_coach_profile_id_fkey";
            columns: ["coach_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_request_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course_session";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_request_request_user_id_fkey";
            columns: ["request_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      coach_application: {
        Row: {
          coach_games: Json[];
          coach_time: string;
          contact_email: string;
          country: string;
          created_at: string;
          description: string;
          first_name: string;
          game_role_and_characters: string[] | null;
          id: string;
          is_accepted: Database["public"]["Enums"]["request_status"];
          last_name: string;
          modified_at: string;
          social_links: Json | null;
          support_images: string[] | null;
          support_information: string | null;
          user_id: string | null;
        };
        Insert: {
          coach_games: Json[];
          coach_time: string;
          contact_email: string;
          country: string;
          created_at?: string;
          description: string;
          first_name: string;
          game_role_and_characters?: string[] | null;
          id?: string;
          is_accepted?: Database["public"]["Enums"]["request_status"];
          last_name: string;
          modified_at?: string;
          social_links?: Json | null;
          support_images?: string[] | null;
          support_information?: string | null;
          user_id?: string | null;
        };
        Update: {
          coach_games?: Json[];
          coach_time?: string;
          contact_email?: string;
          country?: string;
          created_at?: string;
          description?: string;
          first_name?: string;
          game_role_and_characters?: string[] | null;
          id?: string;
          is_accepted?: Database["public"]["Enums"]["request_status"];
          last_name?: string;
          modified_at?: string;
          social_links?: Json | null;
          support_images?: string[] | null;
          support_information?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coach_application_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      coach_profiles: {
        Row: {
          available_time: string[] | null;
          coach_games: Json[];
          coach_time: string;
          contact_email: string;
          country: string;
          created_at: string;
          description: string;
          full_name: string;
          game_role_and_characters: string | null;
          id: string;
          preview_images: string[] | null;
          profile_name: string | null;
          social_links: Json | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          available_time?: string[] | null;
          coach_games: Json[];
          coach_time: string;
          contact_email: string;
          country: string;
          created_at?: string;
          description: string;
          full_name: string;
          game_role_and_characters?: string | null;
          id?: string;
          preview_images?: string[] | null;
          profile_name?: string | null;
          social_links?: Json | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          available_time?: string[] | null;
          coach_games?: Json[];
          coach_time?: string;
          contact_email?: string;
          country?: string;
          created_at?: string;
          description?: string;
          full_name?: string;
          game_role_and_characters?: string | null;
          id?: string;
          preview_images?: string[] | null;
          profile_name?: string | null;
          social_links?: Json | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coach_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
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
      course_session: {
        Row: {
          coach_id: string;
          coach_profile_id: string;
          created_at: string;
          description: string;
          duration: string;
          game_meta_data: Json;
          id: string;
          modified_at: string;
          name: string;
          price: number;
        };
        Insert: {
          coach_id: string;
          coach_profile_id: string;
          created_at?: string;
          description: string;
          duration: string;
          game_meta_data: Json;
          id?: string;
          modified_at?: string;
          name: string;
          price: number;
        };
        Update: {
          coach_id?: string;
          coach_profile_id?: string;
          created_at?: string;
          description?: string;
          duration?: string;
          game_meta_data?: Json;
          id?: string;
          modified_at?: string;
          name?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "course_session_coach_id_fkey";
            columns: ["coach_id"];
            isOneToOne: false;
            referencedRelation: "coach_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_session_coach_profile_id_fkey";
            columns: ["coach_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
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
          created_at: string | null;
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
          created_at?: string | null;
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
          created_at?: string | null;
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
      feedback: {
        Row: {
          coach_id: string;
          content: string;
          course_session_id: string;
          created_at: string;
          id: string;
          rate: number;
          student_id: string;
        };
        Insert: {
          coach_id: string;
          content: string;
          course_session_id: string;
          created_at?: string;
          id?: string;
          rate: number;
          student_id: string;
        };
        Update: {
          coach_id?: string;
          content?: string;
          course_session_id?: string;
          created_at?: string;
          id?: string;
          rate?: number;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_coach_id_fkey";
            columns: ["coach_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_course_session_id_fkey";
            columns: ["course_session_id"];
            isOneToOne: false;
            referencedRelation: "course_session";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      group_chat: {
        Row: {
          created_at: string;
          creator: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          creator?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          creator?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "group_chat_creator_fkey";
            columns: ["creator"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      group_users: {
        Row: {
          group_id: string | null;
          id: string;
          joined_at: string;
          role: string | null;
          user_id: string | null;
        };
        Insert: {
          group_id?: string | null;
          id?: string;
          joined_at?: string;
          role?: string | null;
          user_id?: string | null;
        };
        Update: {
          group_id?: string | null;
          id?: string;
          joined_at?: string;
          role?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "group_users_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "group_chat";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "group_users_user_id_fkey";
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
          group_id: string | null;
          group_seen: string[];
          id: string;
          is_seen: boolean;
          media: Json[] | null;
          receiver_id: string | null;
          sender_id: string | null;
        };
        Insert: {
          application?: Json | null;
          content?: string | null;
          created_at?: string | null;
          group_id?: string | null;
          group_seen?: string[];
          id?: string;
          is_seen?: boolean;
          media?: Json[] | null;
          receiver_id?: string | null;
          sender_id?: string | null;
        };
        Update: {
          application?: Json | null;
          content?: string | null;
          created_at?: string | null;
          group_id?: string | null;
          group_seen?: string[];
          id?: string;
          is_seen?: boolean;
          media?: Json[] | null;
          receiver_id?: string | null;
          sender_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "group_chat";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
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
      missions: {
        Row: {
          id: string;
          name: string;
          reward: number;
          type: Database["public"]["Enums"]["mission_type"];
        };
        Insert: {
          id?: string;
          name: string;
          reward: number;
          type: Database["public"]["Enums"]["mission_type"];
        };
        Update: {
          id?: string;
          name?: string;
          reward?: number;
          type?: Database["public"]["Enums"]["mission_type"];
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          content: string | null;
          created_at: string;
          event_id: string | null;
          id: string;
          is_readed: boolean | null;
          link_to: string | null;
          notification_meta_data: Json | null;
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id: string | null;
          room_id: string | null;
          sender_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          event_id?: string | null;
          id: string;
          is_readed?: boolean | null;
          link_to?: string | null;
          notification_meta_data?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id?: string | null;
          room_id?: string | null;
          sender_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          event_id?: string | null;
          id?: string;
          is_readed?: boolean | null;
          link_to?: string | null;
          notification_meta_data?: Json | null;
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null;
          receiver_id?: string | null;
          room_id?: string | null;
          sender_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
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
      posts: {
        Row: {
          content: string;
          created_at: string;
          event_id: string | null;
          game_meta_data: Json | null;
          game_name: string | null;
          game_progress: string | null;
          id: string;
          is_edited: boolean;
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
          is_edited?: boolean;
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
          is_edited?: boolean;
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
          avatar: string | null;
          bio: string | null;
          created_at: string;
          dob: string | null;
          gaming_platform: Json[] | null;
          gbox_money: number;
          gender: string | null;
          id: string;
          is_admin: boolean | null;
          location: string | null;
          modified_at: string | null;
          name: string | null;
          play_time: Json[] | null;
          role: string;
          status_message: string | null;
        };
        Insert: {
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
          dob?: string | null;
          gaming_platform?: Json[] | null;
          gbox_money?: number;
          gender?: string | null;
          id?: string;
          is_admin?: boolean | null;
          location?: string | null;
          modified_at?: string | null;
          name?: string | null;
          play_time?: Json[] | null;
          role?: string;
          status_message?: string | null;
        };
        Update: {
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
          dob?: string | null;
          gaming_platform?: Json[] | null;
          gbox_money?: number;
          gender?: string | null;
          id?: string;
          is_admin?: boolean | null;
          location?: string | null;
          modified_at?: string | null;
          name?: string | null;
          play_time?: Json[] | null;
          role?: string;
          status_message?: string | null;
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
          joined_date: string;
          room_id: string;
          user_id: string;
        };
        Insert: {
          joined_date?: string;
          room_id: string;
          user_id: string;
        };
        Update: {
          joined_date?: string;
          room_id?: string;
          user_id?: string;
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
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          current_people: number;
          game_meta_data: Json | null;
          game_name: string;
          host_id: string;
          id: string;
          matching_time: string | null;
          name: string | null;
          state: string;
          total_people: number;
        };
        Insert: {
          created_at?: string;
          current_people?: number;
          game_meta_data?: Json | null;
          game_name: string;
          host_id: string;
          id?: string;
          matching_time?: string | null;
          name?: string | null;
          state?: string;
          total_people: number;
        };
        Update: {
          created_at?: string;
          current_people?: number;
          game_meta_data?: Json | null;
          game_name?: string;
          host_id?: string;
          id?: string;
          matching_time?: string | null;
          name?: string | null;
          state?: string;
          total_people?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rooms_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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
      session_application: {
        Row: {
          coach_id: string;
          coach_profile_id: string;
          created_at: string;
          description: string;
          duration: string;
          game_meta_data: Json;
          id: string;
          is_accepted: Database["public"]["Enums"]["request_status"];
          modified_at: string;
          name: string;
          price: number;
        };
        Insert: {
          coach_id: string;
          coach_profile_id: string;
          created_at?: string;
          description: string;
          duration: string;
          game_meta_data: Json;
          id?: string;
          is_accepted?: Database["public"]["Enums"]["request_status"];
          modified_at?: string;
          name: string;
          price: number;
        };
        Update: {
          coach_id?: string;
          coach_profile_id?: string;
          created_at?: string;
          description?: string;
          duration?: string;
          game_meta_data?: Json;
          id?: string;
          is_accepted?: Database["public"]["Enums"]["request_status"];
          modified_at?: string;
          name?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "session_application_coach_id_fkey";
            columns: ["coach_id"];
            isOneToOne: false;
            referencedRelation: "coach_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_application_coach_profile_id_fkey";
            columns: ["coach_profile_id"];
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
          replay_times: number | null;
          score_rate: number | null;
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
          replay_times?: number | null;
          score_rate?: number | null;
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
          replay_times?: number | null;
          score_rate?: number | null;
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
      user_missions: {
        Row: {
          created_at: string;
          id: string;
          is_finished: boolean;
          mission_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_finished?: boolean;
          mission_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_finished?: boolean;
          mission_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_missions_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_missions_user_id_fkey";
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
      count_game_status_by_user: {
        Args: {
          user_id_param: string;
        };
        Returns: {
          status_type: string;
          count: number;
        }[];
      };
      count_status_by_user: {
        Args: {
          user_id_param: string;
        };
        Returns: {
          status_type: string;
          count: number;
        }[];
      };
      create_random_daily_missions: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
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
          status_message: string;
          send_date: string;
          accepted_date: string;
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
      get_latest_group_messages: {
        Args: {
          _user_id: string;
        };
        Returns: {
          id: string;
          name: string;
          created_at: string;
          creator_id: string;
          image: string;
          creator_name: string;
          content: string;
          group_seen: string[];
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
          status_message: string;
          send_date: string;
          accepted_date: string;
          friend_request_status: string;
        }[];
      };
      get_top_coaches: {
        Args: Record<PropertyKey, never>;
        Returns: {
          coach_id: string;
          full_name: string;
          description: string;
          country: string;
          game_role_and_characters: string;
          coach_games: Json[];
          coach_time: string;
          contact_email: string;
          social_links: Json;
          preview_images: string[];
          available_time: string[];
          profile_name: string;
          profile_user_name: string;
          bio: string;
          avatar: string;
          location: string;
          average_rate: number;
        }[];
      };
      get_top_course_sessions: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          coach_id: string;
          coach_full_name: string;
          course_name: string;
          description: string;
          game_meta_data: Json;
          price: number;
          duration: string;
          created_at: string;
          coach_profile_id: string;
          modified_at: string;
          coach_profile_name: string;
          number_of_appointments: number;
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
      get_user_friends_and_contacts: {
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
          status_message: string;
          friend_request_status: string;
          content: string;
          is_seen: boolean;
          sender_id: string;
          message_time: string;
        }[];
      };
      handle_appointment_end: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      merge_rooms_function: {
        Args: Record<PropertyKey, never>;
        Returns: {
          game_name: string;
          total_people: number;
          room_ids: string[];
          total_current_people: number;
          earliest_matching_time: string;
          main_room_id: string;
        }[];
      };
      send_upcoming_event_notifications: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_main_room_and_remove_others: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_merge_rooms: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      gbox_role: "gamer" | "coach" | "admin";
      mission_type: "one_time" | "daily";
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
        | "event_post_notify"
        | "room_invite"
        | "coach_apply_accepted"
        | "coach_apply_rejected"
        | "session_request_accepted"
        | "session_request_rejected"
        | "appointment_request_send"
        | "appointment_request_receive"
        | "appointment_accepted"
        | "appointment_rejected"
        | "reschedule_sessions"
        | "cancel_sessions"
        | "session_refund"
        | "session_feedback";
      request_status: "accepted" | "rejected" | "pending";
      user_status: "online" | "offline" | "away";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
