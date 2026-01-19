import axios from "axios";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { HashLoader } from "react-spinners";

function Home() {
  const [users, setusers] = useState([]);
  const [selecteduser, setselecteduser] = useState(null);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(false);
  const fetchusers = (search) => {
    setloading(true);
    axios.get("http://192.168.1.2:5005/api/Auth/users").then((res) => {
      setusers(
        res.data.users.filter((u) =>
          search
            ? u.username.toLowerCase().includes(search.toLowerCase()) ||
              u.email.toLowerCase().includes(search.toLowerCase())
            : true,
        ),
      );
      setloading(false);
    });
  };
  useEffect(() => {
    fetchusers(search);
  }, [search]);

  return (
    <div style={{ margin: "20px" }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "110px",
            width: "100%",
            height: "100%",
            background: "rgb(255, 255, 255)",
            zIndex: "2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLoader
 size={50} color="#f7abab"/>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h1>Users</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <input
              type="text"
              placeholder="search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              name=""
              id=""
            />
          </div>
          <button
            style={{
              background: "#2c6ee7",
              color: "white",
              border: "1px",
              padding: "4px",
              margin: "0  4px",
              borderRadius: "4px",
              fontSize: "20px",
            }}
            onClick={() => {
              setselecteduser({ id: 0, mode: "add" });
            }}
          >
            <MdAdd />
          </button>
        </div>
      </div>
      <table
        style={{
          width: "100%",
          boxShadow: "0 0 4px 1px rgba(1,1,1,.2)",
          borderRadius: "4px",
        }}
      >
        <thead>
          <tr style={{ background: "rgb(248, 171, 171)" }}>
            <th style={{ borderLeft: "1px solid rgba(1,1,1,.1)" }}>id</th>
            <th style={{ borderLeft: "1px solid rgba(1,1,1,.1)" }}>username</th>
            <th style={{ borderLeft: "1px solid rgba(1,1,1,.1)" }}>email</th>
            <th style={{ borderLeft: "1px solid rgba(1,1,1,.1)" }}>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => {
            return (
              <tr
                key={index}
                style={{
                  background: index % 2 == 0 ? "rgb(236, 236, 236)" : "",
                }}
              >
                <td
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid rgba(1,1,1,.1)",
                  }}
                >
                  {u.id}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid rgba(1,1,1,.1)",
                  }}
                >
                  {u.username}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid rgba(1,1,1,.1)",
                  }}
                >
                  {u.email}
                </td>
                <td>
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <button
                      style={{
                        background: "#eb8808",
                        color: "white",
                        border: "1px",
                        padding: "4px",
                        margin: "0  4px",
                        borderRadius: "4px",
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        setselecteduser({ id: u.id, mode: "edit" });
                        setemail(u.email);
                        setusername(u.username);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "1px",
                        padding: "4px",
                        margin: "0  4px",
                        borderRadius: "4px",
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        setselecteduser({ id: u.id, mode: "delete" });
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(selecteduser?.mode == "edit" || selecteduser?.mode == "add") && (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: "rgba(1,1,1,.4)",
            zIndex: "2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              boxShadow: "0 0 4px 1px #a8a8a8",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div>{selecteduser.id == 0 ? "Add" : "Edit"} user</div>
            <div>
              <input
                style={{
                  width: "300px",
                  padding: "5px 10px ",
                  margin: "5px 0",
                }}
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                style={{
                  width: "300px",
                  padding: "5px 10px",
                  margin: "5px 0",
                }}
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            {selecteduser.id == 0 && (
              <div>
                <input
                  style={{
                    width: "300px",
                    padding: "5px 10px",
                    margin: "5px 0",
                  }}
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={() => {
                  setselecteduser(null);
                  setemail("");
                  setusername("");
                  setpassword("");
                }}
                style={{
                  background: "#c7c7c7",
                  color: "white",
                  border: "1px",
                  padding: "4px",
                  margin: "0  4px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "100px",
                }}
              >
                cancel
              </button>
              <button
                style={{
                  background: "#1b9cbd",
                  color: "white",
                  border: "1px",
                  padding: "4px",
                  margin: "0  4px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "100px",
                }}
                onClick={() => {
                  selecteduser.id != 0
                    ? axios
                        .put(
                          "http://192.168.1.2:5005/api/auth/" + selecteduser.id,
                          { email: email, userName: username },
                        )
                        .then(() => {
                          fetchusers();
                          setselecteduser(null);
                          setemail("");
                          setusername("");
                          setpassword("");
                        })
                    : axios
                        .post("http://192.168.1.2:5005/api/auth/register", {
                          email: email,
                          userName: username,
                          password: password,
                          roleIds: [1],
                        })
                        .then(() => {
                          fetchusers();
                          setselecteduser(null);
                          setemail("");
                          setusername("");
                          setpassword("");
                        });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {selecteduser?.mode == "delete" && (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            background: "rgba(1,1,1,.4)",
            zIndex: "2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              boxShadow: "0 0 4px 1px #a8a8a8",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
            }}
          >
            <div style={{ padding: "10px" }}>You want to delete this user?</div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={() => {
                  setselecteduser(null);
                }}
                style={{
                  background: "#c7c7c7",
                  color: "white",
                  border: "1px",
                  padding: "4px",
                  margin: "0  4px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "100px",
                }}
              >
                cancel
              </button>
              <button
                style={{
                  background: "#ff0000",
                  color: "white",
                  border: "1px",
                  padding: "4px",
                  margin: "0  4px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "100px",
                }}
                onClick={() => {
                  axios
                    .delete(
                      "http://192.168.1.2:5005/api/auth/delete/" +
                        selecteduser.id,
                    )
                    .then(() => {
                      fetchusers();
                      setselecteduser(null);
                    });
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
