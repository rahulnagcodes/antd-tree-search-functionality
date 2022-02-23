import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tree, Input } from "antd";
import ReactDOM from "react-dom";
const { Search } = Input;

const treeData_dummy = [
  {
    title: "All",
    key: "All-0",
    labelCat: "product",
    children: [
      {
        title: "Charcoal",
        key: "Charcoal-0-0",
        labelCat: "DIVISION_NAME",
        children: [
          {
            title: "Charcoal Products",
            key: "Charcoal Products-0-0-0",
            labelCat: "GBC_NAME",
            children: [
              {
                title: "14_Kingsford BBQ Sauce",
                key: "14_Kingsford BBQ Sauce-0-0-0-0",
                labelCat: "MFF_NAME",
                children: [
                  {
                    title: "Hickory Sauce",
                    key: "Hickory Sauce-0-0-0-0-0",
                    labelCat: "SUB_MFF_NAME",
                    children: [
                      {
                        title: "4460031699",
                        key: "4460031699-0-0-0-0-0-0",
                        labelCat: "ZUPC",
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                title: "14_Kingsford BBQ Sauce",
                key: "14_Kingsford BBQ Sauce-0-0-0-1",
                labelCat: "MFF_NAME",
                children: [
                  {
                    title: "Hickory Sauce",
                    key: "Hickory Sauce0-0-0-1-0",
                    labelCat: "SUB_MFF_NAME",
                    children: [
                      {
                        title: "4460031699",
                        key: "4460031699-0-0-0-1-0-0",
                        labelCat: "ZUPC",
                        children: [],
                      },
                    ],
                  },
                  {
                    title: "Hickory Sauce",
                    key: "Hickory Sauce-0-0-0-1-1",
                    labelCat: "SUB_MFF_NAME",
                    children: [
                      {
                        title: "4460031699",
                        key: "4460031699-0-0-0-1-1-0",
                        labelCat: "ZUPC",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Food Products",
        key: "Food Products-0-1",
        labelCat: "DIVISION_NAME",
        children: [
          {
            title: "Charcoal Products",
            key: "Charcoal Products-0-1-0",
            labelCat: "GBC_NAME",
            children: [
              {
                title: "14_Kingsford BBQ Sauce",
                key: "14_Kingsford BBQ Sauce-0-1-0-0",
                labelCat: "MFF_NAME",
                children: [
                  {
                    title: "Hickory Sauce",
                    key: "Hickory Sauce-0-1-0-0-0",
                    labelCat: "SUB_MFF_NAME",
                    children: [
                      {
                        title: "4460031701",
                        labelCat: "ZUPC",
                        key: "4460031701-0-1-0-0-0-0",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const SearchTree = () => {
  const [searchValue, setSearchValue] = useState("");
  const [treeData, setTreeData] = useState(treeData_dummy);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    // console.log("onExpand", expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  var ZUPC_customer = [];

  const onCheck = (checkedKeysValue) => {
    let checked = checkedKeysValue.map((val) => val.split("-"));
    checked.map((val) => {
      if (val.length === 4) {
        ZUPC_customer.push(val[0]);
      }
    });

    setCheckedKeys(checkedKeysValue);
  };

  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(treeData);

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys_ = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys_);
    setSearchValue(value);
    setAutoExpandParent(true);
    if (e.target.value.length === 0) setExpandedKeys([]);
  };

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });
  return (
    <>
      <h2>Search On Type</h2>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />

      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={loop(treeData)}
      />
    </>
  );
};

export default SearchTree;
