import { Fragment, SyntheticEvent, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import TextInput from "../../../components/textInput";
import LoadingButton from "../../../components/button";
import CreatedRoleSuccess from "./createSuccess";

const CreateRoleModal = ({
  openModal,
  setOpenModal,
  roles,
}: {
  openModal: boolean;
  setOpenModal: Function;
  roles: {
    id: number;
    name: string;
    permissions: string[];
    resources: string[];
  }[];
}) => {
  const [customName, setCustomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [createdId, setCreatedId] = useState("");
  //close modal function handler
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  // create role
  const createRole = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setCreatedId("43221seaseesas");
      setIsCreating(true);
      handleClose();
      try {
        console.log({ roles });
        setOpenSuccess(true);
      } catch (error) {
      } finally {
        setIsCreating(false);
      }
    },
    [roles]
  );

  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleClose()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-screen-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form
                    onSubmit={createRole}
                    className="flex flex-col gap-6 justify-center items-center"
                  >
                    <div className="flex justify-end w-full">
                      <button
                        type="button"
                        title="clode modal"
                        onClick={() => handleClose()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className=" w-full flex items-center flex-col gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-16 h-16 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h4 className=" font-semibold text-2xl md:text-3xl text-center">
                        Assign name
                      </h4>
                      <p className=" text-sm text-gray-500 text-center">
                        Assign a unique name to this custom role created
                      </p>
                      <TextInput
                        value={customName}
                        setValue={setCustomName}
                        inputType="text"
                        label={"Custom Name"}
                        isRequired={true}
                        id={"custom_name"}
                        placeholder={"assign a unique name"}
                      />
                    </div>
                    <div className="w-full flex flex-col md:flex-row text-center gap-5 md:gap-10">
                      <LoadingButton
                        isLoading={isCreating}
                        type="submit"
                        label="Create Role"
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <CreatedRoleSuccess
        openModal={openSuccess}
        setOpenModal={setOpenSuccess}
        role_id={createdId}
      />
    </>
  );
};

export default CreateRoleModal;
