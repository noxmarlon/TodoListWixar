import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "react-modal";

type FormElement = React.FormEvent<HTMLFormElement>;
class UpTask {
  id!: number;
  attributes!: Attributes;
}

class Attributes {
  task!: string;
}
function App(): JSX.Element {
  /////////////////////////////
  const [newTask, setNewtask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [idupdate, setIdUpdate] = useState(0);
  const [tasks, setTasks] = useState<any[]>([]);
  const [upTask, setUpdateTask] = useState<UpTask>();
  const [nexTask, setUpdate] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

  const handleSubit = (e: FormElement) => {
    axios
      .post("http://localhost:1337/api/posts", {
        data: {
          task: newTask,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
  };

  async function removeItem(id: number) {
    await axios
      .delete("http://localhost:1337/api/posts/" + id, {})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
    window.location.reload();
  }

  const handleUpdateSubmit = async (e: FormElement) => {
    e.preventDefault();
    await axios
      .put("http://localhost:1337/api/posts/" + idupdate, {
        data: {
          task: nexTask,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
    console.log(idupdate);
    handleClose();
    window.location.reload();
  };

  console.log(nexTask);

  const handleUpdate = async (id: number) => {
    const response = await fetch("http://localhost:1337/api/posts/" + id);
    const data = await response.json();
    const resData: UpTask = data.data as UpTask;
    setUpdateTask(resData);
    setIdUpdate(id);
    setUpdate(resData.attributes.task);
    handleOpen();
  };

  const handleRead = async (id: number) => {
    const response = await fetch("http://localhost:1337/api/posts/" + id);
    const data = await response.json();
    const resData: UpTask = data.data as UpTask;
    setUpdateTask(resData);
    setIdUpdate(id);
    setUpdate(resData.attributes.task);
    handleOpenRead();
  };

  const fectApi = async () => {
    const response = await fetch("http://localhost:1337/api/posts");
    const data = await response.json();
    setTasks(data.data);
  };

  useEffect(() => {
    fectApi();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div>
          <h1 className="centertitle bold_task">TODO LIST</h1>
        </div>

        <form onSubmit={handleSubit}>
          <div className="form__group field ">
            <input
              type="text"
              className="form__field"
              placeholder="Add Todo"
              onChange={(e) => setNewtask(e.target.value)}
            />
            <label className="form__label">Add New Task</label>
          </div>
          <button className="button botoncenter">Add</button>
        </form>

        <div>
          <ul>
            <div className="cards">
              {tasks.map((tas, index) => (
                <>
                  <div className="card card-5">
                    <div className="card__icon">
                      TASK<i className="fas fa-bolt"></i>
                    </div>
                    <p className="card__exit"></p>
                    <div className="center_task">
                      <h2 className="card__title ">
                        <span className="bold_task">Your Task :</span>{" "}
                        {tas.attributes.task}
                      </h2>
                    </div>
                    <p className="card__apply">
                      {/* <a className="card__link" href="#">Apply Now <i className="fas fa-arrow-right"></i></a> */}
                      <button
                        className="button"
                        onClick={() => handleUpdate(tas.id)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => removeItem(tas.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="button"
                        onClick={() => handleRead(tas.id)}
                      >
                        Read
                      </button>
                    </p>
                  </div>
                </>
              ))}

              <Modal
                isOpen={open}
                ariaHideApp={false}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                  },
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "650px",
                  },
                }}
              >
                {upTask && (
                  <>
                    <button onClick={handleClose}>X</button>
                  <div className="card card-5">
                      <div >
                        <form onSubmit={handleUpdateSubmit}>
                          <input
                            value={nexTask}
                            className="form__field"
                            type="text"
                            placeholder="Add Todo"
                            onChange={(e) => setUpdate(e.target.value)}
                          />
                          <label className="form__label">Edit Task</label>
                          <button className="button">Update</button>
                        </form>
                      </div>  
                    </div>
                  </>
                )}
              </Modal>

              <Modal
                isOpen={openRead}
                ariaHideApp={false}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                  },
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "650px",
                  },
                }}
              >
                {upTask && (
                  <>
                    <button onClick={handleCloseRead}>X</button>
                    <h1></h1>
                    <div className="card card-5">
                      <div className="card__icon">
                        TASK<i className="fas fa-bolt"></i>
                      </div>
                      <p className="card__exit"></p>
                      <div className="center_task">
                        <h2 className="card__title">{nexTask}</h2>
                      </div>
                    </div>
                  </>
                )}
              </Modal>
            </div>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
