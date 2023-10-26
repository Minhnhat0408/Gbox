"use client";

import React, { useEffect, useRef, useState } from "react";
import axios, { all } from "axios";
import { FiSearch } from "react-icons/fi";
import { ProfilesType } from "@/types/supabaseTableType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useSearchUser, userSearchInput } from "@/hooks/useSearchUser";
import { BiLoaderAlt } from "react-icons/bi";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchUser() {
  let { searchIp, setSearchIp }: any = userSearchInput();

  let debounceSearch = useDebounce<string>(searchIp.trim(), 500);

  let { allUser }: any = useSearchUser();

  let [resUserArray, setResUserArray] = useState([]);

  let [constUserArray, setConstUserArray] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  let [isFocus, setIsFocus] = useState<boolean>(false);

  let [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const ipRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useUser();

  const handleChange = async (e: any) => {
    setLoading(true);
    setSearchIp(e.target.value);
  };

  useEffect(() => {
    const fetchAllUser = async () => {
      await axios
        .get(`/api/userSearch?query=&id=${currentUser.userDetails?.id}`)
        .then((res) => {
          setConstUserArray(res.data);
        });
    };
    fetchAllUser();
  }, [currentUser.userDetails?.id]);

  useEffect(() => {
    const fetchUser = async () => {
      if (debounceSearch.trim() && currentUser.userDetails?.id) {
        await axios
          .get(
            `/api/userSearch?query=${debounceSearch}&id=${currentUser.userDetails?.id}`
          )
          .then((res) => {
            setResUserArray(res.data);
          });
      }
      setLoading(false);
    };
    fetchUser();
  }, [search, debounceSearch, currentUser.userDetails?.id]);

  return (
    <div className="rounded-3xl w-[300px] max-h-14 bg-[#00453F] px-6 py-2 ml-4 flex items-center relative">
      <FiSearch className="mr-4 text-2xl text-gray-400" />
      <input
        value={searchIp}
        ref={ipRef}
        className="w-full h-8 bg-[#00453F] focus-visible:outline-none placeholder:text-gray-400 pr-4"
        placeholder="Search in Gbox"
        onChange={handleChange}
        onFocus={async () => {
          setIsFocus(true);
          if (searchIp.trim().length < 1) {
            setLoading(false);
            return;
          }

          if (searchIp.trim() == search) {
            setResUserArray(allUser);
            setLoading(false);
            return;
          }

          setLoading(true);

          await axios
            .get(
              `/api/userSearch?query=${searchIp}&id=${currentUser.userDetails?.id}`
            )
            .then((res) => {
              setResUserArray(res.data);
            });
          setLoading(false);
        }}
        onBlur={() =>
          setTimeout(() => {
            setIsFocus(false);
          }, 200)
        }
        onKeyDown={(e) => {
          if (e.key == "Enter" && searchIp.trim().length > 0) {
            ipRef.current?.blur();
            router.push(`/search?q=${searchIp.trim()}`);
          }
        }}
      />

      {loading && isFocus && searchIp.length > 0 ? (
        <BiLoaderAlt className="animate-spin w-[40px] text-gray-300 text-2xl" />
      ) : (
        <div className="w-[40px]"></div>
      )}

      {isFocus ? (
        <div className="absolute top-14 left-0 card-container rounded-l-2xl w-full flex flex-col">
          {searchIp.trim().length > 0 ? (
            <>
              {resUserArray?.length > 0 && !loading ? (
                <div
                  className={`max-h-[350px] overflow-y-auto left-0 w-full z-20 px-2 pt-2 ${
                    searchIp.trim().length > 0 ? "" : "pb-2"
                  }`}
                >
                  {search == searchIp.trim() ? (
                    <>
                      {allUser.map((user: ProfilesType) => (
                        <div
                          className="cursor-pointer p-2 h-fit flex items-center hover:bg-[#3dbda7] rounded-xl"
                          onMouseDown={() => {
                            router.push(`/user/${user.name}`);
                            setTimeout(() => {
                              setResUserArray([]);
                            }, 200);
                          }}
                          key={user.id}
                        >
                          <Image
                            src={user.avatar || "/avatar.jpg"}
                            height={270}
                            width={270}
                            alt="avatar"
                            className={`rounded-full h-[40px] w-[40px] mr-4 border-[2px]
                            ${
                              user.gender == "female" ? "border-[#ec49a7]" : ""
                            } 
                            ${user.gender == "male" ? "border-[#03a3ff]" : ""}
                            ${
                              user.gender == "other" ? "border-[#3cb179]" : ""
                            }`}
                          />
                          {user.name}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {resUserArray.map((user: ProfilesType) => (
                        <div
                          className="cursor-pointer p-2 h-fit flex items-center hover:bg-[#3dbda7] rounded-xl"
                          onMouseDown={() => {
                            router.push(`/user/${user.name}`);
                            setTimeout(() => {
                              setResUserArray([]);
                            }, 200);
                          }}
                          key={user.id}
                        >
                          <Image
                            src={user.avatar || "/avatar.jpg"}
                            height={270}
                            width={270}
                            alt="avatar"
                            className={`rounded-full h-[40px] w-[40px] mr-4 border-[2px]
                            ${
                              user.gender == "female" ? "border-[#ec49a7]" : ""
                            } 
                            ${user.gender == "male" ? "border-[#03a3ff]" : ""}
                            ${
                              user.gender == "other" ? "border-[#3cb179]" : ""
                            }`}
                          />
                          {user.name}
                        </div>
                      ))}
                    </>
                  )}

                  {searchIp.trim().length > 0 ? (
                    <div
                      className={`cursor-pointer pb-2 h-fit w-full flex flex-col rounded-xl}`}
                      onMouseDown={() => {
                        router.push(`/search?q=${searchIp.trim()}`);
                      }}
                    >
                      <div className="w-full h-[56px] pl-2 hover:bg-[#3dbda7] flex items-center rounded-xl">
                        <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                        Search for {searchIp.trim()}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  {searchIp.trim().length > 0 ? (
                    <div
                      className={`cursor-pointer h-fit p-2 w-full flex flex-col rounded-xl}`}
                      onMouseDown={() => {
                        router.push(`/search?q=${searchIp.trim()}`);
                      }}
                    >
                      <div className="w-full h-[56px] pl-2 hover:bg-[#3dbda7] flex items-center rounded-xl">
                        <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                        Search for {searchIp.trim()}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <>
              <div
                className={`left-0 max-h-[350px] overflow-y-auto w-full z-20 px-2 pt-2 ${
                  searchIp.trim().length > 0 ? "" : "pb-2"
                }`}
              >
                {constUserArray.length > 0 ? (
                  <>
                    {constUserArray?.slice(0, 10).map((user: ProfilesType) => (
                      <div
                        className="cursor-pointer p-2 h-fit flex items-center hover:bg-[#3dbda7] rounded-xl"
                        onMouseDown={() => {
                          router.push(`/user/${user.name}`);
                          setTimeout(() => {
                            setResUserArray([]);
                          }, 200);
                        }}
                        key={user.id}
                      >
                        <Image
                          src={user.avatar || "/avatar.jpg"}
                          height={270}
                          width={270}
                          alt="avatar"
                          className={`rounded-full h-[40px] w-[40px] mr-4 border-[2px]
                          ${user.gender == "female" ? "border-[#ec49a7]" : ""} 
                          ${user.gender == "male" ? "border-[#03a3ff]" : ""}
                          ${user.gender == "other" ? "border-[#3cb179]" : ""}`}
                        />
                        {user.name}
                      </div>
                    ))}
                  </>
                ) : null}
                {searchIp.trim().length > 0 ? (
                  <div
                    className={`cursor-pointer pb-2 h-fit w-full flex flex-col rounded-xl}`}
                    onMouseDown={() => {
                      router.push(`/search?q=${searchIp.trim()}`);
                    }}
                  >
                    <div className="w-full h-[56px] pl-2 hover:bg-[#3dbda7] flex items-center rounded-xl">
                      <FiSearch className="mr-2 text-2xl text-gray-50 w-[40px]" />
                      Search for {searchIp.trim()}
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
