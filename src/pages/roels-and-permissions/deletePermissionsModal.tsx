import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const DeletePermissionsModal = ({
  openModal,
  setOpenModal,
  handleDelete,
}: {
  openModal: boolean;
  setOpenModal: Function;
  handleDelete: Function;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  //close modal function handler
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  // delete user from table api request
  const deleteUserRequest = useCallback(() => {
    setIsDeleting(true);
    try {
      handleDelete();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, []);

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
                  <div className="flex flex-col gap-6 justify-center items-center">
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
                        className="w-24 h-24 text-red-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h4 className=" font-semibold text-2xl md:text-3xl text-center">
                        Remove this role?
                      </h4>
                      <p className=" text-sm text-gray-500 text-center">
                        Do you want to remove this role? The role will be no
                        longer be active and be removed from your user’s
                        assigned roles.{" "}
                      </p>
                    </div>
                    <div className="w-full flex flex-col md:flex-row text-center gap-5 md:gap-10">
                      <button
                        type="button"
                        onClick={() => handleClose()}
                        className="w-full p-2 px-4 text-lg font-semibold rounded-lg bg-white border-2 border-gray-300 hover:bg-primary_green-500 hover:text-white  transition-all"
                      >
                        {" "}
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteUserRequest()}
                        type="button"
                        className="w-full flex justify-center text-white bg-red-500 p-2 px-4 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:bg-transparent hover:text-primary_green-500  transition-all"
                      >
                        {isDeleting ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 animate-spin"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          "Yes, Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeletePermissionsModal;
