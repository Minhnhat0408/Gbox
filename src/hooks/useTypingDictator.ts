"use client"

import { MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";
const throttle = require('lodash.throttle');

type payloadType = {
    userAva: string;
    type:string;
    event:string;
  };


export const useTypingIndicator = ({userAva} : {userAva:string}) => {
    const [isTyping, setIsTyping] = useState(false);
    const [payload, setPayload] = useState<payloadType| null>(null);
    const channelRef = useRef<RealtimeChannel | null>(null);
    const [roomName,setRoomName] = useState("")
    const {supabaseClient} = useSessionContext()
    useEffect(() => {
      const newChannel = supabaseClient.channel(`typing:${roomName}`);
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
    }, [roomName]);
  
    const throttledTypingEvent = throttle(() => {
      if (!channelRef.current) return;
      channelRef.current.send({
        type: 'broadcast',
        event: 'typing',
        userAva: userAva ,
      });
    }, 3000);
  
    const sendTypingEvent = useCallback(() => {
      throttledTypingEvent();
    }, [throttledTypingEvent]);
  
    return { payload, isTyping, sendTypingEvent,setRoomName };
  };