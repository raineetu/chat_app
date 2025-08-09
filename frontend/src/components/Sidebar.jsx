import { Users } from "lucide-react";

const Sidebar = ({ selectedUser }) => {
  console.log(selectedUser, "Sidebar clicked");
  const user = [
    { id: 1, name: "Neetu", state: "Online" },
    { id: 2, name: "Aarav", state: "Offline" },
    { id: 3, name: "Priya", state: "Online" },
    { id: 4, name: "Rohan", state: "Offline" },
    { id: 5, name: "Sneha", state: "Online" },
    { id: 6, name: "Kabir", state: "Offline" },
    { id: 7, name: "Ananya", state: "Online" },
    { id: 8, name: "Yash", state: "Offline" },
  ];

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto no-scrollbar h-screen w-full py-5 bg-base-300">
        {user.map((data) => (
          <div key={data.id + data.name}>
            <button
              onClick={() => selectedUser(data)}
              className="flex items-center gap-3 py-2 px-4 hover:bg-gray-200 w-full rounded-md my-2"
            >
              <div className="rounded-full bg-blue-400 w-10 h-10 flex items-center justify-center uppercase font-bold">
                {data.name[0]}
              </div>
              <div className="hidden lg:block">
                <p className="font-medium">{data.name}</p>
                <p
                  className={`text-xs font-bold ${
                    data.state === "Online" ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {data.state}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
