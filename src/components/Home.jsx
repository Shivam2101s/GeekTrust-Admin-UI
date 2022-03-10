import "./Home.css";
import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Table, Radio } from "antd";
import axios from "axios";
const { Search } = Input;

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selected, setSelected] = useState([]);

  const rowSelection = {
    onChange: (selectedRowid, selectedRows) => {
      console.log(
        `selectedRowid: ${selectedRowid}`,
        "selectedRows: ",
        selectedRows
      );
      setSelected(selectedRows);
    },
  };

  const head = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        users.length >= 1 ? (
          <div title="Sure to delete?" onClick={() => handleDelete(record.id)}>
            <a className="delete_btn">Delete</a>
          </div>
        ) : null,
    },
  ];

  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = async () => {
    try {
      let { data: dataList } = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      dataList = dataList.map((item) => {
        var temp = Object.assign({}, item);
        temp.key = item.id;
        return temp;
      });
      setUsers(dataList);
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = (value) => {
    if (value) {
      let searched = users;
      searched = searched.filter(
        (e) =>
          e.role === value ||
          e.name.toLowerCase().includes(value) ||
          e.email === value
      );
      setUsers(searched);
    } else {
      Getdata();
    }
  };

  const handleDelete = (id) => {
    const dataSource = users;
    setUsers(dataSource.filter((item) => item.id !== id));
    alert("Deleted Succesfully !!");
  };

  const removeSelected = () => {
    const select = selected.map((e) => e.id);
    let afterdelete = users.filter((item) => {
      return !select.includes(item.id);
    });
    alert("Deleted Succesfully !!");
    setUsers(afterdelete);
    setSelected([]);
  };

  return (
    <>
      <Space direction="vertical">
        <Search
          id="input_box"
          placeholder="Search By Name, Email or Role"
          onSearch={onSearch}
          enterButton
          allowClear
          style={{ width: 750, padding: "15px", margin: "10px 50%" }}
        />
      </Space>
      <div id="table_div">
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        ></Radio.Group>

        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={head}
          dataSource={users}
        />

        {selected.length > 0 && (
          <button id="delete-selected-btn" onClick={() => removeSelected()}>
            Delete Selected
          </button>
        )}
      </div>
    </>
  );
};
