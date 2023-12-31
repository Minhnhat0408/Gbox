"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";

export default function Slider({
  perView = 1,
  children,
  delay,
  className,
  loop,
  spacing,
  arrow,
  autoPlay,
  initial,
  arrowLarge,
}: {
  perView?: number;
  arrow?: boolean;
  initial?: number;
  spacing?: number;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  loop?: boolean;
  arrowLarge?: boolean;
  autoPlay?: boolean;
}) {
  const [currentSlide, setCurrentSlide] = React.useState(initial || 0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: initial || 0,
      slides: {
        perView: perView || 1,
        spacing: spacing || 0,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: loop,
    },
    [
      (slider) => {
        if (!autoPlay) return;
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(
            () => {
              slider.next();
            },
            delay ? delay : 2000
          );
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div className=" relative group w-full">
      <div ref={sliderRef} className={cn("keen-slider", className)}>
        {children}
      </div>
      {arrow &&
        loaded &&
        instanceRef.current &&
        (arrowLarge ? (
          <>
            <ArrowLarge
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <ArrowLarge
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide + perView >=
                instanceRef.current.track.details?.slides.length 
              }
            />
          </>
        ) : (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details?.slides.length - 1
              }
            />
          </>
        ))}
      {loop && loaded && instanceRef.current && (
        <div className="mt-6 flex absolute left-1/2 group-hover:opacity-100 opacity-0 duration-500 -translate-x-[50%] bottom-4  justify-center">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={cn(
                  "mx-1 h-2 w-2 rounded-full bg-muted-foreground group",
                  currentSlide === idx && "bg-primary"
                )}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " fill-muted-foreground" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`w-6 h-6  absolute top-1/2 opacity-0 group-hover:opacity-100 duration-500 -translate-y-[50%] fill-white cursor-pointer ${
        props.left ? " left-5" : " right-5"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

function ArrowLarge(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {

  return (
    <svg
      onClick={props.onClick}
      className={cn(
        `w-16 h-16  absolute top-1/2 opacity-0 group-hover:opacity-100 duration-500 -translate-y-[50%] fill-primary cursor-pointer`,
        props.left ? " -left-[50px]" : " -right-[50px]",
        props.disabled && "hidden"
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
