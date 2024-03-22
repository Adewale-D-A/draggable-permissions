import { useCallback, useState } from "react";

import AddEditRoles from "../add-edit-roles";
import { useParams } from "react-router-dom";
import FloatButton from "../../../components/button/floatButton";
import UpdateRoleModal from "./updateRoleModal";
import {
  permissionNames,
  resources,
  roleNames,
} from "../../../assets/permissions-and-roles";

const breadCrumb = [
  {
    url: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
  {
    url: "/roles-and-permissions",
    label: "Roles and Permissions",
    icon: "",
  },
  {
    url: "#",
    label: "Edit role",
    icon: "",
  },
];

export default function EditRoles() {
  const { id } = useParams();
  const [roleData, setRoleData] = useState({
    custom_name: "expert role",
    id: "934398ueekkahs",
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "ADMIN",
      permissions: ["read", "delete"],
      resources: ["email", "users", "returnee_applications"],
    },
    {
      id: 2,
      name: "USER",
      permissions: ["read"],
      resources: ["programmes", "own"],
    },
  ]);
  const [openSaveUpdate, setOpenSaveUpdate] = useState(false);

  const addRole = useCallback(() => {
    setRoles((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          name: "ADMIN",
          permissions: [],
          resources: [],
        },
      ];
    });
  }, []);

  const removeRole = useCallback((index: number) => {
    setRoles((prev) => {
      const cloned = [...prev];
      cloned.splice(index, 1);
      return cloned;
    });
  }, []);

  //onChange function that handles role name change
  const changeRoleName = (index: number, value: string) => {
    setRoles((prevState) => {
      const unchangedItems = [...prevState];
      const selectedItem = prevState[index];
      unchangedItems.splice(index, 1, {
        id: selectedItem?.id,
        name: value,
        permissions: selectedItem.permissions,
        resources: selectedItem.resources,
      });
      return unchangedItems;
    });
  };

  return (
    <>
      <main className=" w-full flex flex-col items-center gap-5">
        <div className="w-full max-w-screen-2xl px-5 md:px-10">
          <h2 className=" text-2xl mt-10 text-gray-700">
            Update Roles and Permission
          </h2>

          <div className="w-full mt-16 flex flex-col gap-5">
            {roles.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full border-b-4 border-primary_green-500/20 pb-10"
                >
                  <div className="flex items-end gap-5">
                    <div className=" max-w-40">
                      <div className="w-full">
                        <label htmlFor={"role-select"} className=" font-medium">
                          Role Name
                        </label>
                        <select
                          id={"role-select"}
                          title={"role name"}
                          value={item?.name}
                          required={true}
                          onChange={(e) =>
                            changeRoleName(index, e.target.value)
                          }
                          className="w-full p-4 mt-3 rounded-[4px] border border-gray-300 bg-gray-200/15 sm:text-md focus:ring-[#17594F] focus:border-[#17594F]"
                        >
                          {roleNames.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item.toLowerCase()}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    {/* <div className="">
                      <LoadingButton
                        isLoading={false}
                        label={"save changes"}
                        type="button"
                      />
                    </div> */}
                  </div>
                  <div className=" flex flex-col items-center w-full">
                    <div className="flex flex-col gap-5 w-full">
                      <AddEditRoles
                        index={index}
                        setState={setRoles}
                        type={"permissions"}
                        available_resources={permissionNames}
                        assigned_resources={item?.permissions}
                        available_label="Permissions"
                        assigned_label="Selected permissions"
                      />
                      <AddEditRoles
                        index={index}
                        setState={setRoles}
                        type={"resources"}
                        available_resources={resources}
                        assigned_resources={item?.resources}
                        available_label="Resources"
                        assigned_label="Selected resources"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        title="delete"
                        onClick={() => removeRole(index)}
                        className=" flex justify-center items-center aspect-square bg-primary_green-500 text-white p-3 rounded-full hover:bg-transparent hover:border hover:border-primary_green-500 transition-all hover:text-primary_green-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="add"
                        onClick={() => addRole()}
                        className=" flex justify-center items-center aspect-square bg-primary_green-500 text-white p-3 rounded-full hover:bg-transparent hover:border hover:border-primary_green-500 transition-all hover:text-primary_green-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <FloatButton
            isLoading={false}
            label="Update"
            disabled={false}
            type="button"
            clickHandler={() => setOpenSaveUpdate(true)}
          />
        </div>
      </main>
      <UpdateRoleModal
        openModal={openSaveUpdate}
        setOpenModal={setOpenSaveUpdate}
        roles={roles}
        role_data={roleData}
      />
    </>
  );
}
