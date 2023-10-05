"use client";

import { log } from "console";
import React, {
  ChangeEvent,
  UIEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import uuid from "react-uuid";
import { BsCaretDownFill, BsCheckLg } from "react-icons/bs";
import useClickOutSide from "@/hook/useClickOutSide";
import { pagingGame, searchGame } from "@/services/client/rawgClientService";
import useDebounce from "@/hook/useDebounce";
import usePrevious from "@/hook/usePrevious";
import style from "./comboboxLoadData.module.css";

interface ComboboxLoadDataProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  comboboxControl: ComboboxControl;
}

interface ComboboxControl {
  valueField: string;
  displayField: string;
  value: any;
  delaySearch: number;
  setValue: (value: any) => void;
  getCurrentData: (
    currentPage: number,
    textSearch: string
  ) => Promise<Array<any>>;
}

interface pageControl {
  index: number;
  isTrusted: boolean;
}

export function useComboboxLoadData(
  valueField: string,
  displayField: string,
  getCurrentData: (
    currentPage: number,
    textSearch: string
  ) => Promise<Array<any>>,
  delaySearch: number = 500
): ComboboxControl {
  const [value, setValue] = useState<any>(null);
  return {
    valueField: valueField,
    displayField: displayField,
    value: value,
    setValue: setValue,
    getCurrentData: getCurrentData,
    delaySearch: delaySearch,
  };
}

const comboboxLoadData = React.forwardRef<HTMLElement, ComboboxLoadDataProps>(
  ({ comboboxControl, ...props }, ref) => {
    const id = uuid();

    const [data, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<pageControl>({
      isTrusted: true,
      index: 1,
    });

    const [isMaxPage, setIsMaxPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const { delayValue: debounceTextSearch, isDelaying } = useDebounce<string>(
      textSearch,
      comboboxControl.delaySearch
    );
    const refHeadCombo = useRef<HTMLDivElement>(null);
    const refBodyCombo = useRef<HTMLDivElement>(null);

    const [isOpenCombo, setIsOpenCombo] = useState<boolean>(false);

    const [scrollTo, setScrollTo] = useState<number>(0);

    useClickOutSide(() => setIsOpenCombo(false), refBodyCombo, refHeadCombo);

    function handleTypeSearch(e: ChangeEvent<HTMLInputElement>) {
      setTextSearch(e.target.value);
    }

    async function getData(
      currentPage: number,
      query: string
    ): Promise<Array<any>> {
      setIsLoading(true);
      const resut = await comboboxControl.getCurrentData(currentPage, query);
      setIsLoading(false);
      setIsMaxPage(resut.length == 0);

      return resut;
    }

    function eventScrollData(e: UIEvent<HTMLDivElement>) {
      const isMaxScroll =
        e.currentTarget.scrollHeight ==
        e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      if (isMaxScroll && !isLoading && !isDelaying && !isMaxPage) {
        setPage({
          index: page.index + 1,
          isTrusted: true,
        });
        setScrollTo(e.currentTarget.scrollTop);
      }
    }

    function handleSetData(i: any) {
      setSelectedItem(i);
      setTextSearch(i[comboboxControl.displayField]);
      comboboxControl.setValue(i[comboboxControl.valueField]);
      setIsOpenCombo(false);
    }

    function handleBlurCombobox(): void {
      if (selectedItem != null)
        setTextSearch(selectedItem[comboboxControl.displayField]);
    }

    useEffect(() => {
      (async () => {
        const result = await getData(1, debounceTextSearch);
        setData(result);
        setPage({
          index: 1,
          isTrusted: false,
        });
      })();
    }, [debounceTextSearch]);

    useEffect(() => {
      if (page.isTrusted) {
        (async () => {
          const result = await getData(page.index, debounceTextSearch);
          setData(result);
          setData([...data, ...result]);
          setTimeout(() => {
            refBodyCombo.current?.scrollTo({
              top: scrollTo,
              behavior: "instant",
              left: 0,
            });
          }, 0);
        })();
      }
    }, [page.index]);

    return (
      <div className="w-full relative">
        <div
          ref={refHeadCombo}
          className="w-ful flex items-stretch justify-start rounded-sm overflow-hidden"
        >
          <input
            onBlur={handleBlurCombobox}
            onFocus={() => setIsOpenCombo(true)}
            id={id}
            className="w-full h-10 px-3 text-black text-sm outline-none border-none"
            placeholder="Type to search"
            value={textSearch}
            onChange={handleTypeSearch}
          ></input>
          <label
            htmlFor={id}
            className="w-10 cursor-pointer bg-slate-500 flex items-center justify-center"
          >
            <BsCaretDownFill></BsCaretDownFill>
          </label>
        </div>
        <div
          ref={refBodyCombo}
          onScroll={eventScrollData}
          className={`absolute bg-white top-[calc(100%+5px)] left-0 w-full max-h-[200px] rounded-sm overflow-x-hidden overflow-y-auto ${
            style["custom-scrollbar"]
          } ${isOpenCombo ? "block" : "hidden"}`}
        >
          {isLoading == false ? (
            data.length > 0 ? (
              data.map((i) => {
                return (
                  <div
                    key={i[comboboxControl.valueField]}
                    onClick={() => handleSetData(i)}
                    className={`flex px-3 pr-1 py-1 justify-between items-center hover:bg-slate-300 cursor-pointer ${
                      comboboxControl.value == i[comboboxControl.valueField]
                        ? style.isActive + " bg-slate-300"
                        : ""
                    }`}
                  >
                    <span className="text-black text-sm">
                      {i[comboboxControl.displayField]}
                    </span>
                    <span
                      className={`bg-[#00F5A0] w-5 h-5 rounded-full items-center justify-center hidden ${style.checkedIcon}`}
                    >
                      <BsCheckLg></BsCheckLg>
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-black text-center font-semibold">
                No data found
              </div>
            )
          ) : (
            <div className="h-[200px] text-black bg-white flex items-center justify-center">
              <div className={style["lds-dual-ring"]}></div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

comboboxLoadData.displayName = "comboboxLoadData";

export default comboboxLoadData;
