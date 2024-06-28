import { Fragment } from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function CustomDropdown({
    dropdownLable,
    optionsLength,
    selectedAvtar,
    pickAvtar,
    // cutomData,
}: {
    dropdownLable: string;
    optionsLength?: number;
    selectedAvtar?: (value: number) => void;
    pickAvtar:number | string | undefined
    // customData?: string[];
}) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {dropdownLable}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 avtar-picker flex !flex-wrap" style={{flexWrap:"wrap"}}>
                        {Array(optionsLength)
                            .fill("")
                            .map((item, index) => (
                                <MenuItem key={index}>
                                    {({ focus }) => (
                                        <div
                                        style={pickAvtar === index ?  {border:"2px solid #22BB33",borderRadius:"50px 50px"}:{}}
                                        onClick={()=> selectedAvtar && selectedAvtar(index)}
                                            className={classNames(
                                                focus
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                    pickAvtar?"":"",
                                                "cursor-pointer  text-sm w-3/12 p-2 flex justify-center items-center",
                                            )}
                                        >  
                                            <Image
                                                src={`/profileAvtars/${index}.png`}
                                                alt="logo.png"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    )}
                                  
                                </MenuItem>
                            ))}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}
