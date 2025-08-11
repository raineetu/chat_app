import { Users } from "lucide-react";

const Sidebar = ({ selectedUser, users, onSelectUser }) => {
  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto no-scrollbar h-screen w-full py-5 bg-base-300">
        {users.map((data) => (
          <div key={data.id}>
            <button
              onClick={() => {
                console.log("Sidebar user clicked:", data);
                onSelectUser(data);
              }}
              className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-200 w-full rounded-md my-2 ${
                selectedUser?.id === data.id ? "bg-gray-300" : ""
              }`}
            >
              <div className="rounded-full bg-blue-400 w-10 h-10 flex items-center justify-center uppercase font-bold">
                {data.name[0]}
              </div>
              <div className="hidden lg:block">
                <p className="font-medium">{data.name}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
