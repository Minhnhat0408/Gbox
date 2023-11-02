"use client"

import { MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

type TypingIndicatorProps = {
    roomId: string;
    userId: string;
};


export const useTypingIndicator = ({ roomId, userId }: TypingIndicatorProps) => {
    const [isTyping, setIsTyping] = useState(false);
    const [payload, setPayload] = useState<MessageType | null>(null);
    const channelRef = useRef<RealtimeChannel | null>(null);
    const {supabaseClient} = useSessionContext()
    useEffect(() => {
      const newChannel = supabaseClient.channel(`typing:${roomId}`);
  
      const onTyping = (payload: any) => {
        setPayload(payload);
        setIsTyping(true);
        hideTypingIndicator();
      };
  
      const hideTypingIndicator = () => {
        setTimeout(() => setIsTyping(false), 2000);
      };
  
      newChannel.on('broadcast', { event: 'typing' }, onTyping);
      const subscription = newChannel.subscribe();
  
      channelRef.current = newChannel;
  
      return () => {
        subscription.unsubscribe();
      };
    }, [roomId, userId]);
  
    const throttledTypingEvent = throttle(() => {
      if (!channelRef.current) return;
      channelRef.current.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId },
      });
    }, 3000);
  
    const sendTypingEvent = useCallback(() => {
      throttledTypingEvent();
    }, [throttledTypingEvent]);
  
    return { payload, isTyping, sendTypingEvent };
  };