import { Link } from "react-router-dom";

import manageUsersRolesDataset from "../../assets/ManageRolesDataset.json";
import ManagePermissionsTable from "./managePermissionsTable";

export default function RolesAndPermissions() {
  return (
    <main className=" w-full px-5 md:px-10 flex flex-col gap-5">
      <div className=" w-full flex justify-between items-center">
        <h2 className=" text-2xl mt-10 text-gray-700">
          Manage and create user permissions
        </h2>
        <Link
          to="/roles-and-permissions/add-roles"
          type="button"
          className=" px-4 py-2 bg-primary_green-500 rounded-lg text-white hover:bg-transparent hover:border hover:text-primary_green-500 hover:border-primary_green-500 transition-all"
        >
          Create new permission
        </Link>
      </div>
      <div className=" mt-16">
        <div className="flex items-center gap-3">
          <h4 className=" text-2xl font-semibold">Permissions</h4>
          <span className=" text-sm text-green-500">6 permissions</span>
        </div>
        <ManagePermissionsTable dataset={manageUsersRolesDataset} />
      </div>
    </main>
  );
}
